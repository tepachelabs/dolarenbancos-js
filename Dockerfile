FROM node:10-alpine as dollarbot
LABEL maintainer="tonymtz <hello@tonymtz.com>"
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=$PORT
ARG TOKEN_DISCORD=$TOKEN_DISCORD
ARG TOKEN_BMX=$TOKEN_BMX
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD [ "node", "index.js" ]
