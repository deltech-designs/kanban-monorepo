---
name: hiram-board-agent
description: >
  Agent instructions for the Hiram Board Kanban monorepo (Next.js 14 + Express/TypeScript +
  pnpm Workspaces). Use this skill whenever working on any part of this project — frontend
  components, pages, backend route handlers, shared types, utilities, or config. Activates
  on any task involving this codebase including adding a new feature, building a UI component,
  writing an API route, extending shared types, or configuring a workspace package.
---

# Hiram Board — Agent Skill

This skill governs all AI coding work on the **Hiram Board** Kanban application.
Monorepo with five workspaces: `apps/web` (Next.js 14), `apps/api` (Express/TypeScript),
`packages/types` (domain + API types), `packages/config` (shared constants),
`packages/utils` (shared utilities).

---

## Quick Reference — Stack

| Layer        | Technology                                          |
|--------------|-----------------------------------------------------|
| Frontend     | Next.js 14, App Router, Tailwind CSS v4             |
| Backend      | Express.js, TypeScript, Screaming Architecture, UUID|
| Shared Types | `@kanban/types` (domain + API)                      |
| Shared Utils | `@kanban/utils` (formatting, validation)            |
| Shared Config| `@kanban/config` (constants, env helpers)           |
| Monorepo     | **pnpm Workspaces**                                 |

---

## Step 0 — Package Manager

**Always use pnpm. Never npm or yarn.**

```bash
pnpm --filter @kanban/web add <package>     # frontend dep
pnpm --filter @kanban/api add <package>     # backend dep
pnpm --filter @kanban/types add <package>   # types dep
pnpm add -D <package> -w                    # root dev dep
pnpm install                                # install all
```

---

## Step 1 — Before Writing Any Code

Answer these three questions first:

1. **Which workspace?** (`apps/web`, `apps/api`, `packages/types`, `packages/config`, or `packages/utils`)
2. **Does the type already exist in `packages/types`?** If yes, import it. If no, create it there first.
3. **Does the utility/constant already exist in `packages/utils` or `packages/config`?** Check before creating locally.

---

## Step 2 — Frontend Tasks (apps/web)

The frontend follows **Atomic Design** principles mapped to the existing folder structure.
Do not create new folder layers — place components into the structure already established.

### Atomic Design Hierarchy

| Level         | Description                                            | Location                                              |
|---------------|--------------------------------------------------------|-------------------------------------------------------|
| **Atoms**     | Buttons, inputs, badges, icons, labels                 | `components/app/partials/`                            |
| **Molecules** | Form fields, card headers, icon+label combos           | `components/app/partials/` or logical grouping        |
| **Organisms** | Board columns, task cards, modals, nav bars            | `components/app/features/<domain>/`                   |
| **Templates** | Page shell layouts                                     | `app/**/layout.tsx`                                   |
| **Pages**     | Full pages wired with real data                        | `app/**/page.tsx`                                     |

### Component Folder Structure

```
components/app/
├── features/             ← Organisms grouped by domain
│   ├── auth/
│   │   ├── signin/
│   │   │   ├── SignInForm.tsx
│   │   │   └── SignInIllustrationPanel.tsx
│   │   └── signup/
│   ├── dashboard/
│   │   ├── board/        ← BoardCard, BoardColumn, BoardHeader, BoardView
│   │   ├── task/         ← TaskCard, TaskDetailsSidebar, TaskModal
│   │   ├── workspace/    ← WorkspaceCard, WorkspaceTools
│   │   ├── ActivityFeed.tsx
│   │   ├── SortableTaskItem.tsx
│   │   └── TeamWidget.tsx
├── layout/               ← App shell: Header, Sidebar, TopNav
├── partials/             ← Atoms & Molecules: Avatar, AvatarGroup, AvatarSelect,
│                             Button, Checkbox, DatePicker, DescriptionText, Input,
│                             Logo, Modal, ModalInput, ModalTextarea, PrioritySelect,
│                             Select, SlideOver, StatusSelect, Textarea, TitleText
└── ui/                   ← Feedback & display: Alert, AuthDivider, OtpInput,
                              SidebarIcons, SocialLoginButtons
```

**Rule:** Check `partials/`, `ui/`, and `layout/` before creating any new component.
If it already exists → use it. Never duplicate.

### Page Rule

Pages are always thin — they delegate to feature components:

```tsx
// app/dashboard/boards/[id]/page.tsx
import { BoardView } from '@/components/app/features/dashboard/board/BoardView';
export default function BoardPage() { return <BoardView />; }
```

### Data Fetching Rule

Never call `apiClient` directly inside a page or component.
Wrap all data fetching in a custom hook inside `apps/web/src/hooks/`:

```tsx
// hooks/useBoards.ts
import { apiClient } from '@/lib/api-client';
import { Board } from '@kanban/types';

export function useBoards() {
  // fetch via apiClient, manage loading/error/data states
}
```

```tsx
// Inside a component — always through a hook
const { boards, isLoading, error } = useBoards();
```

### UI States — Always Handle All Three

```tsx
if (isLoading) return <Skeleton />;
if (error) return <Alert variant="error" message={error} />;
if (data.length === 0) return <EmptyState title="No boards yet" />;
return <ActualUI data={data} />;
```

### Styling Rules

- Tailwind CSS utility classes exclusively — no custom CSS files except global resets in `globals.css`.
- No inline `style={{}}` unless the value is genuinely dynamic and impossible with Tailwind.
- Use responsive prefixes (`sm:`, `md:`, `lg:`) for all responsive layouts.
- Use `cn()` or a local variable to compose conditional class strings.

### Component Rules

- One component per file. Filename matches component name (PascalCase): `TaskCard.tsx`.
- Use `forwardRef` for all form/input elements.
- Always add `displayName` when using `forwardRef`.
- Named exports in `partials/` and `ui/`. Default exports only for Next.js pages.
- Define a `Props` interface or type above the component in the same file.
- Never prop-drill more than two levels — use context or a shared hook.

### TypeScript Path Aliases (apps/web)

```ts
import { Button } from '@/components/app/partials/Button';
import { apiClient } from '@/lib/api-client';
import { useBoards } from '@/hooks/useBoards';
```

---

## Step 3 — Backend Tasks (apps/api)

The backend follows **Screaming Architecture** — the folder structure screams the domain,
not the framework. Each feature is a self-contained module with its own controller,
service, repository, model, routes, and DTOs.

### Screaming Architecture — Feature Checklist

Every new feature needs these files:

```
apps/api/src/<feature>/
├── <feature>.controller.ts    ← HTTP orchestration only — req in, calls service, res out
├── <feature>.service.ts       ← All business logic — no req/res
├── <feature>.repository.ts    ← All DB queries — no business logic
├── <feature>.model.ts         ← Typegoose schema with @prop decorators
├── <feature>.routes.ts        ← Route definitions + middleware chain
└── dtos/
    ├── create-<feature>.dto.ts
    └── update-<feature>.dto.ts
```

Then register in `app.ts` / `index.ts`:
```ts
app.use('/api/<feature>', featureRoutes);
```

### Layer Rules (Hard)

- **Controller** → `req` in, calls service, `res.json()` out. Zero business logic.
- **Service** → Business logic only. Calls repository. Never touches `req` or `res`.
- **Repository** → DB queries only. No business logic.
- **Model** → Typegoose class with `@prop` decorators. Always `Severity.ERROR`.

### Controller Pattern

```ts
// boards.controller.ts
import { Request, Response } from 'express';
import { BoardsService } from './boards.service';

export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const boards = await this.boardsService.findAll();
    res.json({ success: true, data: boards, timestamp: new Date().toISOString() });
  }

  async create(req: Request, res: Response): Promise<void> {
    const board = await this.boardsService.create(req.body);
    res.status(201).json({ success: true, data: board, timestamp: new Date().toISOString() });
  }
}
```

### Service Pattern

```ts
// boards.service.ts
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dtos/create-board.dto';

export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async findAll() {
    return this.boardsRepository.findAll();
  }

  async create(dto: CreateBoardDto) {
    // business logic lives here (validation, transforms, rules)
    return this.boardsRepository.create(dto);
  }
}
```

### Repository Pattern

```ts
// boards.repository.ts
import { BoardModel } from './boards.model';
import { CreateBoardDto } from './dtos/create-board.dto';

export class BoardsRepository {
  async findAll() {
    return BoardModel.find().lean();
  }

  async create(dto: CreateBoardDto) {
    return BoardModel.create(dto);
  }

  async findById(id: string) {
    return BoardModel.findById(id).lean();
  }
}
```

### DTO Pattern (class-validator)

```ts
// dtos/create-board.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  workspaceId!: string;
}
```

### Routes Pattern

```ts
// boards.routes.ts
import { Router } from 'express';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { validateDto } from '../middleware/validateDto';
import { authenticate } from '../middleware/authenticate';
import { CreateBoardDto } from './dtos/create-board.dto';

const router = Router();
const controller = new BoardsController(new BoardsService(new BoardsRepository()));

router.get('/', authenticate, controller.getAll.bind(controller));
router.post('/', authenticate, validateDto(CreateBoardDto), controller.create.bind(controller));

export default router;
```

### Response Rules

- Every response must include `success: boolean` and `timestamp: new Date().toISOString()`.
- Use `ApiResponse<T>` from `@kanban/types` for single-item responses, `PaginatedResponse<T>` for lists.
- All IDs generated with `uuidv4()` — never auto-increment or random math.
- Never expose internal error details in production; gate verbose errors with `isDevelopment()` from `@kanban/utils`.

---

## Step 4 — Shared Types (packages/types)

```
packages/types/src/
├── domain/index.ts    ← Domain entities: Task, Board, User, Workspace + Input types
├── api/index.ts       ← ApiResponse, PaginatedResponse, ErrorResponse, SuccessResponse
└── index.ts           ← Barrel export
```

### Existing Domain Types

```ts
// domain/index.ts
export enum TaskStatus { TODO, IN_PROGRESS, DONE }

export interface Task { id, title, description, status, boardId, createdAt, updatedAt }
export interface Board { id, name, description, workspaceId, userId, createdAt, updatedAt }
export interface User { id, email, name, avatar?, createdAt, updatedAt }
export interface Workspace { id, name, description?, ownerId, members: string[], createdAt, updatedAt }

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;
// Same pattern for Board, Workspace
```

### Existing API Types

```ts
// api/index.ts
export interface ApiResponse<T> { success: boolean; data: T; timestamp: string; error?: string; }
export interface PaginatedResponse<T> extends ApiResponse<T[]> { pagination: { page, limit, total, pages } }
```

### Adding a New Type

1. Add the interface/type to `packages/types/src/domain/index.ts` (entities) or `api/index.ts` (API shapes).
2. It is auto-exported via the barrel `packages/types/src/index.ts`.
3. Import anywhere with `import type { MyType } from '@kanban/types'`.

---

## Step 5 — Shared Packages Reference

| Need                                               | Use                                            |
|----------------------------------------------------|------------------------------------------------|
| Domain entities (`Board`, `Task`, `TaskStatus`)    | `@kanban/types` → `src/domain/index.ts`        |
| API request/response types                         | `@kanban/types` → `src/api/index.ts`           |
| App-wide constants (`API_BASE_URL`, `APP_NAME`)    | `@kanban/config`                               |
| Environment helpers (`isDevelopment`, `getEnvVar`) | `@kanban/utils` → `src/validation/index.ts`    |
| Formatting helpers (`formatRelativeDate`, etc.)    | `@kanban/utils` → `src/formatting/index.ts`    |

If new shared logic is needed, add it to the appropriate package — never duplicate inside an app.

---

## Hard Rules (Never Break)

- ❌ No `any` in TypeScript — anywhere. Add a comment explaining why if unavoidable.
- ❌ No `npm` or `yarn` — pnpm only.
- ❌ No raw `fetch` or `axios` in components — always use `apiClient` from `@/lib/api-client`.
- ❌ No data fetching inside page or UI components — use custom hooks in `hooks/`.
- ❌ Duplicate types forbidden — check `packages/types` first.
- ❌ Duplicate utilities forbidden — check `packages/utils` and `packages/config` first.
- ❌ No inline `style={{}}` — Tailwind only (except dynamic values impossible with Tailwind).
- ❌ No skipping UI states — always handle loading, error, empty.
- ❌ No creating new folder layers — respect the existing atomic structure.
- ❌ No `console.log` in production paths — use `console.warn` or `console.error`.
- ❌ No commented-out code blocks left in files.
- ❌ Never expose verbose internal errors in production.
- ❌ Every response must include `timestamp: new Date().toISOString()`.
- ❌ No `localStorage` for auth tokens (when auth is added) — use httpOnly cookies.
- ❌ Business logic only in services — never in controllers or repositories.
- ❌ DB queries only in repositories — never in services or controllers.
- ❌ Every route must use `authenticate` middleware.
- ❌ Every mutation route (POST, PUT, PATCH) must use `validateDto()` with a DTO class.

---

## File Naming Conventions

| Type                        | Convention   | Example                          |
|-----------------------------|--------------|----------------------------------|
| React components            | PascalCase   | `TaskCard.tsx`, `BoardColumn.tsx`|
| Hooks                       | camelCase    | `useBoards.ts`, `useTasks.ts`    |
| Utilities / API client      | kebab-case   | `api-client.ts`, `format-date.ts`|
| Next.js route folders       | kebab-case   | `app/sign-up/page.tsx`           |
| Backend route files         | camelCase    | `boards.ts`, `tasks.ts`          |

---

## Definition of Done

A task is complete only when:

- [ ] Existing components, hooks, types, and utilities were checked and reused where applicable
- [ ] No logic, types, or markup is duplicated across the codebase
- [ ] TypeScript is strict — no `any`
- [ ] ESLint passes with no errors (config: `.eslintrc.json`)
- [ ] Prettier formatting applied (single quotes, 2-space indent, 100-char width, trailing commas ES5)
- [ ] All three data states (loading / error / success) handled in every UI data-fetching context
- [ ] New components placed in the correct atomic layer folder
- [ ] Shared packages used instead of local duplicates
- [ ] Every API response includes `timestamp`
- [ ] New backend features have all five files: controller, service, repository, model, routes
- [ ] DTOs written with class-validator decorators for all mutation routes
- [ ] Controller has zero business logic — only calls service and returns response
- [ ] Service has zero DB queries — delegates all persistence to repository