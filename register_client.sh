#!/bin/bash

# SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
#
# SPDX-License-Identifier: EUPL-1.2

set -e

if [ -f "/secrets/.env" ]; then
  echo "Client already registered. Nothing to do."
  exit 0
fi

microdnf install -y httpd-tools uuid gettext > /dev/null 2>&1

IAM_ENDPOINT="http://iam.test.example:8080"
CLIENT_ID=$(uuid -v4)
CLIENT_SECRET=$(uuid -v4)
CLIENT_SECRET_HASH=$(htpasswd -bnBC 12 "" "${CLIENT_SECRET}")
SCOPES="openid email profile scim:read scim:write iam:admin.read iam:admin.write"
AUTH_SECRET=$(openssl rand -base64 32)
REDIRECT_URI="${IAM_ENDPOINT}/new-dashboard/api/auth/callback/indigo-iam"

export CLIENT_ID CLIENT_SECRET CLIENT_SECRET_HASH AUTH_SECRET REDIRECT_URI SCOPES

query=$(envsubst < register_client.sql)

echo "$query" | mysql -h database \
  -u"$MYSQL_USER" \
  -p"$MYSQL_PASSWORD" \
  -D"$MYSQL_DATABASE" > /dev/null 2>&1

envsubst  < /.template.env  > /secrets/.env

echo "Client ID: ${CLIENT_ID}"
echo "Client Secret: ${CLIENT_SECRET}"
echo "Encrypted Client Secret: ${CLIENT_SECRET_HASH}"

microdnf remove httpd-tools uuid gettext > /dev/null 2>&1
microdnf clean all > /dev/null 2>&1

echo Goodbye!
