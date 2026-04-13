FROM node:alpine AS builder

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend/ ./

RUN npm run build

FROM nginx:alpine

COPY ./config/likeo.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]