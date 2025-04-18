// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { ToasterPortal, getNotification } from "@/components/toaster";
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
      <body className="text-primary dark:text-secondary dark:bg-dark bg-gray-100">
        <Sidebar />
        <main className="ml-0 lg:ml-80">{children}</main>
        <ToasterPortal notification={notification} />
      </body>
    </html>
  );
}
