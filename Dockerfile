FROM node:20-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD node -e "fetch('http://localhost:3002/api/health').then(r => process.exit(r.ok ? 0 : 1))" || exit 1

CMD ["node", "server.js"]
