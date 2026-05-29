// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { Notification } from "@/components/toaster";
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

export async function revokeSite(siteId: string): Promise<Notification> {
  const url = `${IAM_API_URL}/api/approved/${siteId}`;
  const response = await authFetch(url, {
    method: "DELETE",
  });
  if (response.ok) {
    return { type: "success", title: "Site revoked" };
  }
  const msg = await response.text();
  return {
    type: "error",
    title: `Revoking site failed with status ${response.status}, error: ${msg}`,
  };
}
