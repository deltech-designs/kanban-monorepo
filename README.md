# Kanban Monorepo

A professional full-stack TypeScript monorepo using pnpm workspaces, featuring a Next.js frontend and Express API backend.

## 📋 Tech Stack

- **Package Manager**: pnpm workspaces
- **Language**: TypeScript (strict mode)
- **Frontend**: Next.js 14+ with App Router
- **Backend**: Express.js with TypeScript
- **Node.js**: >=18.17.0

## 📁 Structure

```
kanban-monorepo/
├── apps/
│   ├── api/                    # Express API backend
│   │   ├── src/
│   │   │   ├── routes/        # API endpoints
│   │   │   ├── middleware/    # Express middleware
│   │   │   ├── services/      # Business logic
│   │   │   ├── controllers/   # Request handlers
│   │   │   └── index.ts       # Server entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/           # App router pages
│       │   ├── components/    # React components
│       │   ├── hooks/         # Custom React hooks
│       │   ├── lib/           # Utilities
│       │   └── types/         # Local types
│       ├── public/            # Static assets
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── types/                 # Shared TypeScript types
│   │   └── src/
│   │       ├── index.ts
│   │       ├── api/           # API types
│   │       └── domain/        # Domain types
│   ├── utils/                 # Shared utilities
│   │   └── src/
│   │       ├── index.ts
│   │       ├── validation/
│   │       ├── formatting/
│   │       └── helpers/
│   └── config/                # Shared configuration
│       └── src/
│           ├── index.ts
│           └── constants.ts
├── .gitignore
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # pnpm workspace definition
├── tsconfig.json            # Root TypeScript config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- pnpm 9.0.0 or higher

### Installation

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install
```

## 📝 Common Commands

### Development

```bash
# Start all applications in development mode
pnpm dev

# Start only the frontend
pnpm dev:web

# Start only the API
pnpm dev:api
```

### Building

```bash
# Build all packages and applications
pnpm build

# Build only frontend
pnpm build:web

# Build only API
pnpm build:api
```

### Quality Checks

```bash
# Run linting across all packages
pnpm lint

# Type checking across all packages
pnpm typecheck

# Run tests across all packages
pnpm test

# Format code
pnpm format
```

### Cleanup

```bash
# Clean all build artifacts and node_modules
pnpm clean
```

## 📦 Package Structure

### apps/api

Express server with TypeScript providing REST API endpoints. Uses shared types and utilities from the workspace.

Key features:

- Type-safe route handlers
- Middleware pipeline
- Error handling
- Request validation

### apps/web

Next.js 14 application with the new App Router. Consumes the API and uses shared types for type safety.

Key features:

- Server and client components
- Data fetching strategies
- Type-safe API calls
- Responsive UI components

### packages/types

Shared TypeScript type definitions used across the entire monorepo. Prevents duplication and ensures consistency.

### packages/utils

Shared utility functions and helpers for validation, formatting, and common operations.

### packages/config

Centralized configuration constants used across all applications.

## 🔗 Internal Dependencies

Applications and packages reference each other using workspace protocols:

```json
{
  "dependencies": {
    "@kanban/types": "workspace:*",
    "@kanban/utils": "workspace:*",
    "@kanban/config": "workspace:*"
  }
}
```

## 🛠️ Development Workflow

### Working on the API

```bash
cd apps/api
pnpm dev
```

### Working on the Frontend

```bash
cd apps/web
pnpm dev
```

### Adding a New Package

1. Create the package directory: `packages/my-package`
2. Add package.json with appropriate metadata
3. Add TypeScript configuration
4. Reference in other packages using `"@kanban/my-package": "workspace:*"`

## 📄 TypeScript Configuration Strategy

- **Root tsconfig.json**: Base configuration extended by all packages
- **Package tsconfigs**: Extend root with package-specific settings
- **Strict Mode**: Enabled globally for type safety
- **Path Aliases**: Configured per package as needed (packages/utils → @kanban/utils)

## 🔒 Type Safety

All packages are configured with:

- Strict TypeScript settings
- Module resolution: bundler
- Declaration and source maps enabled
- Type checking on commit (recommended: husky + lint-staged)

## 📦 Dependency Management

### Monorepo Best Practices

1. **Workspace Dependencies**: Use `workspace:*` for internal dependencies
2. **External Dependencies**: Add to specific packages, not root
3. **Dev Dependencies**: Keep with the package that uses them
4. **Common Deps**: Use pnpm overrides in root package.json

### pnpm Features Used

- Automatic dedupe of dependencies
- Strict peer dependency handling
- Workspace protocol for internal references
- Filtering for granular command execution (`--filter` flag)

## 🚀 Deployment

### Frontend Deployment

The `apps/web` directory can be deployed to Vercel, Netlify, or any Next.js-compatible platform.

### API Deployment

The `apps/api` directory can be deployed to:

- Node.js hosting (Heroku, Railway, etc.)
- Serverless (AWS Lambda, Azure Functions, etc.)
- Docker containers (build from root with Docker)

## 📚 Additional Resources

- [pnpm Workspaces Documentation](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)

## 💡 Best Practices

1. **Type-First Development**: Define types first in `@kanban/types`
2. **Code Reuse**: Extract shared logic into `@kanban/utils`
3. **Consistent Styling**: Use monorepo-wide ESLint and Prettier configs
4. **Cross-Package Testing**: Test integration between packages locally
5. **Performance**: Monitor build times and dependency footprint
6. **Documentation**: Keep package READMEs updated

## 📝 License

MIT
