FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
# bcrypt runs on libuv's pool (4 threads by default); at 500 shoppers login p95 went 1.8s -> 0.27s with 16
ENV UV_THREADPOOL_SIZE=16
# shortcut: ships dev deps too (prisma CLI is needed for migrate on start); prune if image size matters
COPY --from=build /app ./
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/prisma/seed.js && node dist/src/main.js"]
