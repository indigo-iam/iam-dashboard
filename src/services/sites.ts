// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { settings } from "@/config";
import { ActiveToken, Site } from "@/models/sites";
import { authFetch } from "@/utils/fetch";

const { IAM_API_URL } = settings;

export async function getApprovedSites(): Promise<Site[]> {
  const url = `${IAM_API_URL}/api/approved`;
  const response = await authFetch(url);
  return await response.json();
}

export async function getActiveTokens(): Promise<ActiveToken[]> {
  const url = `${IAM_API_URL}/api/tokens/access`;
  const response = await authFetch(url);
  return await response.json();
}
