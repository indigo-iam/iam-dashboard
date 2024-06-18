"use client";
import { default as NextLink } from "next/link";

export type SidebarLinkProps = {
  sidebarId: string;
  title: string;
  icon: JSX.Element;
  href: string;
};

export default function Link(props: SidebarLinkProps) {
  const { sidebarId, title, href, icon } = props;
  const hideSidebar = () => {
    const dismissButton = document.getElementById(`${sidebarId}-dismiss-btn`);
    console.log(dismissButton)
    dismissButton?.click();
  };
  return (
    <NextLink
      className="hover:bg-primary-hover flex rounded-lg p-2 transition ease-in-out"
      href={href}
      onClick={hideSidebar}
    >
      <div className="me-2 w-6">{icon}</div>
      {title}
    </NextLink>
  );
}
