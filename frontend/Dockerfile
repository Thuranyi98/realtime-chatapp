# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

# Build args for Next.js public env (baked at build time)
ARG NEXT_PUBLIC_APP_ENV=local
ARG NEXT_PUBLIC_API_URL_LOCAL=http://localhost:4000
ARG NEXT_PUBLIC_API_URL_STAGING=http://localhost:4000
ARG NEXT_PUBLIC_API_URL_PRODUCTION=http://localhost:4000
ARG NEXT_PUBLIC_SOCKET_URL_LOCAL=http://localhost:4000
ARG NEXT_PUBLIC_SOCKET_URL_STAGING=http://localhost:4000
ARG NEXT_PUBLIC_SOCKET_URL_PRODUCTION=http://localhost:4000

ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV
ENV NEXT_PUBLIC_API_URL_LOCAL=$NEXT_PUBLIC_API_URL_LOCAL
ENV NEXT_PUBLIC_API_URL_STAGING=$NEXT_PUBLIC_API_URL_STAGING
ENV NEXT_PUBLIC_API_URL_PRODUCTION=$NEXT_PUBLIC_API_URL_PRODUCTION
ENV NEXT_PUBLIC_SOCKET_URL_LOCAL=$NEXT_PUBLIC_SOCKET_URL_LOCAL
ENV NEXT_PUBLIC_SOCKET_URL_STAGING=$NEXT_PUBLIC_SOCKET_URL_STAGING
ENV NEXT_PUBLIC_SOCKET_URL_PRODUCTION=$NEXT_PUBLIC_SOCKET_URL_PRODUCTION

# Install dependencies (cache layer - invalidates when package*.json changes)
# Optional: pass --build-arg NPM_REGISTRY=https://registry.npmmirror.com if default registry is slow
ARG NPM_REGISTRY
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    if [ -n "$NPM_REGISTRY" ]; then npm config set registry "$NPM_REGISTRY"; fi && npm ci

# Copy source and config
COPY next.config.js postcss.config.js tailwind.config.ts tsconfig.json next-env.d.ts ./
COPY app ./app
COPY api ./api
COPY assets ./assets
COPY components ./components
COPY lib ./lib
COPY public ./public

# Build Next.js (standalone output goes to .next/standalone)
RUN npm run build

# Production stage: minimal image with only standalone output
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Copy standalone build output
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

CMD ["node", "server.js"]
