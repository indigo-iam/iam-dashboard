#!/bin/sh
envsubst '$IAM_AUTHORITY,$IAM_AUTHORITY,$IAM_CLIENT_ID,$IAM_SCOPE' < /etc/nginx/conf.d/env/env.conf.template > /etc/nginx/conf.d/env/env.conf
exec "$@"
