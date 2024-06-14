FROM node:lts-alpine
#RUN npm install -g @vue/cli
#RUN npm i -g @quasar/cli
# RUN npm init quasar
# RUN npm install @vue/cli-service --save-dev

# RUN npm run serve
WORKDIR /var/www
#COPY package.json ./
#RUN  npm install
#EXPOSE 8080
CMD ["npm", "run", "serve"]


# docker-composer up # to start the compilation process
# to install npm package run
# docker-compose exec web npm i bootstrap