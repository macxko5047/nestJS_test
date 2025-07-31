FROM oven/bun:1.1.34 as build

WORKDIR /app

COPY bun.lockb package.json tsconfig.json ./
RUN bun install     # <-- ไม่มี --production

COPY . .

RUN bunx nest build    # <-- ใช้ bunx!

FROM oven/bun:1.1.34

WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000

CMD ["bun", "run", "start"]
