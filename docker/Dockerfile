FROM node:18.4.0-alpine AS node
WORKDIR /app
ENV NODE_ENV=production
RUN apk update \
    && apk add -y --no-cache tini \
    && chown -R node:node /app
USER node


FROM node:18.4.0-alpine AS node_builder
WORKDIR /app
ENV NODE_ENV=production
RUN apk update \
    && apk add -y --no-cache tini python3 make g++ \
    && chown -R node:node /app
USER node


FROM nginx:1.23.0-alpine AS nginx


FROM node_builder AS api_base
COPY --chown=node:node package*.json yarn*.lock ./
COPY --chown=node:node ./packages/api/package.json ./packages/api/package.json
RUN yarn install --frozen-lockfile --production && yarn cache clean --force


FROM api_base AS api_dev
ENV NODE_ENV=development
RUN yarn install --production=false
WORKDIR /app/packages/api
COPY --chown=node:node ./packages/api ./
EXPOSE 3001
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node_modules/.bin/nodemon", "src/"]
HEALTHCHECK CMD curl --fail http://127.0.0.1:3001 || exit 1


FROM node AS api
ARG BUILD_DATE
ARG VCS_REF
ARG BUILD_VERSION
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.name="shoutitbot/api"
LABEL org.label-schema.description="Feather.js Express backend API for Shout It Telegram bot management"
LABEL org.label-schema.url="https://shoutit.io/"
LABEL org.label-schema.vcs-url="https://github.com/Celtech/shout-it"
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.vendor="Shout It Ltd."
LABEL org.label-schema.version=$BUILD_VERSION
LABEL org.label-schema.docker.cmd="docker run -p 3001:3001 -d shoutitbot/api"
WORKDIR /app/packages/api
COPY --chown=node:node ./packages/api ./
COPY --chown=node:node --from=api_base /app/node_modules /app/node_modules
EXPOSE 3001
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "src/"]
HEALTHCHECK CMD curl --fail http://127.0.0.1:3001 || exit 1


FROM node AS app_base
COPY --chown=node:node package*.json yarn*.lock ./
COPY --chown=node:node ./packages/app/package.json ./packages/app/package.json
RUN yarn install --frozen-lockfile --production=false && yarn cache clean --force


FROM app_base AS app_dev
ENV NODE_ENV=development
WORKDIR /app/packages/app
COPY --chown=node:node ./packages/app ./
EXPOSE 3000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node_modules/.bin/vite", "dev"]
HEALTHCHECK CMD curl --fail http://127.0.0.1:3000 || exit 1


FROM app_base AS app_builder
WORKDIR /app/packages/app
COPY --chown=node:node ./packages/app ./
RUN yarn build


FROM nginx AS app
ARG BUILD_DATE
ARG VCS_REF
ARG BUILD_VERSION
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.name="shoutitbot/app"
LABEL org.label-schema.description="Vue 3 frontend web application for Shout It Telegram bot management"
LABEL org.label-schema.url="https://shoutit.io/"
LABEL org.label-schema.vcs-url="https://github.com/Celtech/shout-it"
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.vendor="Shout It Ltd."
LABEL org.label-schema.version=$BUILD_VERSION
LABEL org.label-schema.docker.cmd="docker run -p 3000:3000 -d shoutitbot/app"
COPY ./docker/conf/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/* && \
    chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx
COPY --chown=nginx:nginx --from=app_builder /app/packages/app/dist /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
HEALTHCHECK CMD curl --fail http://127.0.0.1:3000 || exit 1
