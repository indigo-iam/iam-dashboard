// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { revalidatePath } from "next/cache";
import { authFetch, getItem } from "@/utils/fetch";
import { Attribute } from "@/models/attributes";
import { SSHKey } from "@/models/indigo-user";
import { AddSecretResponse } from "@/models/mfa";
import { Paginated } from "@/models/pagination";
import { User, ScimUser, ScimRequest, ScimOp } from "@/models/scim";
import { Notification } from "@/components/toaster";
import { settings } from "@/config";
import { getSession } from "@/auth";

const { IAM_API_URL } = settings;

export async function fetchUser(uuid: string) {
  return await getItem<User>(`${IAM_API_URL}/scim/Users/${uuid}`);
}

export async function searchUser(filter: string) {
  const response = await getItem<Paginated<User>>(
    `${IAM_API_URL}/iam/account/search?count=100&startIndex=0&filter=${filter}`
  );
  return response.Resources;
}

export async function getUsersPage(
  count: number,
  startIndex: number = 1,
  filter?: string
) {
  let url = `${IAM_API_URL}/iam/account/search?count=${count}&startIndex=${startIndex}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  return await getItem<Paginated<User>>(url);
}

export async function addUser(user: ScimUser): Promise<Notification> {
  const url = `${IAM_API_URL}/scim/Users`;
  const body = JSON.stringify(user);
  const response = await authFetch(url, {
    body,
    method: "POST",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/users");
    return { type: "success", title: "User created" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot create user",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function patchUser(
  userId: string,
  formData: FormData
): Promise<Notification> {
  const session = await getSession();
  const isMe = session?.user?.sub === userId;
  const op: ScimRequest = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations: [],
  };

  const givenName = formData.get("given-name") as string | undefined;
  const familyName = formData.get("family-name") as string | undefined;
  const middleName = formData.get("middle-name") as string | undefined;

  if (givenName || familyName) {
    const userOp: ScimOp = {
      op: "replace",
      value: {
        displayName: `${givenName} ${familyName}`,
        name: {
          givenName,
          familyName,
          middleName,
        },
      },
    };
    op.operations.push(userOp);
  }

  const email = formData.get("email") as string | undefined;
  if (email) {
    const mailOp: ScimOp = {
      op: "replace",
      value: {
        emails: [
          {
            type: "work",
            value: email,
            primary: true,
          },
        ],
      },
    };
    op.operations.push(mailOp);
  }
  const url = isMe
    ? `${IAM_API_URL}/scim/Me`
    : `${IAM_API_URL}/scim/Users/${userId}`;
  const response = await authFetch(url, {
    body: JSON.stringify(op),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath(`/users/${isMe ? "me" : userId}`);
    return { type: "success", title: "Edits saved" };
  }
  return {
    type: "error",
    title: "Cannot save edits",
    description: `Error ${response.status}`,
  };
}

export async function deleteUser(userId: string): Promise<Notification> {
  const url = `${IAM_API_URL}/scim/Users/${userId}`;
  const response = await authFetch(url, {
    method: "DELETE",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath("/users");
    return {
      type: "success",
      title: "User deleted",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot delete user",
    description: `Error ${response.status} ${msg}`,
  };
}

async function patchUserSSHKey(
  userId: string,
  sshKey: SSHKey,
  op: "add" | "remove"
): Promise<Notification> {
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

  const url = `${IAM_API_URL}/scim/Users/${userId}`;
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: op === "add" ? "Key add" : "Key updated",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: op === "add" ? "Cannot add key" : "Cannot update key",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function addSSHKey(
  userId: string,
  sshKey: SSHKey
): Promise<Notification> {
  return patchUserSSHKey(userId, sshKey, "add");
}

export async function deleteSSHKey(
  userId: string,
  sshKey: SSHKey
): Promise<Notification> {
  return patchUserSSHKey(userId, sshKey, "remove");
}

export async function fetchAttributes(userId: string) {
  const url = `${IAM_API_URL}/iam/account/${userId}/attributes`;
  return await getItem<Attribute[]>(url);
}

export async function addAttribute(
  userId: string,
  attr: Attribute
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/account/${userId}/attributes`;
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
    return { type: "success", title: "Saved" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot add attribute",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function deleteAttribute(
  userId: string,
  attr: Attribute
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/account/${userId}/attributes?name=${attr.name}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return { type: "success", title: "Attribute deleted" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot delete attribute",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function changeMembershipEndTime(
  userId: string,
  date: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/account/${userId}/endTime`;
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
    return {
      type: "success",
      title: "Membership end time updated",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot update membership end date",
    description: `Error ${response.status} ${msg}`,
  };
}

// todo: this is not used?
export async function revokeMembershipEndTime(userId: string) {
  const url = `${IAM_API_URL}/iam/account/${userId}/endTime`;
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
    return {
      type: "success",
      title: "Membership end time revoked",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot revoke membership end time",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function changeUserStatus(
  userId: string,
  newStatus: boolean
): Promise<Notification> {
  const url = `${IAM_API_URL}/scim/Users/${userId}`;
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
    revalidatePath(`/users`);
    return {
      type: "success",
      title: `User ${newStatus ? "enabled" : "disabled"}`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: `Cannot ${newStatus ? "enable" : "disable"} the user`,
    description: `Error ${response.status} ${msg}`,
  };
}

export async function requestAUPSignature(
  userId: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/aup/signature/${userId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: "Request AUP Signature sent",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot send AUP signature request",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function signAUP(userId: string): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/aup/signature`;
  const body = JSON.stringify({ signatureTime: new Date().toISOString() });
  const response = await authFetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
  if (response.ok) {
    revalidatePath(`/user/${userId}`);
    return { type: "success", title: "AUP Signed" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot sign AUP",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function changePassword(
  userId: string,
  formData: FormData
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/password-update`;
  const response = await authFetch(url, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    revalidatePath(`/user/${userId}`);
    return { type: "success", title: "Password changed" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Password not saved",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function statusMFA() {
  const url = `${IAM_API_URL}/iam/multi-factor-settings/`;
  const response = await authFetch(url);
  const payload = await response.json();
  return payload.authenticatorAppActive === true;
}

export async function addMFASecret() {
  const url = `${IAM_API_URL}/iam/authenticator-app/add-secret`;
  const response = await authFetch(url, {
    method: "PUT",
  });
  if (response.ok) {
    const secret = (await response.json()) as AddSecretResponse;
    return { result: secret };
  } else {
    const msg = await response.text();
    return { error: { title: msg, status: response.status } };
  }
}

export async function enableMFA(formData: FormData): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/authenticator-app/enable`;
  const response = await authFetch(url, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return {
      type: "success",
      title: "MFA successfully enabled",
    };
  }
  const error = `Error ${response.status}: ${await response.text()}`;
  return { type: "error", title: "Cannot enable MFA", description: error };
}

export async function disableMFA(formData: FormData): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/authenticator-app/disable`;
  const response = await authFetch(url, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    return {
      type: "success",
      title: "MFA successfully disabled",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot disable MFA",
    description: `${msg}`,
  };
}
