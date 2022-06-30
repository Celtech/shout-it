FROM node:18-bullseye-slim AS node
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update \
    && apt-get install -y --no-install-recommends tini python3 make g++ \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R node:node /app
USER node


FROM nginx:1.23.0-alpine AS nginx


FROM node AS api_base
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


FROM api_base AS api
WORKDIR /app/packages/api
COPY --chown=node:node ./packages/api ./
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
COPY ./docker/conf/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=app_builder /app/packages/app/dist /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
HEALTHCHECK CMD curl --fail http://127.0.0.1:3000 || exit 1
