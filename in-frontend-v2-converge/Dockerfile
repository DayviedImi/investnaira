FROM node:8-alpine
RUN apk add git
RUN mkdir /www
WORKDIR /www
RUN mkdir /www/app
COPY package.json /www/app/
COPY package-lock.json /www/app/
RUN cd /www/app && npm install
COPY . /www/app
RUN cd /www/app && npm run build && mv /www/app/build/* /www/ && rm -r /www/app
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-l", "5000", "--single"]