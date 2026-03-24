# Architecture Overview

This document provides a high-level overview of the Kanban monorepo architecture.

## 🏗️ Monorepo Architecture

This is a **pnpm workspace monorepo** with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                   Kanban Monorepo                       │
├─────────────────────────────────────────────────────────┤
│  apps/                                                  │
│  ├── web (Next.js 14+ with App Router)                 │
│  │   └── Consumes: @kanban/{types, utils, config}      │
│  └── api (Express REST API)                            │
│      └── Provides: @kanban/{types, utils, config}      │
├─────────────────────────────────────────────────────────┤
│  packages/ (Shared)                                     │
│  ├── types (TypeScript type definitions)               │
│  ├── utils (Utility functions)                         │
│  └── config (Constants & configuration)                │
├─────────────────────────────────────────────────────────┤
│  Configuration Files                                    │
│  ├── pnpm-workspace.yaml (workspace definition)        │
│  ├── tsconfig.json (base TS config)                    │
│  ├── package.json (root scripts & dependencies)        │
│  └── .eslintrc.json (code quality)                     │
├─────────────────────────────────────────────────────────┤
│  Documentation & Deployment                             │
│  ├── README.md (project overview)                      │
│  ├── docs/ (API, development, deployment guides)       │
│  ├── Dockerfile (containerization)                     │
│  └── .github/workflows/ (CI/CD)                        │
└─────────────────────────────────────────────────────────┘
```

## 📦 Package Organization

### `apps/api` - Express REST API

**Purpose**: Provides REST endpoints for board and task management

**Key Files**:
- `src/index.ts` - Server entry point, middleware setup
- `src/routes/boards.ts` - Board CRUD operations
- `src/routes/tasks.ts` - Task CRUD with filtering
- `src/routes/health.ts` - Health check endpoint
- `package.json` - Dependencies: express, cors, uuid
- `tsconfig.json` - Compiled to ./dist

**API Structure**:
```
GET    /api/health                    - Health check
GET    /api/boards?page=1&limit=20   - List boards (paginated)
GET    /api/boards/:id                - Get single board
POST   /api/boards                    - Create board
PUT    /api/boards/:id                - Update board
DELETE /api/boards/:id                - Delete board

GET    /api/tasks?boardId=x&status=y - List tasks (paginated + filtered)
GET    /api/tasks/:id                 - Get single task
POST   /api/tasks                     - Create task
PUT    /api/tasks/:id                 - Update task
DELETE /api/tasks/:id                 - Delete task
```

### `apps/web` - Next.js Frontend

**Purpose**: Server and client-side rendered UI built with Next.js

**Key Files**:
- `src/app/layout.tsx` - Root layout (App Router)
- `src/app/page.tsx` - Home page with board listing
- `src/lib/api-client.ts` - Type-safe API client wrapper
- `next.config.js` - Next.js configuration
- `tsconfig.json` - Extended with path aliases (@/*, @components/*, etc.)

**Key Features**:
- App Router with server/client components
- Type-safe API integration
- Environment-based API URL configuration
- Responsive component structure ready for expansion

### `packages/types` - Shared Types

**Purpose**: Single source of truth for all TypeScript types

**Exports**:
- `index.ts` - Common response/pagination types
- `api/index.ts` - API-specific types (Success/Error responses)
- `domain/index.ts` - Domain entities (Board, Task, User, TaskStatus enum)

**Type Philosophy**: All types exported and shared to prevent duplication and ensure consistency.

### `packages/utils` - Shared Utilities

**Purpose**: Reusable utility functions

**Categories**:
- **Validation** (`validation/index.ts`):
  - Email, URL, UUID validation
  - Type guards (isEmpty, isNonEmpty)
  - Pagination parameter validation

- **Formatting** (`formatting/index.ts`):
  - Date/time formatting (Intl API)
  - File size formatting
  - String case conversion (kebab, PascalCase)

- **Helpers** (`index.ts`):
  - Environment variable management
  - Development/production detection
  - Delay/timer utilities

### `packages/config` - Shared Configuration

**Purpose**: Centralized constants and configuration

**Exports**:
- App metadata (APP_NAME, APP_VERSION)
- API configuration (API_BASE_URL, timeout)
- Pagination defaults
- HTTP status codes
- Error messages
- Validation rules (password length, max sizes)

## 🔗 Workspace Dependencies

All internal dependencies use the **workspace protocol**:

```json
{
  "dependencies": {
    "@kanban/config": "workspace:*",
    "@kanban/types": "workspace:*",
    "@kanban/utils": "workspace:*"
  }
}
```

This ensures:
- Instant local resolution (no npm registry lookup)
- Automatic version alignment
- No circular dependencies possible

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | TypeScript | ^5.3.3 |
| Package Manager | pnpm | ^9.0.0 |
| Frontend Framework | Next.js | ^14.0.4 |
| Frontend Library | React | ^18.2.0 |
| Backend Framework | Express | ^4.18.2 |
| Runtime | Node.js | >=18.17.0 |
| HTTP Client | Fetch API | Native |
| Code Quality | ESLint | ^8.56.0 |
| Formatting | Prettier | (via settings) |
| Container | Docker | Any version |
| Orchestration | Docker Compose | ^3.8 |

## 📊 Data Models

### Board
```typescript
{
  id: string (UUID)
  name: string
  description: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
```

### Task
```typescript
{
  id: string (UUID)
  title: string
  description: string
  status: "TODO" | "IN_PROGRESS" | "DONE"
  boardId: string (reference)
  createdAt: Date
  updatedAt: Date
}
```

### API Response Pattern
```typescript
{
  success: boolean
  data?: T
  error?: string
  pagination?: { page, limit, total, pages }
  timestamp: ISO string
}
```

## 🔄 Communication Flow

```
┌─────────────────┐
│ Next.js Browser │
└────────┬────────┘
         │ fetch with @kanban/types
         │ using ApiClient
         │ (api-client.ts)
         │
         ▼
┌────────────────────────────────────────┐
│   Express API Server                   │
│ (localhost:3001)                       │
│                                        │
│ ├── Validates with @kanban/types      │
│ ├── Uses @kanban/utils for business   │
│ ├── Returns typed responses            │
│ └── Logs with request IDs              │
└────────────────────────────────────────┘
         │
         └──► In-memory storage
              (Ready for DB integration)
```

## 🚀 Development Commands

### Setup & Running
```bash
pnpm install                    # Install all dependencies
pnpm dev                        # Start web + api in parallel
pnpm dev:web                    # Frontend only (port 3000)
pnpm dev:api                    # Backend only (port 3001)
```

### Verification & Building
```bash
pnpm typecheck                  # Type check all packages
pnpm lint                       # Lint all code
pnpm build                      # Build for production
pnpm test                       # Run all tests
```

### Filtered Operations
```bash
pnpm --filter @kanban/api dev
pnpm --filter @kanban/web build
pnpm --filter @kanban/types typecheck
```

## 🐳 Docker Architecture

The monorepo includes a multi-stage Dockerfile with two runtime targets:

**Build Stage**:
- Installs dependencies
- Builds all packages and applications

**API Runtime**:
- Minimal Node image
- Production dependencies only
- Exposes port 3001

**Web Runtime**:
- Minimal Node image
- Optimized Next.js build
- Exposes port 3000

**Docker Compose** provides local development with:
- Auto-reload on file changes
- Volume mounts for source code
- Service linking
- Environment configuration

## 📁 File Organization Patterns

### Package Structure (consistent across all packages)
```
package/
├── src/              # Source code
│   ├── index.ts      # Main export
│   └── subfolder/    # Organized code
├── dist/             # Compiled output (gitignored)
├── package.json      # Package metadata & scripts
├── tsconfig.json     # TS configuration
└── README.md         # Package documentation
```

### App Structure (Frontend & Backend)
```
app/
├── src/              # Source code
│   ├── routes/       # API routes (backend)
│   ├── components/   # React components (frontend)
│   ├── lib/          # Utilities & helpers
│   ├── types/        # Local type overrides
│   └── index.ts      # Entry point
├── public/           # Static assets (frontend only)
├── dist/             # Compiled output (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 TypeScript Configuration Strategy

**Root `tsconfig.json`**: Base settings
- ES2020 target
- Strict mode enabled
- Module resolution: bundler
- Source maps enabled

**Each Package Extends Root** and specifies:
- `outDir`: ./dist
- `rootDir`: ./src
- Package-specific compiler options

**Benefits**:
- Single source of truth for typing rules
- Consistent across all packages
- Easy to update globally
- Type checking in CI/CD

## 🌐 Environment Management

Each app has `.env.example` template:

**API** (.env):
```
NODE_ENV=development
PORT=3001
HOST=localhost
```

**Frontend** (.env.local):
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Production deployments receive secrets via:
- Environment variables
- CI/CD secrets management
- Cloud provider secret managers

## 🔍 Code Quality

**ESLint Configuration**:
- Base ESLint recommended rules
- TypeScript plugin support
- Next.js specific rules for frontend

**Prettier Configuration**:
- 100 character line length
- Single quotes
- Trailing commas (ES5)
- 2-space indentation

**Pre-commit Recommendations** (not yet configured):
- Type checking
- Linting
- Tests (via husky + lint-staged)

## 📚 Documentation Structure

- **README.md** - Project overview and quick start
- **docs/API.md** - Detailed endpoint documentation
- **docs/DEVELOPMENT.md** - Developer setup and workflows
- **docs/DEPLOYMENT.md** - Production deployment strategies
- **docs/ARCHITECTURE.md** - This file

## 🎯 Design Principles

1. **Type Safety First** - All code is strictly typed
2. **Monorepo Benefits** - Shared code without duplication
3. **Separation of Concerns** - Clear layers (UI, API, types, utils)
4. **Developer Experience** - Fast builds, clear structure, good tooling
5. **Production Ready** - Includes Docker, CI/CD, documentation
6. **Scalable** - Easy to add new packages/apps and services

## 🔮 Future Enhancements

Recommended next steps:
1. Add database layer (PostgreSQL with ORM)
2. Implement authentication (JWT + sessions)
3. Add real-time features (WebSockets)
4. Setup comprehensive testing (Jest + React Testing Library)
5. Add monitoring and logging (Sentry, Datadog)
6. Implement caching (Redis)
7. Setup feature flags
8. Add rate limiting
9. Implement file uploads
10. Add email notifications

---

This architecture provides a solid foundation for scaling a professional full-stack application while maintaining code quality and developer experience.
