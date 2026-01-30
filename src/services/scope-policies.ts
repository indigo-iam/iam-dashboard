// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { getItem } from "@/utils/fetch";
import { ScopePolicy } from "@/models/scope-policies";
import { settings } from "@/config";

const { IAM_API_URL } = settings;

export async function fetchScopePolicies() {
  const url = `${IAM_API_URL}/iam/scope_policies`;
  return await getItem<ScopePolicy[]>(url);
}

export async function fetchScopePolicy(id: number) {
  const url = `${IAM_API_URL}/iam/scope_policies/${id}`;
  return await getItem<ScopePolicy>(url);
}
