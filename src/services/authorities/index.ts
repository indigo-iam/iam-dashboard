"use server";
import { authFetch } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();

export const assignAdminPrivileges = async (userId: string) => {
  let url = `${BASE_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw new Error(
      `Assigning admin privileges failed with status ${response.status} ${msg}`
    );
  }
};

export const revokeAdminPrivileges = async (userId: string) => {
  let url = `${BASE_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw new Error(
      `Revoking admin privileges failed with status ${response.status} ${msg}`
    );
  }
};
