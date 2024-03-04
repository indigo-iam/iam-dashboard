FROM nginx:1.24.0

COPY ./nginx/conf.d/prod/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/env/env.conf.template /etc/nginx/conf.d/env/env.conf.template
COPY ./nginx/entrypoint.sh /docker-entrypoint.d/entrypoint.sh
COPY ./dist/ /usr/share/nginx/html
