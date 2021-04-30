FROM node:14-alpine

WORKDIR /usr/src/client

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn","start"]
