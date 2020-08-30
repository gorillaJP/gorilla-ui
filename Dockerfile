FROM node:latest

#a wrapper to node http server, which aware create react app
#PROD RUN npm install -g serve

WORKDIR /app

ADD . /app

RUN npm install

#create react app prod build
RUN npm run build

EXPOSE 443

RUN npm run prodBuildServer

#CMD ["npm", "run", "uat"]
#CMD ["npm", "run", "reactStartProd"]
#CMD ["npm", "run", "reactStartProdTest2"]
CMD ["npm", "run", "prod"]
