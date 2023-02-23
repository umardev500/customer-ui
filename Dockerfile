FROM node:18-alpine as dev

WORKDIR /app

COPY . .

EXPOSE 3001

CMD [ "yarn", "dev", "--port", "3001" ]