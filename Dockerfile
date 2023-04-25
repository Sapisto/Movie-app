FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx tsc

RUN apk add --no-cache mongodb-tools

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV MONGODB_URI=mongodb+srv://abdulazeezalasa:XIk3YMGHSEYLcBiR@cluster0.yjgg8tv.mongodb.net/movieappdb
ENV JWT_SECRET=thisismymovieapp

USER appuser

CMD ["node", "bin/www"]

EXPOSE 3111