FROM node:alpine AS builder

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install

COPY ./backend/ ./

RUN npx prisma generate
RUN npm run build

FROM node:alpine

RUN apk add bash

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./
COPY --from=builder /app/run.sh ./

RUN npm install prisma --no-save
RUN chmod +x ./run.sh

ENTRYPOINT ["./run.sh"]
CMD ["node", "dist/user.js"]