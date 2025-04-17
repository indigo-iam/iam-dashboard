// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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

  let selected = false;
  switch (pathname) {
    case "/users":
      selected = href === "/users";
      break;
    case "/users/me":
      selected = href === "/users/me";
      break;
    case "/users/me/groups":
      selected = href === "/users/me/groups";
      break;
    case "/clients":
      selected =
        (href === "/clients?me" && searchParams.has("me")) ||
        (href === "/clients" && !searchParams.has("me"));
      break;
    case "/groups":
      selected =
        (href === "/groups?me" && searchParams.has("me")) ||
        (href === "/groups" && !searchParams.has("me"));
      break;
    default:
      selected = pathname === href;
  }

  return (
    <NextLink
      className="flex rounded-lg p-2 text-base transition ease-in-out hover:bg-primary-hover data-[selected=true]:bg-primary-hover dark:hover:bg-white/10 data-[selected=true]:dark:bg-white/10"
      href={href}
      onClick={hideSidebar}
      data-selected={selected ? "true" : "false"}
    >
      <div className="my-auto me-2 h-5 w-5">{icon}</div>
      {title}
    </NextLink>
  );
}
