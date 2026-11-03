// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { cache } from "react";
import { createHash } from "node:crypto";

import { GravatarImage } from "./gravatar-image";

// https://docs.gravatar.com/sdk/images/
const getGravatarURL = cache((email: string) => {
  const hash = createHash("sha256");
  hash.update(email);
  return `https://gravatar.com/avatar/${hash.digest("hex")}?r=g&d=identicon`;
});

type GravatarProps = {
  email?: string;
};

export function Gravatar(props: Readonly<GravatarProps>) {
  const { email } = props;
  const url = email ? getGravatarURL(email) : undefined;
  return <GravatarImage url={url} />;
}
