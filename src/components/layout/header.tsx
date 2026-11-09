// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export function Header(props: Readonly<HeaderProps>) {
  return (
    <header
      className="sticky top-14 z-10 flex min-h-16 w-full flex-wrap items-center gap-2 border-b bg-white p-4 font-normal text-sky-950 dark:bg-gray-900 dark:text-white"
      {...props}
    />
  );
}
