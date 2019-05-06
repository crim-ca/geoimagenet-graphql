FROM node:11.9-alpine

WORKDIR /

ADD package.json package.json
ADD package-lock.json package-lock.json
RUN npm install
ADD . .

CMD npm run start:ci
