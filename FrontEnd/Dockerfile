# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /scheduler

# add `/app/node_modules/.bin` to $PATH
ENV PATH /scheduler/node_modules/.bin:$PATH

# install app dependencies
COPY scheduler/package.json ./
COPY scheduler/package-lock.json ./
RUN npm install --silent

# add app
COPY scheduler/ ./

# start app
CMD ["npm", "start"]
