FROM node:20-alpine as dollarbot
LABEL maintainer="tonymtz <hello@tonymtz.com>"
LABEL maintainer="jmsalcido <jmsalcido@gmail.com>"
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=$PORT
ENV NODE_ENV=production
RUN apk update && apk add --no-cache python3 make g++ && npm install && apk del python3 make g++
COPY . .
EXPOSE ${PORT}
CMD [ "node", "index.js" ]
