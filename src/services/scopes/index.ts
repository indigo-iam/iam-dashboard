"use server";
import getConfig from "@/utils/config";
import { RawScope, Scope } from "@/models/client";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { Paginated } from "@/models/pagination";

const { BASE_URL } = getConfig();

export async function fetchScopes() {
  return getItem<Scope[]>(`${BASE_URL}/api/scopes`);
}

export async function fetchPaginatedScopes(
  count: number,
  startIndex: number,
  filter?: string
): Promise<Paginated<Scope>> {
  let scopes = await fetchScopes();
  if (filter) {
    scopes = scopes.filter(scope => scope.value.includes(filter));
  }
  const endIndex = startIndex + count;
  return {
    totalResults: scopes.length,
    itemsPerPage: count,
    startIndex,
    Resources: scopes.slice(startIndex, endIndex),
  };
}

export async function addScope(scope: RawScope) {
  const url = `${BASE_URL}/api/scopes`;
  const response = await authFetch(url, {
    method: "POST",
    body: JSON.stringify(scope),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    revalidatePath("/scopes");
  } else {
    const msg = await response.text();
    throw Error(`add new scope failed with status ${response.status} ${msg}`);
  }
}

export async function deleteScope(scope: Scope) {
  const url = `${BASE_URL}/api/scopes/${scope.id}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/scopes");
  } else {
    const msg = await response.text();
    throw Error(`delete scope failed with status ${response.status} ${msg}`);
  }
}

export async function editScope(scope: Scope) {
  const url = `${BASE_URL}/api/scopes/${scope.id}`;
  const response = await authFetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(scope),
  });
  if (response.ok) {
    revalidatePath("/scopes");
  } else {
    const msg = await response.text();
    throw Error(`edit scope failed with status ${response.status} ${msg}`);
  }
}
