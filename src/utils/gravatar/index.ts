// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { createHash } from "node:crypto";
import { cache } from "react";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// https://docs.gravatar.com/sdk/images/
export const getGravatarURL = cache((email: string) => {
  const hash = createHash("sha256");
  hash.update(email);
  return `https://gravatar.com/avatar/${hash.digest("hex")}?r=g&d=identicon`;
});
