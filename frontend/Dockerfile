FROM node:12.2.0-alpine as build
RUN mkdir -p /todoapp/frontend
WORKDIR /todoapp/frontend

ENV PATH /todoapp/frontend/node_modules/.bin:$PATH

RUN npm install -g yarn
COPY . /todoapp/frontend
RUN yarn install
RUN yarn build
EXPOSE 3001

CMD ["yarn", "start"]