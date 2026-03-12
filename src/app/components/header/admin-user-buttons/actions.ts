// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { updateAccessToken } from "@/auth";
import { settings } from "@/config";

const { IAM_DASHBOARD_OIDC_SCOPES, IAM_DASHBOARD_OIDC_ADMIN_SCOPES } = settings;

export async function setUserMode() {
  await updateAccessToken(IAM_DASHBOARD_OIDC_SCOPES);
}

export async function setAdminMode() {
  await updateAccessToken(IAM_DASHBOARD_OIDC_ADMIN_SCOPES);
}
