#!/bin/bash

# Development startup script
set -e

echo "🚀 Starting AI Chatbot Platform in Development Mode..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your configuration"
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.dev.yml down

# Build and start development environment
echo "🔨 Building and starting development environment..."
docker-compose -f docker-compose.dev.yml up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose -f docker-compose.dev.yml exec app pnpm db:migrate

echo "✅ Development environment is ready!"
echo "🌐 Application: http://localhost:3000"
echo "🗄️  Database: localhost:5432"
echo "📊 Redis: localhost:6379"
echo ""
echo "📝 To view logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.dev.yml down"