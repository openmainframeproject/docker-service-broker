FROM node:carbon
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm i request

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
