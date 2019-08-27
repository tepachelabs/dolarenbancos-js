FROM node:10-alpine as dollarbot-build
LABEL maintainer="tonymtz <hello@tonymtz.com>"
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=8080
ENV TOKEN_DISCORD=$TOKEN_DISCORD
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "index.js" ]
