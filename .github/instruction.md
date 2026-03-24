# Hiram Board — AI Coding Instructions

This document defines the rules and conventions the AI must follow when contributing to the **Hiram Board** codebase. Read this fully before writing any code.

---

## 1. Project Overview

**Hiram Board** is a full-stack Kanban application built as a **pnpm monorepo** with the following structure:

```
apps/
  api/        → Express + TypeScript backend (port 3001)
  web/        → Next.js 14 + TypeScript + Tailwind CSS frontend (port 3000)
packages/
  config/     → Shared app configuration constants
  types/      → Shared TypeScript domain & API types
  utils/      → Shared utility functions (formatting, validation)
```

**Tech Stack:**

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS v4
- **Backend:** Express, TypeScript, UUID
- **Shared:** `@kanban/types`, `@kanban/config`, `@kanban/utils` workspace packages
- **Tooling:** pnpm workspaces, ESLint, Prettier, Docker

Always import shared types from `@kanban/types`, config from `@kanban/config`, and utilities from `@kanban/utils`. Never duplicate what already exists in these packages.

---

## 2. General Coding Principles

### DRY — Don't Repeat Yourself

- Never duplicate logic, types, or markup. Extract repeated code into shared functions, hooks, or components.
- If the same logic appears more than once, it belongs in a utility function (`packages/utils`) or a custom hook (`apps/web/src/hooks/`).
- Reuse shared types from `@kanban/types` instead of redeclaring them locally.

### KISS — Keep It Simple, Stupid

- Write the simplest solution that correctly solves the problem.
- Avoid over-engineering: no unnecessary abstractions, patterns, or layers.
- Prefer readable code over clever code. A junior developer should be able to follow the logic without comments.

### YAGNI — You Aren't Gonna Need It

- Do not add functionality, props, or configuration "just in case."
- Only build what is explicitly required by the current task.

### Single Responsibility

- Every function, component, hook, and module must do one thing and do it well.
- If a function or component is doing too many things, break it up.

### Separation of Concerns

- Keep data fetching logic out of UI components — use custom hooks or the `apiClient`.
- Keep business logic out of route handlers — extract into service functions when the logic grows.
- Keep styling out of logic files.

---

## 3. TypeScript Standards

- **Strict typing always.** Never use `any` unless absolutely unavoidable, and add a comment explaining why.
- Define all data shapes using the types in `packages/types/src/`. If a new type is needed project-wide, add it there.
- Use `interface` for object shapes and `type` for unions, intersections, and aliases.
- Always type function parameters and return values explicitly.
- Use TypeScript path aliases (`@/*`, `@components/*`, `@hooks/*`, `@lib/*`) when importing within `apps/web`.

---

## 4. Frontend — Component Architecture (Atomic Design)

Follow **Atomic Design** principles when building or modifying UI. This is about _thinking_, not about creating new folders — respect the existing file and folder structure.

### The Hierarchy

| Level         | Description                                                                        | Location (existing)                                 |
| ------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Atoms**     | Smallest UI units — buttons, inputs, badges, icons, labels                         | `apps/web/src/components/ui/`                       |
| **Molecules** | Groups of atoms forming a functional unit — form fields, card headers, search bars | `apps/web/src/components/ui/` or a logical grouping |
| **Organisms** | Complex UI sections — board columns, task cards, navigation bars, modals           | `apps/web/src/components/`                          |
| **Templates** | Page layouts and structural shells                                                 | `apps/web/src/app/` layout files                    |
| **Pages**     | Full pages wired with real data                                                    | `apps/web/src/app/**/page.tsx`                      |

> **Do not create new folder layers** for atoms/molecules/organisms. Place components inside the existing `components/ui/` or `components/` directories, following the conventions already established.

### Component Check — Mandatory Step Before Building UI

**Before creating any new component, always check if it already exists:**

1. Look in `apps/web/src/components/ui/` for atoms and molecules.
2. Look in `apps/web/src/components/` for organisms and feature components.
3. Check `apps/web/src/app/` for any layout or page patterns already established.

**If the component exists → use it. Do not create a duplicate.**
**If it does not exist → create it following the rules below.**

Currently existing components:

- `components/ui/Input.tsx` — a fully-featured input with label, hint, and password toggle.

---

## 5. Frontend — Component Rules

### Creating New Components

- One component per file. The filename must match the component name (PascalCase). Example: `TaskCard.tsx`.
- Use `forwardRef` for all form/input elements to support ref forwarding (see existing `Input.tsx`).
- Always add `displayName` when using `forwardRef`.
- Export named exports for components (not default) in `components/ui/`. Use default exports only for Next.js pages.
- Define a `Props` interface (or type) above the component in the same file.

### Styling

- **Design Consistency**: The design should follow the same pattern across the application. Ensure consistency in UI elements, spacing, typography, and color schemes to maintain a cohesive user experience. Avoid one-off unique styles.
- Use **Tailwind CSS utility classes** exclusively. Do not write custom CSS files except for global resets in `globals.css`.
- Do not use inline `style={{}}` props unless absolutely necessary (e.g., dynamic values not achievable with Tailwind).
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) for responsive layouts.
- Compose class strings cleanly. If conditional classes grow complex, extract the logic into a local `cn()` helper or variable.

### Props

- Always provide sensible default values for optional props.
- Extend existing HTML element attributes where relevant (e.g., `InputHTMLAttributes<HTMLInputElement>`) so native attributes are not lost.
- Avoid prop drilling more than two levels deep — use context or a shared hook instead.

### State Management

- Use `useState` and `useReducer` for local component state.
- Extract reusable stateful logic into custom hooks inside `apps/web/src/hooks/`.
- Keep hooks focused — one concern per hook (e.g., `useBoards`, `useTasks`, `useForm`).

---

## 6. Frontend — Data Fetching

- Always use the existing `apiClient` from `apps/web/src/lib/api-client.ts` for HTTP requests. Do not use raw `fetch` in components.
- Wrap all data fetching in custom hooks, not inside page components directly.
- Always handle three states: **loading**, **error**, and **success**.
- Use the `ApiResponse<T>` and `PaginatedResponse<T>` types from `@kanban/types` to type all API responses.

---

## 7. Backend — API Rules

- All routes must return responses conforming to `ApiResponse<T>` or `PaginatedResponse<T>` from `@kanban/types`.
- Always include the `timestamp` field in every response using `new Date().toISOString()`.
- Validate required fields at the top of route handlers and return a `400` with a descriptive error before any logic runs.
- Use `uuid` (`uuidv4`) for all ID generation.
- Route files stay lean — if business logic grows beyond simple CRUD, extract it into a `services/` layer under `apps/api/src/`.
- Never expose internal error details in production. Use `isDevelopment()` from `@kanban/utils` to gate verbose errors.

---

## 8. File & Folder Conventions

- **PascalCase** for component files: `TaskCard.tsx`, `BoardColumn.tsx`
- **camelCase** for hooks, utilities, and non-component files: `useBoards.ts`, `api-client.ts`
- **kebab-case** for Next.js route folders: `apps/web/src/app/sign-up/page.tsx`
- Group related route logic in `apps/api/src/routes/` — one file per resource.
- Place shared cross-app utilities in `packages/utils/`, not in `apps/`.

---

## 9. Code Quality & Formatting

- All code must pass the ESLint config defined in `.eslintrc.json` before being considered complete.
- Follow the Prettier config in `.prettierrc`: single quotes, 2-space indent, 100-char print width, trailing commas (ES5).
- No `console.log` in production code paths — use `console.warn` or `console.error` where necessary.
- No commented-out code blocks left in files.
- Write self-documenting code. Only add comments to explain _why_, not _what_.

---

## 10. Shared Packages — When to Use

| Need                                               | Use                                         |
| -------------------------------------------------- | ------------------------------------------- |
| Domain types (`Board`, `Task`, `TaskStatus`)       | `@kanban/types` → `src/domain/index.ts`     |
| API request/response types                         | `@kanban/types` → `src/api/index.ts`        |
| App-wide constants (`API_BASE_URL`, `APP_NAME`)    | `@kanban/config`                            |
| Environment helpers (`isDevelopment`, `getEnvVar`) | `@kanban/utils` → `src/validation/index.ts` |
| Formatting helpers                                 | `@kanban/utils` → `src/formatting/index.ts` |

If new shared logic is needed, add it to the appropriate package rather than duplicating it inside an app.

---

## 11. Git & PR Conventions

- Branch naming: `feature/`, `fix/`, `chore/` prefixes. Example: `feature/task-drag-drop`.
- Commit messages must be descriptive and in the imperative mood: `Add TaskCard component`, `Fix board fetch error handling`.
- Do not commit `.env` files. Use `.env.example` as the template.
- CI runs on `main` and `develop` branches — ensure `typecheck`, `lint`, and `build` all pass before pushing.

---

## 12. Definition of Done

A task is complete only when:

- [ ] Existing components were checked and reused where applicable
- [ ] No logic or markup is duplicated
- [ ] TypeScript types are strict — no `any`
- [ ] ESLint passes with no errors
- [ ] Prettier formatting is applied
- [ ] All three data states (loading/error/success) are handled in UI
- [ ] New components follow the atomic design hierarchy
- [ ] Shared packages are used instead of local duplicates
