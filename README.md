# EntoDex

Reconnaissance et collection d'insectes par la computer vision.

## TechStack 

| Technologie | Version |
|-------------|---------|
| **Monorepo** | pnpm 9.0.0, Turborepo 2.9.14 |
| **Langage** | TypeScript 5.9.3 |
| **Runtime** | Node.js 20 |
| **Web** (`apps/web`) | Next.js 14.2.35, React 18.3.1 |
| **API IA** (`apps/ia/api`) | Next.js 14.2.35, React 18.3.1, Socket.IO 4.8.3 |
| **Mobile** (`apps/mobile`) | Expo 55.0.25, React Native 0.83.6, React 19.2.0 |
| **Infrastructure** | Docker Compose 3.9, PostgreSQL 16, Redis 7 |
| **CI** | GitHub Actions (lint, typecheck, build) |

## Structure du dépôt

```
apps/web/        → Application web
apps/ia/api/     → API et services IA
apps/mobile/     → Application mobile Expo
shared/          → Shared code
infra/           → Environnement de développement Docker, scripts
```
