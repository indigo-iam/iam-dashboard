// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import packageInfo from "../package.json";

const isBuilding = process.env.NEXT_PHASE === "phase-production-build";
export const isProduction = process.env.NODE_ENV === "production";

function loadEnvVariable(key: string, defaultValue?: string) {
  if (process.env[key]) {
    return process.env[key];
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  if (isBuilding) {
    return "";
  }
  throw Error(`${key} environment variable not set`);
}

function loadOptionalUrlFromEnv(key: string) {
  const url = process.env[key];
  // if a url is provided, validate it
  if (url) {
    try {
      new URL(url);
    } catch {
      throw new Error(`${key} is not a valid URL`);
    }
  }
  return url;
}

function loadApiUrl() {
  return isBuilding
    ? "https://iam.test.example"
    : loadEnvVariable("IAM_API_URL");
}

function loadAppVersion() {
  return packageInfo.version ?? "0.0.0";
}

function loadBaseUrl() {
  return isBuilding
    ? "https://iam.test.example"
    : loadEnvVariable("IAM_DASHBOARD_BASE_URL");
}

function loadBasePath() {
  return loadEnvVariable("IAM_DASHBOARD_BASE_PATH", "");
}

function loadAuthSecret() {
  return loadEnvVariable("IAM_DASHBOARD_AUTH_SECRET");
}

function loadOidcClientId() {
  return loadEnvVariable("IAM_DASHBOARD_CLIENT_ID");
}

function loadOidcClientSecret() {
  return loadEnvVariable("IAM_DASHBOARD_CLIENT_SECRET");
}

function loadOidcScopes() {
  return "openid email profile offline_access scim:read scim:write";
}

function loadOidcAdminScopes() {
  return "openid email profile offline_access scim:read scim:write iam:admin.read iam:admin.write";
}

function loadOtelExporterOtlpEndpoint() {
  return loadOptionalUrlFromEnv("IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT");
}

function loadOrganizationName() {
  return loadEnvVariable("IAM_DASHBOARD_ORGANIZATION_NAME", "cnafsd");
}

function loadPolicyUrl() {
  const key = "IAM_DASHBOARD_POLICY_URL";
  return loadOptionalUrlFromEnv(key);
}

function loadSupportUrl() {
  const key = "IAM_DASHBOARD_SUPPORT_URL";
  return loadOptionalUrlFromEnv(key);
}

export const settings = {
  IAM_API_URL: loadApiUrl(),
  IAM_DASHBOARD_APP_VERSION: loadAppVersion(),
  IAM_DASHBOARD_BASE_URL: loadBaseUrl(),
  IAM_DASHBOARD_BASE_PATH: loadBasePath(),
  IAM_DASHBOARD_AUTH_SECRET: loadAuthSecret(),
  IAM_DASHBOARD_CLIENT_ID: loadOidcClientId(),
  IAM_DASHBOARD_CLIENT_SECRET: loadOidcClientSecret(),
  IAM_DASHBOARD_OIDC_SCOPES: loadOidcScopes(),
  IAM_DASHBOARD_OIDC_ADMIN_SCOPES: loadOidcAdminScopes(),
  IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT: loadOtelExporterOtlpEndpoint(),
  IAM_DASHBOARD_ORGANIZATION_NAME: loadOrganizationName(),
  IAM_DASHBOARD_POLICY_URL: loadPolicyUrl(),
  IAM_DASHBOARD_SUPPORT_URL: loadSupportUrl(),
};
