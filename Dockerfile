# Stage 1: Build Stage
FROM node:18.16.1-alpine AS build

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# Stage 2: Runtime Stage
FROM node:18.16.1-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY --from=build /app /app

EXPOSE 2000

CMD ["npm", "start"]
