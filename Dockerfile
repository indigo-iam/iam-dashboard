FROM nginx:latest

COPY ./nginx/dashboard.conf /etc/nginx/conf.d/dashboard.conf
COPY ./init_env.sh /docker-entrypoint.d/init_env.sh
COPY ./dist/ /usr/share/nginx/html
