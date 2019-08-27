FROM node:10-alpine as dollarbot
LABEL maintainer="tonymtz <hello@tonymtz.com>"
WORKDIR /usr/src/app
COPY package*.json ./
ARG PORT=$PORT
ARG TOKEN_DISCORD=$TOKEN_DISCORD
RUN npm install
COPY . .
RUN echo "Oh dang look at that $PORT"
RUN echo "Oh dang look at that $TOKEN_DISCORD"
EXPOSE ${PORT}
CMD [ "node", "index.js" ]
