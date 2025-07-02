// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { default as NextLink } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type LinkProps = {
  title: string;
  href: string;
  children?: React.ReactElement;
};

export function Link(props: Readonly<LinkProps>) {
  const { title, href, children } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      className="text-secondary flex items-center gap-1 rounded-lg p-2 text-base transition ease-in-out hover:bg-white/10 data-[selected=true]:bg-white/10"
      href={href}
      data-selected={selected ? "true" : "false"}
      title={title}
    >
      {children}
      {title}
    </NextLink>
  );
}
