"use client";
import { default as NextLink } from "next/link";
import { usePathname } from "next/navigation";

export type SidebarLinkProps = {
  sidebarId: string;
  title: string;
  icon: JSX.Element;
  href: string;
};

export default function Link(props: Readonly<SidebarLinkProps>) {
  const { sidebarId, title, href, icon } = props;
  const pathname = usePathname();
  const hideSidebar = () => {
    const dismissButton = document.getElementById(`${sidebarId}-dismiss-btn`);
    dismissButton?.click();
  };

  const rootPath = pathname.split("/").splice(0, 2).join("/");
  const isActive = pathname === href || rootPath === href;

  return (
    <NextLink
      className={`flex rounded-lg p-2 text-sm transition ease-in-out hover:bg-primary-hover ${isActive ? "bg-primary-hover" : ""}`}
      href={href}
      onClick={hideSidebar}
    >
      <div className="me-2 w-5 h-5">{icon}</div>
      {title}
    </NextLink>
  );
}
