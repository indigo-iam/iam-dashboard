"use server";
import { authFetch, getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { Paginated } from "@/models/pagination";
import { ScimUser } from "@/models/scim";
import { revalidatePath } from "next/cache";
import { SSHKey } from "@/models/indigo-user";
import { Attribute } from "@/models/attributes";

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

const manageUser = async (user: ScimUser, op: "add" | "delete") => {
  let url = `${BASE_URL}/scim/Users`;
  if (op === "delete") {
    url = `${url}/${user.id}`;
  }
  // workaround to not send the 'id' field to the backend. If the field is
  // sent to the backend, even containing an empty string, a user with that id
  // (or undefined) is created
  const { id, ...other } = user;
  const body = JSON.stringify(op === "add" ? other : user);
  const response = await authFetch(url, {
    body,
    method: op === "add" ? "POST" : "DELETE",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/users");
  } else {
    const msg = await response.text();
    throw Error(`${op} user failed with status ${response.status} ${msg}`);
  }
};

export const addUser = async (user: ScimUser) => {
  await manageUser(user, "add");
};

export const deleteUser = async (user: ScimUser) => {
  await manageUser(user, "delete");
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
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw Error(`${op} SSH key failed with status ${response.status} ${msg}`);
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
    throw Error(`Put attribute failed with status ${response.status} ${msg}`);
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
    throw Error(
      `Delete attribute failed with status ${response.status} ${msg}`
    );
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
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw Error(
      `Change membership end date failed with status ${response.status} ${msg}`
    );
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
    revalidatePath(`/users/${userId}`);
  } else {
    const msg = await response.text();
    throw Error(
      `Revoke membership end date failed with status ${response.status} ${msg}`
    );
  }
}
