FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 VPS_STANDALONE=1
RUN npm run lint && npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ARG GIT_SHA
LABEL org.opencontainers.image.source="https://github.com/thaninchote9-rgb/dom2-live-site"
LABEL org.opencontainers.image.revision=$GIT_SHA
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 VPS_COMMIT_SHA=$GIT_SHA
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
