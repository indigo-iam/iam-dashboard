// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { RawScope, Scope } from "@/models/client";
import { authFetch, getItem } from "@/utils/fetch";
import { revalidatePath } from "next/cache";
import { Paginated } from "@/models/pagination";
import { setNotification } from "@/services/notifications";
import { Notification } from "@/components/toaster";

const { IAM_API_URL } = settings;

export async function fetchScopes() {
  return getItem<Scope[]>(`${IAM_API_URL}/api/scopes`);
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

export async function addScope(scope: RawScope): Promise<Notification> {
  const url = `${IAM_API_URL}/api/scopes`;
  const response = await authFetch(url, {
    method: "POST",
    body: JSON.stringify(scope),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    revalidatePath("/scopes");
    return { type: "success", message: "Scope added" };
  }
  const msg = await response.text();
  return {
    type: "error",
    message: "Cannot add scope",
    subtitle: `Error ${response.status} ${msg}`,
  };
}

export async function deleteScope(scope: Scope): Promise<Notification> {
  const url = `${IAM_API_URL}/api/scopes/${scope.id}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    revalidatePath("/scopes");
    return { type: "success", message: "Scope deleted" };
  }
  const msg = await response.text();
  return {
    type: "error",
    message: "Cannot delete scope",
    subtitle: `Error ${response.status} ${msg}`,
  };
}

export async function editScope(scope: Scope): Promise<Notification> {
  const url = `${IAM_API_URL}/api/scopes/${scope.id}`;
  const response = await authFetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(scope),
  });
  if (response.ok) {
    revalidatePath("/scopes");
    return { type: "success", message: "Scope saved" };
  }
  const msg = await response.text();
  return {
    type: "error",
    message: "Cannot save scope",
    subtitle: `Error ${response.status} ${msg}`,
  };
}
