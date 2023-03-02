FROM node:18-alpine as dev

WORKDIR /app

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]

FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN yarn build

FROM node:18-alpine as prod

WORKDIR /app

COPY --from=build /app/.next .
COPY --from=build /app/node_modules .
COPY --from=build /app/package.json .

EXPOSE 3000

CMD [ "yarn", "start", "-p", "3001" ]
