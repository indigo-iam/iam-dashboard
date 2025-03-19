"use client";
import { default as NextLink } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type SidebarLinkProps = {
  sidebarId: string;
  title: string;
  icon: React.ReactNode;
  href: string;
};

export default function Link(props: Readonly<SidebarLinkProps>) {
  const { sidebarId, title, href, icon } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hideSidebar = () => {
    const dismissButton = document.getElementById(`${sidebarId}-dismiss-btn`);
    dismissButton?.click();
  };

  let isActive = pathname.split("/")[1] === href.split("/")[1];

  switch (pathname) {
    case "/users":
      isActive = href === "/users";
      break;
    case "/users/me":
      isActive = href === "/users/me";
      break;
    case "/clients":
      isActive =
        (href === "/clients?me" && searchParams.has("me")) ||
        (href === "/clients" && !searchParams.has("me"));
      break;
    default:
  }

  return (
    <NextLink
      className={`flex rounded-lg p-2 transition ease-in-out hover:bg-primary-hover dark:hover:bg-white/10 ${isActive ? "bg-primary-hover dark:bg-white/10" : ""}`}
      href={href}
      onClick={hideSidebar}
    >
      <div className="my-auto me-2 h-5 w-5">{icon}</div>
      {title}
    </NextLink>
  );
}
