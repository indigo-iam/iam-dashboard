// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { Notification } from "@/components/toaster";
import { Client, ClientRequest } from "@/models/client";
import { Paginated } from "@/models/pagination";
import { User } from "@/models/scim";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { IAM_API_URL } = settings;

export async function registerClient(
  client: ClientRequest
): Promise<{ notification: Notification; payload?: Client }> {
  const response = await authFetch(
    `${IAM_API_URL}/iam/api/client-registration`,
    {
      body: JSON.stringify(client),
      method: "POST",
      headers: { "content-type": "application/json" },
    }
  );

  if (response.ok) {
    return {
      notification: { type: "success", title: "Client created" },
      payload: await response.json(),
    };
  }
  const msg = await response.text();
  return {
    notification: {
      type: "error",
      title: "Cannot create client",
      description: `Error ${response.status} ${msg}`,
    },
  };
}

export async function getClient(clientId: string, isAdmin = false) {
  const url = isAdmin
    ? `${IAM_API_URL}/iam/api/clients/${clientId}`
    : `${IAM_API_URL}/iam/api/client-registration/${clientId}`;
  return await getItem<Client>(url);
}

export async function deleteClient(
  clientId: string,
  isAdmin?: boolean
): Promise<Notification> {
  const url = isAdmin
    ? `${IAM_API_URL}/iam/api/clients/${clientId}`
    : `${IAM_API_URL}/iam/api/client-registration/${clientId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/clients");
    return { type: "success", title: "Client deleted" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot delete client",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function editClient(
  client: Client,
  isAdmin: boolean
): Promise<Notification> {
  const { client_id } = client;
  const url = isAdmin
    ? `${IAM_API_URL}/iam/api/clients/${client_id}`
    : `${IAM_API_URL}/iam/api/client-registration/${client_id}3`;
  const response = await authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  if (response.ok) {
    revalidatePath(`/clients/${client_id}`);
    return {
      type: "success",
      title: "Client saved",
      description: `Client '${client.client_name}'' has been modified`,
    };
  }
  const { error } = await response.json();
  return {
    type: "error",
    title: "Could not save client",
    description: error,
  };
}

export async function enableClient(client: Client): Promise<Notification> {
  const { client_id } = client;
  const url = `${IAM_API_URL}/iam/api/clients/${client_id}/enable`;
  const response = await authFetch(url, { method: "PATCH" });
  if (response.ok) {
    revalidatePath(`/clients/${client_id}`);
    return { type: "success", title: "Client enabled" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot enable client",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function disableClient(client: Client): Promise<Notification> {
  const { client_id } = client;
  const url = `${IAM_API_URL}/iam/api/clients/${client_id}/disable`;
  const response = await authFetch(url, { method: "PATCH" });
  if (response.ok) {
    revalidatePath(`/clients/${client_id}`);
    return { type: "success", title: "Client disabled" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot disable client",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function getClientsByAccount(
  accountId: string,
  count: number,
  startIndex: number = 1
) {
  const url = `${IAM_API_URL}/iam/account/${accountId}/clients?startIndex=${startIndex}&count=${count}`;
  return await getItem<Paginated<Client>>(url);
}

export async function getClientsPage(
  count: number,
  startIndex: number = 1,
  filter?: string
) {
  let searchParams = `count=${count}&startIndex=${startIndex}`;
  let url: string;
  if (filter) {
    url = `${IAM_API_URL}/iam/api/search/clients`;
    searchParams += `&searchType=name&search=${filter}`;
  } else {
    url = `${IAM_API_URL}/iam/api/clients`;
  }
  url += `?${searchParams}`;
  return await getItem<Paginated<Client>>(url);
}

async function editOwner(
  client: Client,
  user: User,
  method: "POST" | "DELETE"
) {
  const { client_id } = client;
  const url = `${IAM_API_URL}/iam/api/clients/${client_id}/owners/${user.id}`;
  const response = await authFetch(url, { method });
  if (response.ok) {
    revalidatePath(`/clients/${client_id}`);
    return { type: "success", title: "Client saved" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Could not save client",
    description: `Error ${response.status} ${msg}`,
  };
}

export async function addOwner(client: Client, user: User) {
  return editOwner(client, user, "POST");
}

export async function removeOwner(client: Client, user: User) {
  return editOwner(client, user, "DELETE");
}

export async function getClientOwnersPage(
  clientId: string,
  startIndex: number,
  count: number
) {
  return await getItem<Paginated<User>>(
    `${IAM_API_URL}/iam/api/clients/${clientId}/owners?startIndex=${startIndex}&count=${count}`
  );
}

export async function getClientOwners(clientId: string): Promise<User[]> {
  const count = 10;
  const firstPage = await getClientOwnersPage(clientId, 1, count);
  const { totalResults, itemsPerPage } = firstPage;
  const pages = Math.ceil(totalResults / itemsPerPage);

  if (pages > 1) {
    const promises = Array.from({ length: pages - 1 }, (_, i) => {
      return getClientOwnersPage(clientId, i + count, count);
    });
    const results = await Promise.all(promises);
    const users = results.flatMap(r => r.Resources);
    return firstPage.Resources.concat(users);
  } else {
    return firstPage.Resources;
  }
}

export async function rotateClientSecret(
  clientId: string
): Promise<string | undefined | Notification> {
  const url = `${IAM_API_URL}/iam/api/clients/${clientId}/secret`;
  const response = await authFetch(url, { method: "POST" });
  if (response.ok) {
    const { client_secret } = await response.json();
    return client_secret as string | undefined;
  }
  const msg = await response.text();
  return {
    type: "error",
    title: "Cannot rotate client secret",
    description: `Error ${response.status} ${msg}`,
  };
}
