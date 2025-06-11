# Docker Deployment Guide

Complete Docker setup for the Enterprise AI Chatbot Platform with optimized production builds and development environment.

## 🚀 Quick Start

### Development Environment
```bash
# Start development environment with hot reload
./scripts/start-dev.sh

# Or manually
docker-compose -f docker-compose.dev.yml up --build
```

### Production Environment
```bash
# Copy and configure environment
cp .env.docker.example .env
# Edit .env with your configuration

# Start production environment
./scripts/start-prod.sh

# Or manually
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📁 File Structure

```
├── Dockerfile                 # Optimized production image
├── Dockerfile.dev            # Development image with hot reload
├── docker-compose.dev.yml    # Development environment
├── docker-compose.prod.yml   # Production environment
├── .dockerignore             # Docker ignore rules
├── .env.docker.example       # Environment template
├── nginx/
│   └── nginx.conf            # Nginx reverse proxy config
└── scripts/
    ├── start-dev.sh          # Development startup script
    ├── start-prod.sh         # Production startup script
    ├── backup-db.sh          # Database backup script
    └── init-db.sql           # Database initialization
```

## 🏗️ Docker Images

### Production Image (Multi-stage)
- **Base**: Node.js 18 Alpine
- **Optimized**: Multi-stage build with standalone output
- **Size**: ~200MB (optimized with .dockerignore)
- **Build time**: Build happens during `docker build`, not runtime
- **Features**: 
  - Standalone Next.js output for minimal runtime dependencies
  - Non-root user for security
  - Health checks included
  - Database migration support

### Development Image
- **Base**: Node.js 18 Alpine
- **Features**: Hot reload, volume mounting, debugging support
- **Size**: ~500MB (includes dev dependencies)

## 🗄️ PostgreSQL Setup

### Development Database
- **Database**: `ai_chatbot_dev`
- **User**: `postgres`
- **Password**: `password`
- **Port**: `5432`
- **Extensions**: uuid-ossp, pg_trgm

### Production Database
- **Database**: `ai_chatbot_prod`
- **User**: `postgres`
- **Password**: Set via `POSTGRES_PASSWORD` environment variable
- **Port**: `5432` (internal), configurable external port
- **Backup**: Automated backup script included
- **Health checks**: Configured with retry logic

## 🔧 Environment Configuration

### Development (.env.local)
```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_chatbot_dev
AUTH_SECRET=dev-secret-key
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-key-here
ADMIN_EMAIL=admin@example.com
```

### Production (.env)
```env
NODE_ENV=production
POSTGRES_PASSWORD=secure_password_here
DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@db:5432/ai_chatbot_prod
AUTH_SECRET=super-secure-secret-key
NEXTAUTH_URL=https://your-domain.com
OPENAI_API_KEY=your-production-key
ANTHROPIC_API_KEY=your-anthropic-key
ADMIN_EMAIL=admin@your-domain.com
```

## 🚦 Services

### Core Services

#### App Service
- **Ports**: 3000 (internal), 3000 (host)
- **Health check**: `/api/health` endpoint
- **Dependencies**: Database, Redis (optional)
- **Restart**: unless-stopped

#### PostgreSQL Database
- **Image**: postgres:15-alpine
- **Ports**: 5432
- **Health check**: pg_isready command
- **Volumes**: Persistent data storage
- **Backup**: Located in `./backups/`

#### Redis (Optional)
- **Image**: redis:7-alpine
- **Purpose**: Session storage, caching
- **Health check**: redis-cli ping
- **Security**: Password protected in production

### Production-Only Services

#### Nginx Reverse Proxy
- **Ports**: 80, 443
- **Features**: 
  - Rate limiting (API: 10 req/s, Login: 5 req/min)
  - Gzip compression
  - Security headers
  - SSL/TLS termination ready
- **Config**: `./nginx/nginx.conf`

## 🔄 Commands

### Development
```bash
# Start development environment
./scripts/start-dev.sh

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Access app container
docker-compose -f docker-compose.dev.yml exec app sh

# Run database migrations
docker-compose -f docker-compose.dev.yml exec app pnpm db:migrate

# Stop environment
docker-compose -f docker-compose.dev.yml down

# Clean up (remove volumes)
docker-compose -f docker-compose.dev.yml down -v
```

### Production
```bash
# Start production environment
./scripts/start-prod.sh

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Access app container
docker-compose -f docker-compose.prod.yml exec app sh

# Create database backup
./scripts/backup-db.sh

# Stop environment
docker-compose -f docker-compose.prod.yml down

# Update and rebuild
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up --build -d
```

### Database Operations
```bash
# Access PostgreSQL
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d ai_chatbot_prod

# Create backup
./scripts/backup-db.sh

# Restore from backup
docker-compose -f docker-compose.prod.yml exec -T db psql -U postgres -d ai_chatbot_prod < backup.sql

# View database logs
docker-compose -f docker-compose.prod.yml logs db
```

## 🔍 Monitoring & Health Checks

### Health Check Endpoints
- **App Health**: `http://localhost:3000/api/health`
- **Nginx Status**: `http://localhost:80/health`

### Health Check Response
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "3.0.6"
}
```

### Container Health Status
```bash
# Check container health
docker-compose -f docker-compose.prod.yml ps

# View health check logs
docker inspect --format='{{json .State.Health}}' container_name
```

## 🚀 Performance Optimizations

### Build Optimizations
1. **Multi-stage builds**: Separate build and runtime stages
2. **Standalone output**: Minimal runtime dependencies
3. **Layer caching**: Optimized layer order for better caching
4. **Dependencies**: Only production dependencies in final image

### Runtime Optimizations
1. **Non-root user**: Security and performance
2. **Health checks**: Proper container orchestration
3. **Resource limits**: Prevent resource exhaustion
4. **Nginx proxy**: Load balancing and SSL termination

## 🔐 Security Features

### Container Security
- Non-root user execution
- Read-only root filesystem (where possible)
- Minimal attack surface with Alpine base
- Security headers via Nginx

### Network Security
- Internal network isolation
- Rate limiting on API endpoints
- HTTPS ready configuration
- Environment variable injection

### Database Security
- Password-protected access
- Network isolation
- Regular automated backups
- Connection encryption ready

## 🐛 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs app

# Check environment variables
docker-compose -f docker-compose.prod.yml config

# Rebuild without cache
docker-compose -f docker-compose.prod.yml build --no-cache
```

#### Database Connection Issues
```bash
# Check database is running
docker-compose -f docker-compose.prod.yml ps db

# Test database connection
docker-compose -f docker-compose.prod.yml exec db pg_isready -U postgres

# Check database logs
docker-compose -f docker-compose.prod.yml logs db
```

#### Port Conflicts
```bash
# Find processes using ports
lsof -i :3000
lsof -i :5432

# Stop conflicting services
sudo systemctl stop postgresql
sudo systemctl stop nginx
```

### Performance Issues
```bash
# Check resource usage
docker stats

# Check container resources
docker-compose -f docker-compose.prod.yml top

# Monitor database performance
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -c "SELECT * FROM pg_stat_activity;"
```

## 📊 Monitoring Setup

### Logs
```bash
# Follow all logs
docker-compose -f docker-compose.prod.yml logs -f

# App logs only
docker-compose -f docker-compose.prod.yml logs -f app

# Database logs only
docker-compose -f docker-compose.prod.yml logs -f db
```

### Metrics Collection
For production monitoring, consider integrating:
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **Loki**: Log aggregation
- **Jaeger**: Distributed tracing

## 🔄 Updates and Maintenance

### Regular Updates
```bash
# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up --build -d

# Clean old images
docker image prune -f
```

### Backup Schedule
```bash
# Add to crontab for daily backups
0 2 * * * /path/to/project/scripts/backup-db.sh

# Weekly full backup with cleanup
0 3 * * 0 /path/to/project/scripts/backup-db.sh && docker system prune -f
```

## 🚀 Production Deployment Checklist

- [ ] Set strong passwords in `.env`
- [ ] Configure SSL certificates in `nginx/ssl/`
- [ ] Set up domain and DNS
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerting
- [ ] Configure automated backups
- [ ] Test health check endpoints
- [ ] Verify database migrations
- [ ] Test application functionality
- [ ] Set up log rotation
- [ ] Configure resource limits
- [ ] Document access credentials securely