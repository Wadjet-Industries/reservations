FROM node:8.15.1

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --only=prod

EXPOSE 3002

CMD [ "npm", "run", "server" ]