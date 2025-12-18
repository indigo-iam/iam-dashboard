// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export const settings = {
  IAM_API_URL: process.env.IAM_API_URL,
  IAM_DASHBOARD_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  IAM_DASHBOARD_BASE_URL: `${process.env.IAM_DASHBOARD_ENDPOINT}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`,
  IAM_AUTH_SECRET: process.env.IAM_AUTH_SECRET ?? "",
  IAM_DASHBOARD_CLIENT_ID: process.env.IAM_DASHBOARD_CLIENT_ID!,
  IAM_DASHBOARD_CLIENT_SECRET: process.env.IAM_DASHBOARD_CLIENT_SECRET,
  IAM_DASHBOARD_SCOPES: process.env.IAM_DASHBOARD_SCOPES,
};
