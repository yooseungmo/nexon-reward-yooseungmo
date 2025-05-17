# ─── 1) Build stage ─────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /workspace

# 어떤 서비스를 빌드할지 지정 
ARG SERVICE=event

COPY package.json package-lock.json ./
RUN npm ci

# 소스 복사 
COPY tsconfig*.json nest-cli.json ./
COPY apps apps
COPY libs libs

# 지정된 서비스만 빌드 
RUN npm run build:${SERVICE}

# ─── 2) Run stage ──────────────────────────────────
FROM node:18-alpine
WORKDIR /workspace

ARG SERVICE=event
ENV NODE_ENV=production

# 빌드된 결과물 복사
COPY --from=builder /workspace/dist/apps/${SERVICE} ./dist

# 프로덕션 의존성만 설치
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 서비스별 진입점
CMD ["node", "dist/main.js"]