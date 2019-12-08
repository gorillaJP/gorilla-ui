FROM node:10 

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]