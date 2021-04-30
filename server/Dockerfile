FROM node:14-alpine

WORKDIR /usr/src/server

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

RUN npm install -g nodemon

CMD [ "nodemon", "index.js" ] 

