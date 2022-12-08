FROM node:18-alpine3.15

RUN apk -U upgrade

RUN mkdir -p /home/react_app

WORKDIR /home/react_app

COPY ./app/package*.json ./

RUN npm i

#RUN npm i react-scripts

EXPOSE 3000

#CMD ["npm", "start"]

#docker run -p 3000:3000 -v C:\Users\eloisa\react_app\app:/home/react_app -it d834d1e2dc102a238d52f19ff43e5359f1c1f1658d8ace4608320dacfb22e149 /bin/sh