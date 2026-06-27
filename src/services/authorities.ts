// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { authFetch } from "@/utils/fetch";
import { settings } from "@/config";
import { revalidatePath } from "next/cache";
import { Notification } from "@/components/toaster";

const { IAM_API_URL } = settings;

type Role = "ROLE_ADMIN" | "ROLE_READER";

export async function assignRole(
  userId: string,
  role: Role
): Promise<Notification> {
  if (role !== "ROLE_ADMIN" && role !== "ROLE_READER") {
    return {
      type: "error",
      title: "Cannot assign role to the user",
      description: "Role not valid",
    };
  }
  const url = `${IAM_API_URL}/iam/account/${userId}/authorities?authority=${role}`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: "Role assigned",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot assign role privileges to the user",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function revokeRole(
  userId: string,
  role: Role
): Promise<Notification> {
  if (role !== "ROLE_ADMIN" && role !== "ROLE_READER") {
    return {
      type: "error",
      title: "Cannot assign role to the user",
      description: "Role not valid",
    };
  }
  const url = `${IAM_API_URL}/iam/account/${userId}/authorities?authority=${role}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "info",
      title: "Role revoked",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot revoke role",
    description: `Error ${response.status} ${msg}`,
  };
}
