// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import NextLink from "next/link";
import { useLoading } from "../loading";

type LinkProps = {
  href: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
} & { [key: `data-${string}`]: unknown };

export default function Link(props: Readonly<LinkProps>) {
  const { startProgressBar } = useLoading();
  const { href, className, title, children, ...others } = props;
  return (
    <NextLink
      href={href}
      className={className}
      title={title}
      onClick={startProgressBar}
      {...others}
    >
      {children}
    </NextLink>
  );
}
