import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { Sidebar } from "@/components/Sidebar";

const font = Roboto({ weight: "300", subsets: ["latin"] });

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
      <body className={`text-primary ${font.className}`}>
        <Sidebar width={drawerWidth} />
        <div className="p-4" style={{ marginLeft: drawerWidth }}>
          {children}
        </div>
      </body>
    </html>
  );
}
