// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { authFetch } from "@/utils/fetch";
import { setNotification } from "@/services/notifications";
import { settings } from "@/config";
import { revalidatePath } from "next/cache";

const { BASE_URL } = settings;

export const assignAdminPrivileges = async (userId: string) => {
  let url = `${BASE_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    await setNotification({
      type: "success",
      message: "Admin privileges assigned",
    });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot assign Admin privileges to the user",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const revokeAdminPrivileges = async (userId: string) => {
  let url = `${BASE_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    await setNotification({
      type: "info",
      message: "Admin privileges revoked",
    });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot revoke admin privileges",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};
