import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import "@/app/globals.css";
import { ToasterPortal, getNotification } from "@/components/toaster";

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
      <body className="bg-gray-100 text-primary dark:bg-dark dark:text-secondary-50">
        <Sidebar />
        <main className="ml-0 lg:ml-80">{children}</main>
        <ToasterPortal notification={notification} />
      </body>
    </html>
  );
}
