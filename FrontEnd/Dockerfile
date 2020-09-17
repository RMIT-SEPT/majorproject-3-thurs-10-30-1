# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /scheduler

# add `/app/node_modules/.bin` to $PATH
ENV PATH /scheduler/node_modules/.bin:$PATH

# install app dependencies
COPY /scheduler/package.json ./
COPY /scheduler/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]


# docker build -t sample:dev .

#docker run \
#    -it \
#    --rm \
#    -v ${PWD}:/app \
#    -v /scheduler/package.json \
#    -v /scheduler/node_modules \
#    -p 3001:3000 \
#    -e CHOKIDAR_USEPOLLING=true \
#    sample:dev