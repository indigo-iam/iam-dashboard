// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import NextLink from "next/link";
import { useProgressBar } from "../progress-bar";

type LinkProps = {
  href: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
  variant?: "plain";
} & { [key: `data-${string}`]: unknown };

export default function Link(props: Readonly<LinkProps>) {
  const { startProgressBar } = useProgressBar();
  const { href, className, variant, title, children, ...others } = props;
  const outerClassName = className ? ` ${className}` : "";
  return (
    <NextLink
      href={href}
      className={
        variant === "plain"
          ? outerClassName
          : outerClassName +
            " max-w-fit font-semibold tracking-wide text-gray-950 decoration-1 underline-offset-3 hover:text-blue-600 hover:underline dark:text-gray-100"
      }
      title={title}
      onClick={startProgressBar}
      {...others}
    >
      {children}
    </NextLink>
  );
}
