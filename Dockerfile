FROM node:16-alpine3.11

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 5000

RUN npm start