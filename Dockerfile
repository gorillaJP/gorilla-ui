FROM node:latest

#a wrapper to node http server, which aware create react app
RUN npm install -g serve

WORKDIR /app

ADD . /app

RUN npm install 

#create react app prod build
RUN npm run build

EXPOSE 3000

CMD ["serve", "run", "startProd"]