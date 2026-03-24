# Development Guide

This guide provides instructions for setting up and developing in the Kanban monorepo.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18.17.0 or higher
- pnpm 9.0.0 or higher
- Git
- Your preferred code editor (VS Code recommended)

## Initial Setup

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd kanban-monorepo
```

### 2. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 3. Install Dependencies

```bash
pnpm install
```

This will install dependencies for all packages and applications in the monorepo.

### 4. Copy Environment Files

```bash
cp apps/api/.env.example apps/api/.env.local
cp apps/web/.env.example apps/web/.env.local
```

### 5. Verify Setup

```bash
pnpm typecheck
```

## Project Structure

```
kanban-monorepo/
├── apps/
│   ├── api/         # Express backend
│   └── web/         # Next.js frontend
├── packages/
│   ├── types/       # Shared types
│   ├── utils/       # Shared utilities
│   └── config/      # Shared config
├── docs/            # Documentation
└── ...config files
```

## Development Workflow

### Running All Services

Start both frontend and backend in development mode:

```bash
pnpm dev
```

Both services will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001

### Running Individual Services

**Frontend only:**
```bash
pnpm dev:web
```

**Backend only:**
```bash
pnpm dev:api
```

### Building

Build all packages and applications:

```bash
pnpm build
```

Build a specific application:

```bash
pnpm --filter @kanban/api build
pnpm --filter @kanban/web build
```

### Type Checking

Check TypeScript types across all packages:

```bash
pnpm typecheck
```

### Linting

Run ESLint across all packages:

```bash
pnpm lint
```

### Testing

Run all tests:

```bash
pnpm test
```

## Code Standards

### TypeScript Conventions

1. **Strict Mode**: All code uses TypeScript strict mode
2. **Names**: Use PascalCase for types/interfaces, camelCase for variables/functions
3. **Exports**: Use named exports in utilities, default exports for app components

### File Organization

- `src/` - Source code
- `dist/` - Compiled output (gitignored)
- `tests/` - Test files

### Naming Conventions

- **Types**: `User`, `Task`, `Board`, `ApiResponse<T>`
- **Functions**: `fetchUsers()`, `formatDate()`
- **Variables**: `userName`, `isLoading`
- **Constants**: `MAX_ITEMS_PER_PAGE`, `API_BASE_URL`

### Imports

Always use absolute imports with workspace names:

```typescript
// ✅ Good
import { Task } from '@kanban/types';
import { formatDate } from '@kanban/utils';

// ❌ Avoid
import { Task } from '../../packages/types/src';
```

## Testing

### Writing Tests

Create test files alongside source files with `.test.ts` or `.test.tsx` suffix:

```
src/
  lib/
    api-client.ts
    api-client.test.ts
```

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test --watch

# Specific package
pnpm --filter @kanban/api test
```

## API Development

### Creating New Endpoints

1. Create route file in `apps/api/src/routes/`
2. Define types in `packages/types/src/`
3. Export in main `index.ts`

Example:

```typescript
// apps/api/src/routes/users.ts
import { Router, Request, Response } from 'express';
import { User, ApiResponse } from '@kanban/types';

const router = Router();

router.get('/', (req: Request, res: Response<ApiResponse<User[]>>) => {
  // Implementation
});

export default router;
```

### Testing API Endpoints

You can test endpoints using:

**cURL:**
```bash
curl http://localhost:3001/api/boards
```

**Postman:**
Import the collection from `docs/postman-collection.json`

**REST Client (VS Code):**
Use `.rest` files in `docs/rest-client/`

## Frontend Development

### Creating Components

1. Create component in `apps/web/src/components/`
2. Use TypeScript for all components
3. Export from `components/index.ts`

Example:

```typescript
// apps/web/src/components/BoardCard.tsx
import { Board } from '@kanban/types';

interface BoardCardProps {
  board: Board;
}

export async function BoardCard({ board }: BoardCardProps) {
  return <article>{board.name}</article>;
}
```

### Using Shared Types

Always import types from `@kanban/types`:

```typescript
import { Task, TaskStatus } from '@kanban/types';
```

### API Integration

Use the `ApiClient` from `@lib/api-client`:

```typescript
import { apiClient } from '@/lib/api-client';

const response = await apiClient.get<Board[]>('/boards');
```

## Debugging

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["--filter", "@kanban/api", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Console Output

Files use structured logging. APIs and important events log to console with request IDs.

## Common Tasks

### Add New Package

```bash
mkdir packages/my-package
cd packages/my-package

# Create package.json, tsconfig.json, src/index.ts

# Add to another package's dependencies:
pnpm add @kanban/my-package -w --filter @kanban/api
```

### Update Dependencies

```bash
# Update all
pnpm update

# Update specific package
pnpm update express -w --filter @kanban/api

# Interactive
pnpm update --interactive
```

### Clean Everything

```bash
pnpm clean
rm -rf node_modules
pnpm install
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

```bash
# Find process on port 3001
lsof -i :3001

# Kill process (macOS/Linux)
kill -9 <PID>

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Module Not Found

Ensure the module is properly exported and installed:

```bash
# Reinstall dependencies
pnpm install

# Check if package is in workspace
pnpm list @kanban/types -w
```

### Type Errors

Clear TypeScript cache and rebuild:

```bash
pnpm typecheck
pnpm build
```

### pnpm Lock Issues

Reset lock file and reinstall:

```bash
rm pnpm-lock.yaml
pnpm install
```

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(api): add user authentication endpoint
```

### Before Pushing

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Performance Tips

1. **Use workspace filtering** for faster operations:
   ```bash
   pnpm --filter @kanban/api build
   ```

2. **Leverage caching** in CI/CD

3. **Monitor build times**:
   ```bash
   pnpm build --profile
   ```

4. **Keep dependencies minimal** - only add what you need

## Resources

- [pnpm Documentation](https://pnpm.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)

## Getting Help

1. Check existing issues in the repository
2. Review documentation in `docs/`
3. Ask in team chat/discussion forums
4. Create a new issue with detailed error information

---

Happy coding! 🚀
