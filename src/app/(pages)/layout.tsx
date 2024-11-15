import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "INDIGO IAM",
  description: "INDIGO Identity Access Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-primary dark:bg-dark dark:text-secondary-50">
        <Sidebar />
        <div className="ml-0 lg:ml-80">{children}</div>
      </body>
    </html>
  );
}
