#!/bin/bash

# Database backup script for production
set -e

# Load environment variables
if [ -f .env ]; then
    source .env
fi

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="ai_chatbot_backup_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "📦 Creating database backup..."

# Create backup
docker-compose -f docker-compose.prod.yml exec -T db pg_dump \
    -U postgres \
    -d ai_chatbot_prod \
    --no-owner \
    --no-privileges \
    --clean \
    --if-exists > "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress backup
gzip "${BACKUP_DIR}/${BACKUP_FILE}"

echo "✅ Backup created: ${BACKUP_DIR}/${BACKUP_FILE}.gz"

# Keep only last 10 backups
cd $BACKUP_DIR
ls -t ai_chatbot_backup_*.sql.gz | tail -n +11 | xargs -r rm

echo "🧹 Old backups cleaned up (keeping latest 10)"