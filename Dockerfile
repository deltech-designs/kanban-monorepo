# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy packages and apps
COPY packages ./packages
COPY apps ./apps

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build all packages and apps
RUN pnpm build

# Runtime stage for API
FROM node:20-alpine AS api-runtime

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile --prod

EXPOSE 3001

CMD ["node", "apps/api/dist/index.js"]

# Runtime stage for Web
FROM node:20-alpine AS web-runtime

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile --prod
RUN pnpm --filter @kanban/web build

EXPOSE 3000

CMD ["pnpm", "--filter", "@kanban/web", "start"]
