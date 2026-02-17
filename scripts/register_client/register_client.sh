#!/bin/bash

# SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
#
# SPDX-License-Identifier: EUPL-1.2

set -e

working_directory=$(dirname $(realpath $0))

function print_secrets() {
  echo "Client ID:     ${IAM_DASHBOARD_OIDC_CLIENT_ID}"
  echo "Client Secret: ${IAM_DASHBOARD_OIDC_CLIENT_SECRET}"
  return 0
}

if [[ -f "/secrets/.env" ]]; then
  IAM_DASHBOARD_OIDC_CLIENT_ID=$(grep IAM_DASHBOARD_OIDC_CLIENT_ID "/secrets/.env" | awk -F'=' '{print $2}')
  IAM_DASHBOARD_OIDC_CLIENT_SECRET=$(grep "IAM_DASHBOARD_OIDC_CLIENT_SECRET" /secrets/.env | awk -F'=' '{print $2}')
  print_secrets
  exit 0
fi

microdnf install -y httpd-tools uuid gettext > /dev/null 2>&1
cd ${working_directory}

IAM_ENDPOINT="https://iam.test.example"
IAM_API_URL=${IAM_ENDPOINT}
IAM_DASHBOARD_BASE_URL=${IAM_ENDPOINT}
IAM_DASHBOARD_BASE_PATH="/ui"
IAM_DASHBOARD_CLIENT_NAME="iam-dashboard"
IAM_DASHBOARD_OIDC_CLIENT_ID=$(uuid -v4)
IAM_DASHBOARD_OIDC_CLIENT_SECRET=$(uuid -v4)
IAM_DASHBOARD_OIDC_CLIENT_SECRET_HASH=$(htpasswd -bnBC 12 "" "${IAM_DASHBOARD_OIDC_CLIENT_SECRET}")
IAM_DASHBOARD_AUTH_SECRET=$(openssl rand -base64 32)
IAM_DASHBOARD_REDIRECT_URI="${IAM_DASHBOARD_BASE_URL}${IAM_DASHBOARD_BASE_PATH}/api/auth/oauth2/callback/indigo-iam"
IAM_DASHBOARD_REDIRECT_URI_DEVELOPMENT="${IAM_DASHBOARD_BASE_URL}/dev/api/auth/oauth2/callback/indigo-iam"
IAM_DASHBOARD_REDIRECT_URI_DEVCONTAINER="${IAM_DASHBOARD_BASE_URL}/devcontainer/api/auth/oauth2/callback/indigo-iam"

export \
  IAM_API_URL \
  IAM_DASHBOARD_BASE_URL \
  IAM_DASHBOARD_BASE_PATH \
  IAM_DASHBOARD_CLIENT_NAME \
  IAM_DASHBOARD_OIDC_CLIENT_ID \
  IAM_DASHBOARD_OIDC_CLIENT_SECRET \
  IAM_DASHBOARD_OIDC_CLIENT_SECRET_HASH \
  IAM_DASHBOARD_AUTH_SECRET \
  IAM_DASHBOARD_REDIRECT_URI \
  IAM_DASHBOARD_REDIRECT_URI_DEVELOPMENT \
  IAM_DASHBOARD_REDIRECT_URI_DEVCONTAINER

query=$(envsubst < register_client.sql)

echo "$query" | mysql -h database \
  -u"$MYSQL_USER" \
  -p"$MYSQL_PASSWORD" \
  -D"$MYSQL_DATABASE" > /dev/null 2>&1

envsubst < .template.env > /secrets/.env

print_secrets

microdnf remove httpd-tools uuid gettext > /dev/null 2>&1
microdnf clean all > /dev/null 2>&1
