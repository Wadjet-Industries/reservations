FROM node:8.15.1

run mkdir -p database/

WORKDIR database/

COPY . database/

RUN npm install mongoose moment --save

CMD ["node", "database/seedMongo.js"]