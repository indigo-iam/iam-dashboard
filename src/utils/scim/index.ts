// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ScimReference } from "@/models/scim";
import { settings } from "@/config";

const { IAM_API_URL } = settings;

export function makeScimReferenceForUser(userId: string, userName: string) {
  return {
    $ref: `${IAM_API_URL}/scim/Users/${userId}`,
    display: userName,
    value: userId,
  };
}
export function makeScimReferenceForGroup(
  groupId: string,
  groupName: string
): ScimReference {
  return {
    $ref: `${IAM_API_URL}/scim/Groups/${groupId}`,
    display: groupName,
    value: groupId,
  };
}
