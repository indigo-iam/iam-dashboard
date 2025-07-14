// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { createHash } from "node:crypto";

type GravatarProps = {
  email: string | undefined | null;
};
function FallbackImage() {
  return <UserCircleIcon className="size-12" />;
}

export async function Gravatar(props: Readonly<GravatarProps>) {
  const { email } = props;
  if (!email) {
    return <FallbackImage />;
  }

  // https://docs.gravatar.com/sdk/images/
  const hash = createHash("sha256");
  hash.update(email);
  const url = `https://gravatar.com/avatar/${hash.digest("hex")}?r=g&d=identicon`;
  return (
    <img
      src={url}
      width="0"
      height="0"
      sizes="100vw"
      className="my-auto w-12 rounded-full"
      alt="Gravatar"
    />
  );
}
