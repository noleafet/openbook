# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm globally inside the container
RUN npm install -g pnpm

# Copy package files from the nested folder to leverage Docker layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Fetch dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files from the nested folder
COPY . .

# Build the Next.js production output
RUN pnpm run build

# --- Production Stage ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone build and static assets from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000

# Standalone output runs natively on Node
CMD ["node", "server.js"]
