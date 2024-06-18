import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";

const font = Roboto({ weight: "300", subsets: ["latin"] });

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
      <body className={`text-primary ${font.className}`}>
        <Sidebar />
        <div className="ml-0 p-4 lg:ml-80">{children}</div>
      </body>
    </html>
  );
}
