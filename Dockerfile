FROM node:alpine AS base
RUN apk update && apk add --no-cache npm

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000
CMD [ "pnpm","run", "dev"] 