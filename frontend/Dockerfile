FROM node:12.2.0-alpine
RUN mkdir -p /todoapp/frontend
WORKDIR /todoapp/frontend

ENV PATH /todoapp/frontend/node_modules/.bin:$PATH

RUN npm install -g yarn
COPY . /todoapp/frontend
RUN yarn install
EXPOSE 3001

CMD ["yarn", "start"]