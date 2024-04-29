import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../infn.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INDIGO IAM",
  description: "INDIGO Identity Access Management",
};

const drawerWidth = "320px";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar width={drawerWidth} />
        <div className="p-4" style={{ marginLeft: drawerWidth }}>
          {children}
        </div>
      </body>
    </html>
  );
}
