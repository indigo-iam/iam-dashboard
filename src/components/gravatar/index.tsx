// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { getGravatarURL } from "@/utils/gravatar";

// same as UserCircleIcon
const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='size-6'%3E%3Cpath fill-rule='evenodd' d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z' clip-rule='evenodd' /%3E%3C/svg%3E%0A";

type GravatarProps = {
  email?: string;
};
function FallbackImage() {
  return <UserCircleIcon className="size-8" />;
}

export function Gravatar(props: Readonly<GravatarProps>) {
  const { email } = props;
  if (!email) {
    return <FallbackImage />;
  }
  const url = getGravatarURL(email);
  return (
    <Image
      src={url}
      width="100"
      height="100"
      sizes="100vw"
      className="size-8 rounded-full"
      placeholder={placeholder}
      alt="Gravatar"
    />
  );
}
