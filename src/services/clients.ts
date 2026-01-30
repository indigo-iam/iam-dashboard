// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { Client, ClientRequest } from "@/models/client";
import { Paginated } from "@/models/pagination";
import { User } from "@/models/scim";
import { setNotification } from "@/services/notifications";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { BASE_URL } = settings;

export async function registerClient(client: ClientRequest) {
  const response = await authFetch(`${BASE_URL}/iam/api/client-registration`, {
    body: JSON.stringify(client),
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    await setNotification({ type: "success", message: "Client created" });
    return await response.json();
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot create client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function getClient(clientId: string, isAdmin = false) {
  const url = isAdmin
    ? `${BASE_URL}/iam/api/clients/${clientId}`
    : `${BASE_URL}/iam/api/client-registration/${clientId}`;
  return await getItem<Client>(url);
}

export async function deleteClient(clientId: string, isMe?: boolean) {
  const url = `${BASE_URL}/iam/api/client-registration/${clientId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Client deleted" });
    redirect(isMe ? "/users/me" : "/clients");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot delete client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function editClient(client: Client) {
  const { client_id } = client;
  const url = `${BASE_URL}/iam/api/clients/${client_id}`;
  const response = await authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  if (response.ok) {
    await setNotification({ type: "success", message: "Client saved" });
    revalidatePath(`/clients/${client_id}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Could not save client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function enableClient(client: Client) {
  const { client_id } = client;
  const url = `${BASE_URL}/iam/api/clients/${client_id}/enable`;
  const response = await authFetch(url, { method: "PATCH" });
  if (response.ok) {
    await setNotification({ type: "success", message: "Client enabled" });
    revalidatePath(`/clients/${client_id}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot enable client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function disableClient(client: Client) {
  const { client_id } = client;
  const url = `${BASE_URL}/iam/api/clients/${client_id}/disable`;
  const response = await authFetch(url, { method: "PATCH" });
  if (response.ok) {
    await setNotification({ type: "success", message: "Client disabled" });
    revalidatePath(`/clients/${client_id}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot disable client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export async function getClientsByAccount(
  accountId: string,
  count: number,
  startIndex: number = 1
) {
  const url = `${BASE_URL}/iam/account/${accountId}/clients?startIndex=${startIndex}&count=${count}`;
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
    url = `${BASE_URL}/iam/api/search/clients`;
    searchParams += `&searchType=name&search=${filter}`;
  } else {
    url = `${BASE_URL}/iam/api/clients`;
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
  const url = `${BASE_URL}/iam/api/clients/${client_id}/owners/${user.id}`;
  const response = await authFetch(url, { method });
  if (response.ok) {
    await setNotification({ type: "success", message: "Client saved" });
    revalidatePath(`/clients/${client_id}`);
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Could not save client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
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
    `${BASE_URL}/iam/api/clients/${clientId}/owners?startIndex=${startIndex}&count=${count}`
  );
}

export async function getClientOwners(clientId: string): Promise<User[]> {
  const count = 10;
  const firstPage = await getClientOwnersPage(clientId, 1, count);
  const { totalResults } = firstPage;
  const pages = Math.ceil(totalResults / count);

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

export async function regenerateClientSecret(clientId: string) {
  const url = `${BASE_URL}/iam/api/clients/${clientId}/secret`;
  const response = await authFetch(url, { method: "POST" });
  if (response.ok) {
    const { client_secret } = await response.json();
    return client_secret as string | undefined;
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot regenerate client secret",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}
