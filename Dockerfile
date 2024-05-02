FROM node:18

RUN npm install -g pnpm@8.9.0

WORKDIR /app

#COPY package*.json .turbo .eslintrc.js  .npmrc pnpm*.yaml tsconfig.json turbo.json  ./

COPY . .

RUN pnpm install

EXPOSE 8080

CMD ["pnpm", "dev"]