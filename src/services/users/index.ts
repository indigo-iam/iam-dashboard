"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Paginated } from "@/models/pagination";
import { ScimUser } from "@/models/scim";
import { revalidatePath } from "next/cache";
import { SSHKey } from "@/models/indigo-user";

const { BASE_URL } = getConfig();

export const fetchUser = async (uuid: string) =>
  await getItem<ScimUser>(`${BASE_URL}/scim/Users/${uuid}`);

export const searchUser = async (filter: string) => {
  const response = await getItem<Paginated<ScimUser>>(
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
  return await getItem<Paginated<ScimUser>>(url);
};

export const addUser = async (user: ScimUser) => {
  const url = `${BASE_URL}/scim/Users`;
  const response = await authFetch(url, {
    body: JSON.stringify(user),
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    throw Error(`Add User failed with status ${response.status} ${msg}`);
  }
};

export const deleteUser = async (user: ScimUser) => {
  const url = `${BASE_URL}/scim/Users/${user.id}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    throw Error(`Delete User failed with status ${response.status} ${msg}`);
  }
};

export const addSSHKey = async (userId: string, sshKey: SSHKey) => {
  const body = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [
      {
        op: "add",
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
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw Error(`Add SSH key failed with status ${response.status} ${msg}`);
  }
};

export const deleteSSHKey = async (userId: string, sshKey: SSHKey) => {
  const body = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [
      {
        op: "remove",
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
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw Error(`Delete SSH key failed with status ${response.status} ${msg}`);
  }
};
