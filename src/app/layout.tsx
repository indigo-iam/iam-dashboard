// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import type { Metadata, Viewport } from "next";

import { getSession, isUserAdmin } from "@/auth";
import { Header } from "@/app/components/header";
import { Sidebar } from "@/app/components/sidebar";
import { Toaster } from "@/components/toaster";
import { LoadingProvider } from "@/components/loading";
import "@/styles/main.css";

export const metadata: Metadata = {
  title: "INDIGO IAM",
  description: "INDIGO Identity Access Management",
};

export const viewport: Viewport = {
  themeColor: "bg-sky-900",
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
        <body className="body">
          <main>{children}</main>
        </body>
      </html>
    );
  }
  const hasRoleAdmin = session?.session.hasRoleAdmin;
  // avoid to check user's token if they are not logged in yet
  const isAdmin = hasRoleAdmin ? await isUserAdmin() : false;
  return (
    <html lang="en">
      <body>
        {/*this div is required by https://github.com/tailwindlabs/headlessui/issues/2752*/}
        <div>
          <LoadingProvider>
            <Header hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} />
            <main>
              <Sidebar hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} />
              <div className="content">{children}</div>
            </main>
            <Toaster />
          </LoadingProvider>
        </div>
      </body>
    </html>
  );
}
