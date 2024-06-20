"use server";
import getConfig from "@/utils/config";
import { Client, ClientRequest } from "@/models/client";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { User, UserPage } from "@/models/user";

const { BASE_URL } = getConfig();

export const registerClient = async (client: ClientRequest) => {
  const response = await authFetch(`${BASE_URL}/iam/api/client-registration`, {
    body: JSON.stringify(client),
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    const res = await response.json();
    return res;
  } else {
    const msg = await response.text();
    throw Error(`Register Client failed with status ${response.status} ${msg}`);
  }
};

export const deleteClient = async (clientId: string) => {
  const response = await authFetch(
    `${BASE_URL}/iam/api/client-registration/${clientId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    revalidatePath("/clients");
    return "";
  } else {
    const msg = await response.text();
    throw Error(`Delete Client failed with status ${response.status} ${msg}`);
  }
};

export const getClient = async (clientId: string) => {
  return await getItem<Client>(`${BASE_URL}/iam/api/clients/${clientId}`);
};

export const getClientOwnersPage = async (
  clientId: string,
  startIndex: number,
  count: number
) => {
  return await getItem<UserPage>(
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
