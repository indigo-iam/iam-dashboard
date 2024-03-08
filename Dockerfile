FROM nginx:1.24.0

ENV NGINX_ENVSUBST_OUTPUT_DIR /etc/nginx/conf.d/env/

COPY ./nginx/conf.d/prod/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/env/env.conf.template /etc/nginx/templates/env.conf.template
COPY ./dist/ /usr/share/nginx/html

RUN mkdir /etc/nginx/conf.d/env/
