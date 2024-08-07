FROM node:14-alpine

WORKDIR /app

ENV DOCKERIZE_VERSION v0.6.1

RUN apk add --no-cache wget tar && \
    wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz && \
    rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package.json  .
COPY package-lock.json  .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
