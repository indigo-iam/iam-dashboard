// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { revalidatePath } from "next/cache";
import { authFetch, getItem } from "@/utils/fetch";
import { Attribute } from "@/models/attributes";
import { Certificate, OidcId, SamlId, SSHKey } from "@/models/indigo-user";
import { AddSecretResponse } from "@/models/mfa";
import { Paginated } from "@/models/pagination";
import { User, ScimUser, ScimRequest, ScimOp } from "@/models/scim";
import { Notification } from "@/components/toaster";
import { settings } from "@/config";
import { URLSearchParams } from "url";

const { IAM_API_URL } = settings;

/*
  Fetch users
*/

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

export async function editUser(userData: {
  userId: string | null;
  givenName: string | null;
  familyName: string | null;
  middleName: string | null;
  email: string | null;
}): Promise<Notification> {
  const { userId, givenName, familyName, middleName, email } = userData;
  const operations: ScimOp[] = [];

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
    operations.push(userOp);
  }

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
    operations.push(mailOp);
  }
  console.log(JSON.stringify(operations));
  const response = await patchUser(operations, userId);

  if (response.ok) {
    revalidatePath(userId ? `/users/${userId}` : "/users/me");
    return { type: "success", title: "Edits saved" };
  }
  return {
    type: "error",
    title: "Cannot save edits",
    description: `Error ${response.status}`,
  };
}

export async function patchUser(operations: ScimOp[], userId: string | null) {
  const request: ScimRequest = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    operations,
  };
  const url = userId
    ? `${IAM_API_URL}/scim/Users/${userId}`
    : `${IAM_API_URL}/scim/Me`;
  console.log(JSON.stringify(request));
  return await authFetch(url, {
    body: JSON.stringify(request),
    method: "PATCH",
    headers: { "content-type": "application/scim+json" },
  });
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

/*
  Linked accounts
*/

export async function linkOidcAccount(
  userId: string,
  oidcId: OidcId
): Promise<Notification> {
  const response = await patchUser(
    [
      {
        op: "add",
        value: {
          "urn:indigo-dc:scim:schemas:IndigoUser": {
            oidcIds: [oidcId],
          },
        },
      },
    ],
    userId
  );
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: "Account linked",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot link account",
    description: `${response.status} ${msg}`,
  };
}

async function unlinkExternalAccount(
  userId: string,
  accountId: OidcId | SamlId | Certificate,
  accountType: "OIDC" | "SAML" | "X509"
): Promise<Notification | void> {
  const indigoUser = (() => {
    if (accountType === "OIDC") {
      return { oidcIds: [accountId] };
    }
    if (accountType === "SAML") {
      return { samlIds: [accountId] };
    }
    if (accountType === "X509") {
      return { certificates: [accountId] };
    }
    throw new Error(`accountType ${accountType} not is not valid`);
  })();

  const response = await patchUser(
    [
      {
        op: "remove",
        value: {
          "urn:indigo-dc:scim:schemas:IndigoUser": indigoUser,
        },
      },
    ],
    userId
  );
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return;
  }
  const msg = await response.text();
  return {
    type: "error",
    title: `Cannot unlink ${accountType} account`,
    description: `Error ${response.status} ${msg}`,
  };
}

export async function unlinkOidcAccount(userId: string, oidcId: OidcId) {
  return await unlinkExternalAccount(userId, oidcId, "OIDC");
}

export async function unlinkSamlAccount(userId: string, samlId: SamlId) {
  return await unlinkExternalAccount(userId, samlId, "SAML");
}

export async function unlinkCertificate(
  userId: string,
  certificate: Certificate
) {
  return await unlinkExternalAccount(userId, certificate, "X509");
}

async function patchUserSSHKey(
  userId: string,
  sshKey: SSHKey,
  op: "add" | "remove"
): Promise<Notification> {
  const response = await patchUser(
    [
      {
        op: op,
        value: {
          "urn:indigo-dc:scim:schemas:IndigoUser": {
            sshKeys: [sshKey],
          },
        },
      },
    ],
    userId
  );
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

/*
  Attributes and labels
*/

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

export async function changeMembershipEndtime(
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
      title: "Membership endtime updated",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot update membership endtime",
    description: `Error ${response.status} ${msg}`,
  };
}

// todo: this is not used?
export async function revokeMembershipEndtime(
  userId: string
): Promise<Notification> {
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
      title: "Membership endtime revoked",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot revoke membership endtime",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function changeUserStatus(
  userId: string,
  newStatus: boolean
): Promise<Notification> {
  const response = await patchUser(
    [
      {
        op: "replace",
        value: {
          active: newStatus,
        },
      },
    ],
    userId
  );
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
    return { type: "success", title: "AUP signed" };
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

export async function resetUserPassword(
  userEmail: string
): Promise<Notification> {
  const url = `${IAM_API_URL}/iam/password-reset/token`;
  const response = await authFetch(url, {
    method: "POST",
    body: new URLSearchParams({
      email: userEmail,
    }),
  });
  if (response.ok) {
    return { type: "success", title: "Reset password email sent" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Failed to send reset password email",
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

export async function setServiceAccount(
  userId: string,
  active: boolean
): Promise<Notification> {
  const response = await patchUser(
    [
      {
        op: "replace",
        value: {
          "urn:indigo-dc:scim:schemas:IndigoUser": {
            serviceAccount: active,
          },
        },
      },
    ],
    userId
  );
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: `Service account ${active ? "enabled" : "disabled"}`,
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: `Cannot ${active ? "enable" : "disable"} service account`,
    description: `${response.status} ${msg}`,
  };
}

export async function fetchUserLabels(userId: string) {
  const url = `${IAM_API_URL}/iam/account/${userId}/labels`;
  const response = await authFetch(url);
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Failed to fetch user labels with status ${response.status}`);
}

export async function addUserLabel(
  userId: string,
  prefix: string,
  name: string,
  value: string | null
): Promise<Notification | void> {
  const url = `${IAM_API_URL}/iam/account/${userId}/labels`;
  const body = {
    prefix,
    name,
    value,
  };
  const response = await authFetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return;
  }
  const msg = await response.text();
  return {
    type: "error",
    title: `Cannot add user label`,
    description: `Error ${response.status} ${msg}`,
  };
}

export async function deleteUserLabel(
  userId: string,
  prefix: string,
  name: string
): Promise<Notification | void> {
  const url = `${IAM_API_URL}/iam/account/${userId}/labels`;
  const body = new URLSearchParams({ prefix, name });
  const response = await authFetch(url, {
    method: "DELETE",
    body,
  });
  if (response.ok) {
    revalidatePath(`/users/${userId}`);
    return {
      type: "success",
      title: "User label deleted",
    };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: `Cannot delete user label`,
    description: `Error ${response.status} ${msg}`,
  };
}
