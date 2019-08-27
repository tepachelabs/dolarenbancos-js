FROM node:10-alpine as dollarbot-build
LABEL maintainer="tonymtz <hello@tonymtz.com>"
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=$PORT
ENV TOKEN_DISCORD=$TOKEN_DISCORD
RUN npm install
COPY . .
EXPOSE $PORT
CMD [ "node", "index.js" ]
