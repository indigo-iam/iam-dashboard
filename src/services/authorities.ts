// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { authFetch } from "@/utils/fetch";
import { settings } from "@/config";
import { revalidatePath } from "next/cache";
import { Notification } from "@/components/toaster";

const { IAM_API_URL } = settings;

export async function assignAdminPrivileges(
  userId: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: "Admin privileges assigned",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot assign Admin privileges to the user",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function revokeAdminPrivileges(
  userId: string
): Promise<Notification> {
  let url = `${IAM_API_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "info",
      title: "Admin privileges revoked",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot revoke admin privileges",
    description: `Error ${response.status} ${msg}`,
  };
}
