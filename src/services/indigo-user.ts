// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { authFetch } from "@/utils/fetch";

type PatchOp = {
  op: "add" | "remove" | "replace";
  value: unknown;
};

export async function patchIndigoUser(url: string, op: PatchOp) {
  const body = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [op],
  };
  return await authFetch(url, {
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
    body: JSON.stringify(body),
  });
}
