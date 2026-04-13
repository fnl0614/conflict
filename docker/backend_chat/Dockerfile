FROM node:alpine AS builder

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install

COPY ./backend/ ./

RUN npm run build

FROM node:alpine

RUN apk add bash

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/chat.js"]
