FROM ghcr.io/astral-sh/uv:python3.10-alpine

WORKDIR /app

# Install ffmpeg
RUN apk add --no-cache ffmpeg

# Copy project files
COPY . .

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1

# Install dependencies
RUN uv sync --frozen --no-cache

EXPOSE 8000

CMD ["/app/.venv/bin/fastapi", "run", "main.py", "--port", "8000"]