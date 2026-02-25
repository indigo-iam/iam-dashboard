// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { updateAccessToken } from "@/auth";
import { settings } from "@/config";
import { refresh } from "next/cache";

const { IAM_DASHBOARD_OIDC_SCOPES, IAM_DASHBOARD_OIDC_ADMIN_SCOPES } = settings;

export async function refreshTokenWithRole(role: "admin" | "default") {
  await updateAccessToken(
    role === "admin"
      ? IAM_DASHBOARD_OIDC_ADMIN_SCOPES
      : IAM_DASHBOARD_OIDC_SCOPES
  );
  refresh();
}
