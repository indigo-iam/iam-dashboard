"use server";
import getConfig from "@/utils/config";
import { Client, ClientRequest } from "@/models/client";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";

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
