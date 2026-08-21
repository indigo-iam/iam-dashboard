// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { authFetch, getItem } from "@/utils/fetch";
import { ScopePolicy, ScopePolicyRequest } from "@/models/scope-policies";
import { settings } from "@/config";
import { revalidatePath } from "next/cache";

const { IAM_API_URL } = settings;

export async function fetchScopePolicies() {
  const url = `${IAM_API_URL}/iam/scope_policies`;
  return await getItem<ScopePolicy[]>(url);
}

export async function fetchScopePolicy(id: number) {
  const url = `${IAM_API_URL}/iam/scope_policies/${id}`;
  return await getItem<ScopePolicy>(url);
}

export async function addScopePolicy(policy: ScopePolicyRequest) {
  const url = `${IAM_API_URL}/iam/scope_policies`;
  const response = await authFetch(url, {
    body: JSON.stringify(policy), method: "POST", headers: {
      "content-type": "application/json"
    }
  });
  if (response.ok) {
    console.log(await response.text());
    revalidatePath("/policies");
  }
  else {
    console.log(`${response.status} ${await response.text()}`);
  }
}

export async function updateScopePolicy(id: number, policy: ScopePolicyRequest) {
  const url = `${IAM_API_URL}/iam/scope_policies/${id}`;
  const response = await authFetch(url, {
    body: JSON.stringify({ ...policy, id }), method: "PUT", headers: {
      "content-type": "application/json"
    }
  });
  if (response.ok) {
    console.log(await response.text());
    revalidatePath(`/policies/${id}`);
    revalidatePath("/policies");
  }
  else {
    console.log(`${response.status} ${await response.text()}`);
  }
}
