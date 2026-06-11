FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY ./docs/.vitepress/dist /app

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
