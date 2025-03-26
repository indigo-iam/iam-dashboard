// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Paginated } from "@/models/pagination";
import { User, ScimUser, ScimRequest } from "@/models/scim";
import { revalidatePath } from "next/cache";
import { SSHKey } from "@/models/indigo-user";
import { Attribute } from "@/models/attributes";
import { setNotification } from "@/components/toaster";

const { BASE_URL } = getConfig();

export const fetchUser = async (uuid: string) =>
  await getItem<User>(`${BASE_URL}/scim/Users/${uuid}`);

export const searchUser = async (filter: string) => {
  const response = await getItem<Paginated<User>>(
    `${BASE_URL}/iam/account/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
};

export const getUsersPage = async (
  count: number,
  startIndex: number = 1,
  filter?: string
) => {
  let url = `${BASE_URL}/iam/account/search?count=${count}&startIndex=${startIndex}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  return await getItem<Paginated<User>>(url);
};

export const addUser = async (user: ScimUser) => {
  let url = `${BASE_URL}/scim/Users`;
  const body = JSON.stringify(user);
  const response = await authFetch(url, {
    body,
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "User created" });
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot create user",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const deleteUser = async (user: User) => {
  const url = `${BASE_URL}/scim/Users/${user.id}`;
  const response = await authFetch(url, {
    method: "DELETE",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "User deleted" });
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete user",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

const patchUserSSHKey = async (
  userId: string,
  sshKey: SSHKey,
  op: "add" | "remove"
) => {
  const body = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [
      {
        op: op,
        value: {
          "urn:indigo-dc:scim:schemas:IndigoUser": {
            sshKeys: [sshKey],
          },
        },
      },
    ],
  };

  const url = `${BASE_URL}/scim/Users/${userId}`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    await setNotification({
      type: "success",
      message: op === "add" ? "Key add" : "Key updated",
    });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: op === "add" ? "Cannot add key" : "Cannot update key",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
};

export const addSSHKey = async (userId: string, sshKey: SSHKey) => {
  await patchUserSSHKey(userId, sshKey, "add");
};

export const deleteSSHKey = async (userId: string, sshKey: SSHKey) => {
  await patchUserSSHKey(userId, sshKey, "remove");
};

export async function fetchAttributes(userId: string) {
  const url = `${BASE_URL}/iam/account/${userId}/attributes`;
  return await getItem<Attribute[]>(url);
}

export async function addAttribute(userId: string, attr: Attribute) {
  const url = `${BASE_URL}/iam/account/${userId}/attributes`;
  const body = JSON.stringify(attr);
  const response = await authFetch(url, {
    body,
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot add attribute",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function deleteAttribute(userId: string, attr: Attribute) {
  const url = `${BASE_URL}/iam/account/${userId}/attributes?name=${attr.name}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete attribute",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function changeMembershipEndTime(userId: string, date: string) {
  const url = `${BASE_URL}/iam/account/${userId}/endTime`;
  const body = JSON.stringify({ endTime: date });
  const response = await authFetch(url, {
    method: "PUT",
    body,
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  });
  if (response.ok) {
    await setNotification({
      type: "success",
      message: "Membership End Time updated",
    });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot update Membership End Date",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function revokeMembershipEndTime(userId: string) {
  const url = `${BASE_URL}/iam/account/${userId}/endTime`;
  const body = JSON.stringify({});
  const response = await authFetch(url, {
    method: "PUT",
    body,
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  });
  if (response.ok) {
    await setNotification({
      type: "success",
      message: "Membership End Time revoked",
    });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot revoke Membership End Time",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function changeUserStatus(userId: string, newStatus: boolean) {
  const url = `${BASE_URL}/scim/Users/${userId}`;
  const patchRequest: ScimRequest = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [
      {
        op: "replace",
        value: {
          active: newStatus,
        },
      },
    ],
  };
  const body = JSON.stringify(patchRequest);
  const response = await authFetch(url, {
    method: "PATCH",
    body,
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    await setNotification({
      type: "success",
      message: `User ${newStatus ? "enabled" : "disabled"}`,
    });
    revalidatePath(`/users`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: `Cannot ${newStatus ? "enable" : "disable"} the user`,
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function requestAUPSignature(userId: string) {
  const url = `${BASE_URL}/iam/aup/signature/${userId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Request AUP Signature sent" });
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot send AUP signature request",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function signAUP(userId: string) {
  const url = `${BASE_URL}/iam/aup/signature/${userId}`;
  const body = JSON.stringify({ signatureTime: new Date().toISOString() });
  const response = await authFetch(url, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body,
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "AUP Signed" });
    revalidatePath(`/user/${userId}`);
  } else {
    const msg = await response.text();
    setNotification({
      type: "error",
      message: "Cannot sign AUP",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
