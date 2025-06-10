// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { Client, ClientRequest } from "@/models/client";
import { authFetch, getItem } from "@/utils/fetch";
import { User } from "@/models/scim";
import { Paginated } from "@/models/pagination";
import { setNotification } from "@/services/notifications";
import { auth } from "@/auth";
import { settings } from "@/config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { BASE_URL } = settings;

export async function registerClient(client: ClientRequest, isAdmin?: boolean) {
  const response = await authFetch(`${BASE_URL}/iam/api/client-registration`, {
    body: JSON.stringify(client),
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    await setNotification({ type: "success", message: "Client created" });
    isAdmin ? redirect("/clients") : redirect("/clients?me");
  } else {
    const msg = await response.text();
    await setNotification({
      type: "error",
      message: "Cannot create client",
      subtitle: `Error ${response.status} ${msg}`,
    });
  }
}

export const getClient = async (clientId: string, isAdmin = false) => {
  const url = isAdmin
    ? `${BASE_URL}/iam/api/clients/${clientId}`
    : `${BASE_URL}/iam/api/client-registration/${clientId}`;
  return await getItem<Client>(url);
};

export const deleteClient = async (clientId: string, isMe?: boolean) => {
  const session = await auth();
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
};

export const editClient = async (client: Client) => {
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
};

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

export const getClientsPage = async (
  count: number,
  startIndex: number = 1,
  me: boolean = false,
  filter?: string
) => {
  let searchParams = `count=${count}&startIndex=${startIndex}`;
  let url: string;

  if (me) {
    url = `${BASE_URL}/iam/account/me/clients`;
    // this is useless, since the endpoint doesn't not filter at all
    if (filter) {
      searchParams += `&filter=${filter}`;
    }
  } else {
    if (filter) {
      url = `${BASE_URL}/iam/api/search/clients`;
      searchParams += `&searchType=name&search=${filter}`;
    } else {
      url = `${BASE_URL}/iam/api/clients`;
    }
  }
  url += `?${searchParams}`;
  return await getItem<Paginated<Client>>(url);
};

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

export const getClientOwnersPage = async (
  clientId: string,
  startIndex: number,
  count: number
) => {
  return await getItem<Paginated<User>>(
    `${BASE_URL}/iam/api/clients/${clientId}/owners?startIndex=${startIndex}&count=${count}`
  );
};

export const getClientOwners = async (clientId: string): Promise<User[]> => {
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
};
