"use server";
import getConfig from "@/utils/config";
import {
  Client,
  ClientRequest,
  CodeChallengeMethod,
  TokenEndpointAuthMethod,
} from "@/models/client";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { ScimUser } from "@/models/scim";
import { Paginated } from "@/models/pagination";
import { auth } from "@/auth";

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

export const getClient = async (clientId: string, isAdmin = false) => {
  const url = isAdmin
    ? `${BASE_URL}/iam/api/clients/${clientId}`
    : `${BASE_URL}/iam/api/client-registration/${clientId}`;
  return await getItem<Client>(url);
};

export const deleteClient = async (clientId: string) => {
  const session = await auth();
  const response = await authFetch(
    `${BASE_URL}/iam/api/client-registration/${clientId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    revalidatePath(session?.is_admin ? "/clients" : "/me/clients");
  } else {
    const msg = await response.text();
    throw Error(`Delete Client failed with status ${response.status} ${msg}`);
  }
};

export const editClient = async (formData: FormData, isAdmin = false) => {
  const client_id = formData.get("client_id");
  if (!client_id) {
    throw Error("cannot update client: 'client_id' not found");
  }

  let body: Client = {
    active: formData.get("active") === "on",
    client_id: formData.get("client_id") as string,
    client_description: formData.get("client_description") as string,
    client_name: formData.get("client_name") as string,
    client_secret: formData.get("client_secret") as string,
    clear_access_tokens_on_refresh:
      formData.get("clear_access_tokens_on_refresh") === "on",
    code_challenge_method: formData.get(
      "code_challenge_method"
    ) as CodeChallengeMethod,
    contacts: formData.getAll("contacts") as string[],
    created_at: parseInt(formData.get("created_at")!.toString()),
    grant_types: formData.getAll("grant_types") as string[],
    dynamically_registered: formData.get("dynamically_registered") === "on",
    require_auth_time: formData.get("require_auth_time") === "on",
    redirect_uris: formData.getAll("redirect_uris") as string[],

    token_endpoint_auth_method: formData.get(
      "token_endpoint_auth_method"
    ) as TokenEndpointAuthMethod,
  };

  // optionals
  const scope = formData.getAll("scope").join(" ");
  if (scope) {
    body = { ...body, scope };
  }

  if (formData.has("allow_introspection")) {
    // TODO: check if it is correct
    const allow_introspection = formData.get("allow_introspection") === "on";
    body = { ...body, allow_introspection };
  }

  if (formData.has("access_token_validity_seconds")) {
    const access_token_validity_seconds = parseInt(
      formData.get("access_token_validity_seconds")!.toString()
    );
    body = { ...body, access_token_validity_seconds };
  }

  if (formData.has("id_token_validity_seconds")) {
    const id_token_validity_seconds = parseInt(
      formData.get("id_token_validity_seconds")!.toString()
    );
    body = { ...body, id_token_validity_seconds };
  }

  if (formData.has("refresh_token_validity_seconds")) {
    const refresh_token_validity_seconds = parseInt(
      formData.get("refresh_token_validity_seconds")!.toString()
    );
    body = { ...body, refresh_token_validity_seconds };
  }

  if (formData.has("reuse_refresh_token")) {
    // TODO: check if it is correct
    const reuse_refresh_token = formData.get("reuse_refresh_token") === "on";
    body = { ...body, reuse_refresh_token };
  }

  if (formData.has("device_code_validity_seconds")) {
    const device_code_validity_seconds = parseInt(
      formData.get("device_code_validity_seconds")!.toString()
    );
    body = { ...body, device_code_validity_seconds };
  }

  const url = isAdmin
    ? `${BASE_URL}/iam/api/clients/${client_id}`
    : `${BASE_URL}/iam/api/client-registration/${client_id}`;

  const response = await authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    isAdmin
      ? revalidatePath(`/clients/${client_id}`)
      : revalidatePath(`/me/clients/${client_id}`);
  } else {
    const msg = await response.text();
    throw Error(`Update Client failed with status ${response.status} ${msg}`);
  }
};

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

export const getClientOwnersPage = async (
  clientId: string,
  startIndex: number,
  count: number
) => {
  return await getItem<Paginated<ScimUser>>(
    `${BASE_URL}/iam/api/clients/${clientId}/owners?startIndex=${startIndex}&count=${count}`
  );
};

export const getClientOwners = async (
  clientId: string
): Promise<ScimUser[]> => {
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
