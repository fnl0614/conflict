#!/bin/sh

echo "Waiting for database to be ready..."

while ! nc -z database 5432; do
  sleep 1
  echo "Waiting for database connection..."
done

echo "Database is ready!"

echo "Pushing Prisma schema..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo "Prisma schema pushed successfully!"
else
    echo "Error pushing Prisma schema"
    exit 1
fi

npx prisma generate

echo "Starting application..."
exec "$@"