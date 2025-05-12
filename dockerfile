FROM oven/bun:1.2.9

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
