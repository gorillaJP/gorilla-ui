FROM node:latest

#a wrapper to node http server, which aware create react app
#PROD RUN npm install -g serve

WORKDIR /app

ADD . /app

RUN npm install 

#create react app prod build
# PROD RUN npm run build

EXPOSE 3000

#PROD CMD ["npm", "run", "startProd"]
CMD ["npm", "run", "uat"]