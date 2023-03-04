FROM node:18-alpine as dev

WORKDIR /app

COPY . .

EXPOSE 3001

CMD [ "yarn", "dev", "-p", "3001" ]

FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN yarn build

FROM node:18-alpine as prod

WORKDIR /app

COPY --from=build /app/.next .
COPY --from=build /app/node_modules .
COPY --from=build /app/package.json .

EXPOSE 3001

CMD [ "yarn", "start", "-p", "3001" ]
