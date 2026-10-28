// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";

type GravatarImageProps = {
  url?: string;
};

function FallbackImage() {
  return <UserCircleIcon className="size-8" />;
}

export function GravatarImage(props: Readonly<GravatarImageProps>) {
  const { url } = props;
  if (!url) {
    return <FallbackImage />;
  }
  const backgroundImage = `bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC42ODU0IDE5LjA5NzFDMjAuNTcyMSAxNy4zMTkxIDIxLjc1IDE0Ljc5NzEgMjEuNzUgMTJDMjEuNzUgNi42MTUyMiAxNy4zODQ4IDIuMjUgMTIgMi4yNUM2LjYxNTIyIDIuMjUgMi4yNSA2LjYxNTIyIDIuMjUgMTJDMi4yNSAxNC43OTcxIDMuNDI3ODUgMTcuMzE5MSA1LjMxNDYzIDE5LjA5NzFDNy4wNjAxMiAyMC43NDE5IDkuNDEyMzQgMjEuNzUgMTIgMjEuNzVDMTQuNTg3NyAyMS43NSAxNi45Mzk5IDIwLjc0MTkgMTguNjg1NCAxOS4wOTcxWk02LjE0NTEyIDE3LjgxMjNDNy41MTk2MSAxNi4wOTc4IDkuNjMxNjEgMTUgMTIgMTVDMTQuMzY4NCAxNSAxNi40ODA0IDE2LjA5NzggMTcuODU0OSAxNy44MTIzQzE2LjM2MDMgMTkuMzE3OCAxNC4yODkgMjAuMjUgMTIgMjAuMjVDOS43MTEgMjAuMjUgNy42Mzk3MyAxOS4zMTc4IDYuMTQ1MTIgMTcuODEyM1pNMTUuNzUgOUMxNS43NSAxMS4wNzExIDE0LjA3MTEgMTIuNzUgMTIgMTIuNzVDOS45Mjg5MyAxMi43NSA4LjI1IDExLjA3MTEgOC4yNSA5QzguMjUgNi45Mjg5MyA5LjkyODkzIDUuMjUgMTIgNS4yNUMxNC4wNzExIDUuMjUgMTUuNzUgNi45Mjg5MyAxNS43NSA5WiIgZmlsbD0iIzBGMTcyQSIvPgo8L3N2Zz4K")]`;
  return (
    // use plain image for CSP
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      width="100"
      height="100"
      sizes="100vw"
      className={`size-8 rounded-full ${backgroundImage}`}
      alt=""
    />
  );
}
