#!/bin/bash

# Production startup script
set -e

echo "🚀 Starting AI Chatbot Platform in Production Mode..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create from .env.docker.example"
    echo "cp .env.docker.example .env"
    echo "Then edit .env with your production configuration"
    exit 1
fi

# Validate required environment variables
required_vars=("AUTH_SECRET" "POSTGRES_PASSWORD" "OPENAI_API_KEY" "ADMIN_EMAIL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set"
        exit 1
    fi
done

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Build and start production environment
echo "🔨 Building and starting production environment..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 20

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose -f docker-compose.prod.yml exec app npx tsx lib/db/migrate.ts

# Create admin user if ADMIN_EMAIL is set
if [ ! -z "$ADMIN_EMAIL" ]; then
    echo "👤 Creating admin user..."
    docker-compose -f docker-compose.prod.yml exec app npx tsx scripts/set-admin.ts --email "$ADMIN_EMAIL"
fi

echo "✅ Production environment is ready!"
echo "🌐 Application: http://localhost:3000"
echo "🌐 Nginx Proxy: http://localhost:80"
echo ""
echo "📝 To view logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.prod.yml down"
echo "💾 To backup: ./scripts/backup-db.sh"