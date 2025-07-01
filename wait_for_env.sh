#!/bin/sh

# SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
#
# SPDX-License-Identifier: EUPL-1.2


MAX_RETRIES=10
DELAY=5s
ENV_FILE="/app/.env"

retry_count=0

while [ ! -f $ENV_FILE ] && [ $retry_count -lt $MAX_RETRIES ]; do
  retry_count=$((retry_count + 1))
  echo "Waiting for $ENV_FILE file... (Attempt ${retry_count}) of $MAX_RETRIES)"
  sleep $DELAY
done

if [ ! -f $ENV_FILE ]; then
  echo ".env file not found after $MAX_RETRIES attempts. Exiting."
  exit 1
fi

exec "$@"
