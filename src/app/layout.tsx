// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import type { Metadata } from "next";
import { ToasterPortal } from "@/components/toaster";
import { getNotification } from "@/services/notifications";
import "@/app/app.css";

export const metadata: Metadata = {
  title: "INDIGO IAM",
  description: "INDIGO Identity Access Management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notification = await getNotification();
  return (
    <html lang="en">
      <body className="text-primary dark:text-secondary bg-infn">
        <main className="bg-secondary dark:bg-dark fixed inset-0 overflow-auto">
          {children}
        </main>
        <ToasterPortal notification={notification} />
      </body>
    </html>
  );
}
