FROM node:8.15.1

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app