// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { Header } from "@/app/components/header";
import { CookiesBanner } from "@/app/components/sidebar/cookies-banner";
import { Sidebar } from "@/app/components/sidebar";
import { ToasterPortal } from "@/components/toaster";
import { getNotification } from "@/services/notifications";
import type { Metadata, Viewport } from "next";
import "@/app/app.css";

export const metadata: Metadata = {
  title: "INDIGO IAM",
  description: "INDIGO Identity Access Management",
};

export const viewport: Viewport = {
  themeColor: "bg-infn",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;
  const session = await getSession();
  if (!session) {
    return (
      <html lang="en">
        <body className="text-primary dark:text-secondary bg-secondary dark:bg-extradark">
          <main>{children}</main>
        </body>
      </html>
    );
  }

  const email = session?.user.email;
  const hasRoleAdmin = session?.session.hasRoleAdmin;
  // avoid to check user's token if they are not logged in yet
  const isAdmin = hasRoleAdmin ? await isUserAdmin() : false;
  const notification = await getNotification();
  return (
    <html lang="en">
      <body className="text-primary dark:text-secondary bg-secondary dark:bg-extradark flex max-h-screen min-h-screen flex-col">
        <Header hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} email={email} />
        <main className="flex h-0 grow">
          <Sidebar hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} />
          <div className="w-full overflow-y-auto">{children}</div>
        </main>
        <CookiesBanner />
        <ToasterPortal notification={notification} />
      </body>
    </html>
  );
}
