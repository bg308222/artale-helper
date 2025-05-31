FROM oven/bun:1.2.15 AS base

COPY . .
RUN bun install --frozen-lockfile

ENTRYPOINT ["bun", "run", "start"]
EXPOSE 3000
