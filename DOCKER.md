# <span style="color:#8e94f2">Docker Compose Setup for Likeo Platform</span>

## Overview

Likeo is a social media platform built with a microservices architecture using Docker Compose. This setup includes multiple backend services, a frontend, database, and object storage.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)
- PostgreSQL client (optional, for database access)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Database
- `PSQL_USER`: PostgreSQL username (default: postgres)
- `PSQL_PASS`: PostgreSQL password (default: password)

### MinIO Object Storage
- `MINIO_USER`: MinIO root username
- `MINIO_PASS`: MinIO root password

### JWT and Authentication
- `JWT_SECRET`: Secret key for JWT token signing
- `API_KEY`: API key for gateway authentication
- `COOKIE_SECRET`: Secret for cookie encryption (default: supersecret)

### Service URLs (for Gateway Proxying)
- `USER_SERVICE_URL`: URL for user service (default: https://user:3001)
- `POST_SERVICE_URL`: URL for post service (default: https://user:3002)  # Note: seems to be a typo in code, should be post:3002
- `CHAT_SERVICE_URL`: URL for chat service (default: https://chat:3003)
- `UPLOADFILE_SERVICE_URL`: URL for upload file service (default: https://upload_file:3004)
- `UPLOAD_SERVICE_URL`: URL for upload service (same as above, used in post service)

### MinIO Configuration (for Upload Service)
- `MINIO_HOST`: MinIO server host (default: localhost)
- `MINIO_ACCESS_KEY`: MinIO access key (default: admin)
- `MINIO_SECRET_KEY`: MinIO secret key (default: password123)

### SSL Certificates (Optional)
- `SSL_KEY64`: Base64 encoded SSL private key
- `SSL_CRT64`: Base64 encoded SSL certificate

### Database Connection
- `DATABASE_URL`: Full PostgreSQL connection string (e.g., "postgresql://postgres:password@database:5432/likeo?schema=public")

## Services Description

### cert-gen
- **Purpose**: Generates SSL certificates for HTTPS communication
- **Build**: `./docker/certGen`
- **Volumes**: Mounts certAuth volume for certificate storage
- **Restart**: No (runs once)

### database
- **Purpose**: PostgreSQL database for storing application data
- **Image**: postgres:17-bookworm
- **Ports**: Exposed on 5432 internally
- **Volumes**: postgres_data for data persistence
- **Environment**: Uses PSQL_USER and PSQL_PASS

### minio
- **Purpose**: Object storage for file uploads (images, etc.)
- **Image**: minio/minio:latest
- **Ports**: 9000 (API), 9001 (Console)
- **Volumes**: minio_data for data persistence
- **Environment**: Uses MINIO_USER and MINIO_PASS

### backend (gateway)
- **Purpose**: API Gateway that proxies requests to microservices and handles authentication
- **Build**: `./docker/backend_gateway/`
- **Ports**: 3000
- **Features**: JWT authentication, rate limiting, CORS, proxying to other services
- **Volumes**: certAuth for SSL certificates

### frontend
- **Purpose**: React frontend application served over HTTPS
- **Build**: `./docker/utils_frontend/`
- **Ports**: 8443 (HTTPS)
- **Depends on**: backend
- **Volumes**: certAuth for SSL certificates

### user
- **Purpose**: User management service (profiles, friends, authentication)
- **Build**: `./docker/backend_user/`
- **Ports**: Exposed on 3001 internally
- **Features**: User CRUD, friend requests, Prisma ORM with PostgreSQL
- **Volumes**: certAuth for SSL certificates

### post
- **Purpose**: Post management service (creating, liking, commenting on posts)
- **Build**: `./docker/backend_post/`
- **Ports**: Exposed on 3002 internally
- **Features**: Post CRUD, likes, integration with upload service
- **Volumes**: certAuth for SSL certificates

### chat
- **Purpose**: Real-time chat service using Socket.IO
- **Build**: `./docker/backend_chat/`
- **Ports**: Exposed on 3003 internally
- **Features**: WebSocket connections for messaging
- **Volumes**: certAuth for SSL certificates

### upload_file
- **Purpose**: File upload service for images and media
- **Build**: `./docker/backend_upload_file/`
- **Ports**: Exposed on 3004 internally
- **Features**: MinIO integration for file storage
- **Volumes**: certAuth for SSL certificates

## Running the Application

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required variables
3. Run `docker-compose up --build` to start all services
4. Access the application at https://localhost:8443
5. MinIO console at http://localhost:9001

## Ports

- Frontend: https://localhost:8443
- Gateway: http://localhost:3000
- MinIO API: http://localhost:9000
- MinIO Console: http://localhost:9001
- Database: localhost:5432 (internal only)

## Volumes

- `postgres_data`: PostgreSQL data persistence
- `certAuth`: SSL certificates shared between services
- `minio_data`: MinIO object storage data

## Networks

- `app_net`: Bridge network for inter-service communication

## Development

For development, you can run individual services locally by modifying the docker-compose.yml or using npm scripts in each service directory.

## Troubleshooting

- Ensure all environment variables are set correctly
- Check Docker logs with `docker-compose logs <service_name>`
- Verify SSL certificates are generated by cert-gen service
- For database issues, check DATABASE_URL format
