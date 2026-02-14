# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies (cache layer - invalidates when package*.json changes)
# Optional: pass --build-arg NPM_REGISTRY=https://registry.npmmirror.com if default registry is slow
ARG NPM_REGISTRY
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    if [ -n "$NPM_REGISTRY" ]; then npm config set registry "$NPM_REGISTRY"; fi && npm ci

# Copy source and config
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY swagger ./swagger
COPY src ./src

# Generate Prisma client and build
RUN npx prisma generate && npm run build

EXPOSE 4000
CMD ["sh", "-c", "npx prisma db push && node dist/server.js"]
