FROM nginx:latest

COPY nginx/iam.conf /etc/nginx/conf.d/default.conf
COPY ../init_env.sh /docker-entrypoint.d/init_env.sh
COPY ../dist/ /usr/share/nginx/html
