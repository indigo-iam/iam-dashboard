// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function Link(props: Readonly<LinkProps>) {
  const { href, children } = props;
  return (
    <NextLink
      href={href}
      className="font-medium text-gray-600 underline dark:text-gray-200"
    >
      {children}
    </NextLink>
  );
}
