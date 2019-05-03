FROM node:11.9-alpine

COPY package.json package-lock.json /
COPY ./src /src

RUN npm install

WORKDIR /

CMD ["npm", "start"]
