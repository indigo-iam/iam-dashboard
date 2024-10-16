"use server";
import { authFetch } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";

const { BASE_URL } = getConfig();

export const assignAdminPrivileges = async (userID: string) => {
  let url = `${BASE_URL}/iam/account/${userID}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    revalidatePath(`/users/${userID}`);
  } else {
    const msg = await response.text();
    throw new Error(
      `Assigning admin privileges failed with status ${response.status} ${msg}`
    );
  }
};

export const revokeAdminPrivileges = async (userID: string) => {
  let url = `${BASE_URL}/iam/account/${userID}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userID}`);
  } else {
    const msg = await response.text();
    throw new Error(
      `Revoking admin privileges failed with status ${response.status} ${msg}`
    );
  }
};
