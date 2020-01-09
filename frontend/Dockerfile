FROM node:12.2.0-alpine
RUN mkdir -p /todoapp/frontend
WORKDIR /todoapp/frontend

ENV PATH /todoapp/frontend/node_modules/.bin:$PATH

COPY . /todoapp/frontend
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]