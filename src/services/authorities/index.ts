"use server";
import { authFetch } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { revalidatePath } from "next/cache";
import { setNotification } from "@/components/Toaster";

const { BASE_URL } = getConfig();

export const assignAdminPrivileges = async (userId: string) => {
  let url = `${BASE_URL}/iam/account/${userId}/authorities?authority=ROLE_ADMIN`;
  const response = await authFetch(url, {
    method: "POST",
  });
  if (response.ok) {
    setNotification({ type: "success", message: "Admin privileges assigned" });
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
    setNotification({ type: "info", message: "Admin privileges revoked" });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot revoke admin privileges",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};
