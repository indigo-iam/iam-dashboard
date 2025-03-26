// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";
import { getItem } from "@/utils/fetch";
import getConfig from "@/utils/config";
import { ScopePolicy } from "@/models/scope-policies";

const { BASE_URL } = getConfig();

export async function fetchScopePolicies() {
  const url = `${BASE_URL}/iam/scope_policies`;
  return await getItem<ScopePolicy[]>(url);
}

export async function fetchScopePolicy(id: number) {
  const url = `${BASE_URL}/iam/scope_policies/${id}`;
  return await getItem<ScopePolicy>(url);
}
