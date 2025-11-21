# Copilot Instructions for TimeNest

## Overview
This workspace contains two main projects:
- **time-nest-ui**: Angular 19+ frontend (in `time-nest-ui/`)
- **time-nest-api**: Node.js backend (in `time-nest-api/`), using Prisma ORM and Supabase

## Architecture & Key Patterns
- **Frontend (Angular)**
  - Source code in `src/app/`.
  - Features are organized by domain under `core/features/` (e.g., `auth`, `calendar`, `favorites`).
  - Shared UI components in `shared/ui/`.
  - State management via `store/` (e.g., `users.store.ts`, `organizations.store.ts`).
  - Services in `core/services/` handle API calls and business logic.
  - Use Angular CLI for scaffolding: `ng generate component|service|module ...`.
  - Styles: global in `styles.scss`, per-component in `.scss` files.

- **Backend (Node.js + Prisma + Supabase)**
  - Source code in `src/`.
  - REST API routes grouped by resource in `src/routes/` (e.g., `users`, `organizations`, `teams`, `time-off-events`).
  - Prisma schema in `prisma/schema.prisma`.
  - Environment variables in `.env` (including Supabase and database credentials).
  - Migrations in `prisma/migrations/`.
  - Use `@supabase/supabase-js` for Supabase integration.

## Developer Workflows
- **Frontend**
  - Start dev server: `ng serve` (or `npm start`)
  - Run unit tests: `ng test` (or `npm test`)
  - Build for production: `ng build`
  - Scaffold new features: `ng g c core/features/[feature]`

- **Backend**
  - Install dependencies: `npm install`
  - Run server: (entrypoint likely `src/index.ts`)
  - Manage database:
    - Run migrations: `npx prisma migrate dev`
    - Open Prisma Studio: `npx prisma studio`
    - Seed DB: `npx ts-node prisma/seed.ts`

## Conventions & Integration
- **API communication**: Frontend services call backend REST endpoints, typically via Angular services in `core/services/`.
- **Type safety**: Shared interfaces in `core/interfaces/` (frontend) and `src/payloads/` (backend).
- **Environment**: Sensitive keys in `.env` (never commit secrets).
- **Testing**: Unit tests in `*.spec.ts` files (Angular/Karma).
- **External**: Supabase is used for authentication and possibly storage; Prisma for DB access.

## Examples
- To add a new feature (e.g., `reports`):
  1. Scaffold with Angular CLI in `core/features/reports/`.
  2. Add state management in `store/` if needed.
  3. Create backend route in `src/routes/reports/` and update Prisma schema if DB changes are needed.

## References
- See `README.md` in `time-nest-ui/` for Angular CLI usage.
- Prisma docs: https://www.prisma.io/docs/
- Supabase docs: https://supabase.com/docs/

---
For any unclear conventions or missing documentation, ask the user for clarification or examples from the codebase.
