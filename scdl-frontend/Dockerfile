# ---- Builder ----
FROM oven/bun:1.2.5 AS builder
ARG VITE_BACKEND_URL

# Check if the backend URL is set, echo it
RUN echo "VITE_BACKEND_URL: $VITE_BACKEND_URL"

WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

# ---- Runner ----
FROM oven/bun:1.2.5-slim AS runner
WORKDIR /app
COPY --from=builder /app/.output .output

EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"] 