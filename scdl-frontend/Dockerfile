# ---- Builder ----
FROM oven/bun:1.2.5 AS builder
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