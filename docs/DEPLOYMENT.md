# Deployment Guide

This guide covers deploying the Kanban application to various environments.

## Table of Contents

- [Build Requirements](#build-requirements)
- [Docker Deployment](#docker-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Environment Variables](#environment-variables)
- [Database Integration](#database-integration)

## Build Requirements

Before deploying, ensure all builds pass locally:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Docker Deployment

### Build Docker Images

**Build both services:**
```bash
docker-compose build
```

**Build specific service:**
```bash
docker build --target api-runtime -t kanban-api .
docker build --target web-runtime -t kanban-web .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- API: http://localhost:3001

### Stop Services

```bash
docker-compose down
```

## Frontend Deployment

### Vercel (Recommended)

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your repository
   - Select `apps/web` as root directory

2. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_BASE_URL=https://api.example.com
   ```

3. **Deploy:**
   - Automatic deploys on push to main

### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Configure:**
   ```bash
   netlify init
   ```

3. **Build Command:**
   ```
   pnpm build && pnpm --filter @kanban/web build
   ```

4. **Publish Directory:**
   ```
   apps/web/.next
   ```

### Self-Hosted (Node.js)

1. **Build:**
   ```bash
   pnpm --filter @kanban/web build
   ```

2. **Run:**
   ```bash
   pnpm --filter @kanban/web start
   ```

3. **Systemd Service (Linux):**
   ```ini
   [Unit]
   Description=Kanban Web
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/path/to/kanban-monorepo
   ExecStart=/usr/bin/pnpm --filter @kanban/web start
   Restart=on-failure
   Environment="NODE_ENV=production"

   [Install]
   WantedBy=multi-user.target
   ```

## Backend Deployment

### Railway.app

1. **Connect Repository:**
   - Go to [Railway](https://railway.app)
   - Create new project
   - Connect GitHub repository

2. **Configure Service:**
   - Select root directory
   - Set `PORT=3001`
   - Environment: Production

3. **Build Command:**
   ```
   pnpm build
   ```

4. **Start Command:**
   ```
   node apps/api/dist/index.js
   ```

### Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **Create App:**
   ```bash
   heroku create kanban-api
   ```

4. **Set Buildpack:**
   ```bash
   heroku buildpacks:add --index 1 heroku/nodejs
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

### AWS EC2

1. **Create Instance:**
   - Ubuntu 22.04 LTS
   - Security group allowing ports 22, 3001

2. **Install Dependencies:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
   nvm install 20
   npm install -g pnpm
   ```

3. **Clone and Install:**
   ```bash
   git clone <repo>
   cd kanban-monorepo
   pnpm install
   pnpm build
   ```

4. **Run Service:**
   ```bash
   NODE_ENV=production node apps/api/dist/index.js
   ```

### Google Cloud Run

1. **Build and Push Image:**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/kanban-api .
   ```

2. **Deploy:**
   ```bash
   gcloud run deploy kanban-api \
     --image gcr.io/PROJECT_ID/kanban-api \
     --platform managed \
     --region us-central1 \
     --port 3001 \
     --set-env-vars NODE_ENV=production
   ```

### Azure Container Instances

1. **Build Image:**
   ```bash
   az acr build --registry myregistry --image kanban-api:latest .
   ```

2. **Deploy:**
   ```bash
   az container create \
     --resource-group mygroup \
     --name kanban-api \
     --image myregistry.azurecr.io/kanban-api:latest \
     --port 3001
   ```

## Environment Variables

### API Environment Variables

**Production (.env):**
```env
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
DATABASE_URL=postgresql://user:password@host/db
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://app.example.com
```

### Frontend Environment Variables

**Production (.env.production):**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

**Development (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Database Integration

### PostgreSQL Setup

1. **Install PostgreSQL Locally:**
   ```bash
   brew install postgresql  # macOS
   apt-get install postgresql  # Linux
   ```

2. **Create Database:**
   ```bash
   createdb kanban_dev
   ```

3. **Update API Configuration:**
   - Install database client: `pnpm --filter @kanban/api add pg`
   - Update connection string in `.env`

### Environment-Specific Configs

**Development:**
- SQLite or local PostgreSQL
- Detailed logging
- Hot reload enabled

**Staging:**
- Managed PostgreSQL database
- Basic logging
- Performance monitoring

**Production:**
- Managed database with backups
- Minimal logging (errors only)
- APM/monitoring enabled
- Connection pooling enabled

## Health Checks

### API Health Endpoint

```bash
curl https://api.example.com/api/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 12345.67
  }
}
```

### Monitoring

Set up monitoring for:
- API response times
- Error rates
- CPU/Memory usage
- Database connections

## Scaling Considerations

1. **Load Balancing:**
   - Use nginx/HAProxy in front of multiple API instances
   - CDN for static frontend assets

2. **Caching:**
   - Implement Redis for session/data caching
   - Frontend static export for certain pages

3. **Database:**
   - Use read replicas for queries
   - Implement database connection pooling

4. **API Optimization:**
   - Implement pagination (already done)
   - Add response caching headers
   - Use compression middleware

## CI/CD Pipeline

The monorepo includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

1. Tests on Node 18 and 20
2. Type checks code
3. Runs linter
4. Builds all packages
5. Runs test suite

Add deployment step to `.github/workflows/ci.yml` for continuous deployment:

```yaml
- name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  run: |
    # Your deployment script here
```

## Rollback Procedures

### Vercel
- Automatic rollback available in dashboard

### Docker
```bash
# Get previous image
docker images

# Run previous version
docker run -p 3001:3001 kanban-api:previous
```

### Manual Rollback
```bash
git revert <commit-hash>
git push
# Re-deploy
```

## Performance Optimization

1. **Frontend:**
   - Enable Static Generation for pages
   - Image optimization via Next.js
   - Code splitting

2. **Backend:**
   - Connection pooling
   - Database indexing
   - Response compression

3. **Network:**
   - CDN for assets
   - API response caching
   - Gzip compression

## Security Checklist

- [ ] Environment variables secured (never in code)
- [ ] HTTPS enabled on all endpoints
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] Database connection encrypted
- [ ] Secrets managed via secure vaults
- [ ] Regular dependency updates

---

For more details on specific platforms, refer to their official documentation.
