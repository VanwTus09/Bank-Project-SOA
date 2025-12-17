# =========================
# Stage 1: Build
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build Vite
RUN npm run build

# =========================
# Stage 2: Runtime (vite preview)
# =========================
FROM node:18-alpine

ENV NODE_ENV=production
ENV PORT=4173

WORKDIR /app

# Copy build output + node_modules cần thiết
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4173

# Vite preview serve static
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
