// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import packageInfo from "../package.json";

const isBuilding = process.env.NEXT_PHASE === "phase-production-build";

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
  return loadEnvVariable("IAM_DASHBOARD_OIDC_CLIENT_ID");
}

function loadOidcClientSecret() {
  return loadEnvVariable("IAM_DASHBOARD_OIDC_CLIENT_SECRET");
}

function loadOidcScopes() {
  return "openid email profile scim:read scim:write";
}

function loadOidcAdminScopes() {
  return "openid email profile scim:read scim:write iam:admin.read iam:admin.write";
}

// function loadOidcScopes() {
// return "openid email profile offline_access scim:read scim:write";
// }

// function loadOidcAdminScopes() {
// return "openid email profile offline_access scim:read scim:write iam:admin.read iam:admin.write";
// }

function loadOtelExporterOtlpEndpoint() {
  return loadEnvVariable(
    "IAM_OTEL_EXPORTER_OTLP_ENDPOINT",
    "https://otello.cloud.cnaf.infn.it:8443/collector/v1/traces"
  );
}

export const settings = {
  IAM_API_URL: loadApiUrl(),
  IAM_DASHBOARD_APP_VERSION: loadAppVersion(),
  IAM_DASHBOARD_BASE_URL: loadBaseUrl(),
  IAM_DASHBOARD_BASE_PATH: loadBasePath(),
  IAM_DASHBOARD_AUTH_SECRET: loadAuthSecret(),
  IAM_DASHBOARD_OIDC_CLIENT_ID: loadOidcClientId(),
  IAM_DASHBOARD_OIDC_CLIENT_SECRET: loadOidcClientSecret(),
  IAM_DASHBOARD_OIDC_SCOPES: loadOidcScopes(),
  IAM_DASHBOARD_OIDC_ADMIN_SCOPES: loadOidcAdminScopes(),
  IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT: loadOtelExporterOtlpEndpoint(),
};
