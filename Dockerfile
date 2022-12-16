FROM node:18-alpine3.15

RUN apk -U upgrade

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

#docker build -t my-app:1.0.0 .
#docker run -p 3000:3000 -v C:\Users\lena\react_app\app:/usr/src/app -it react:1.0.1 /bin/sh
#ejecutar npm i
#ejecutar npm start

