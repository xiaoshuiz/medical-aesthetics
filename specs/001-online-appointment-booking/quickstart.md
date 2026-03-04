# Quickstart: Online Appointment Application

**Branch**: `001-online-appointment-booking`

## Prerequisites

- **Node.js**: LTS version (e.g. 20.x).
- **pnpm**: Install with `npm install -g pnpm` or see [pnpm.io](https://pnpm.io).
- **Backend**: A gRPC backend that implements the services in `specs/001-online-appointment-booking/contracts/api.proto`. Set its base URL (or proxy) in the environment (see below).

## Install

From the repository root:

```bash
pnpm install
```

## Environment

Create a `.env` or `.env.local` in the project root (or set in CI):

- **`VITE_GRPC_WEB_BASE_URL`** (or equivalent): Base URL for the gRPC-Web endpoint (e.g. `https://api.example.com` or `http://localhost:8080`). The exact variable name may depend on the Rsbuild/Vite config used for env.

Adjust variable names to match the actual build (Rsbuild typically uses `VITE_*` for client-side env).

## Build

```bash
pnpm build
```

Output is in the configured output directory (e.g. `dist/`).

## Development

```bash
pnpm dev
```

Starts the dev server. Ensure the gRPC backend (or a mock) is reachable at the URL configured above.

## Test

- **Unit / component**: `pnpm test` (Vitest).
- **Contract**: Run contract tests (e.g. against generated client and/or mock server) as defined in `tests/contract/`.
- **E2E**: If configured, e.g. `pnpm test:e2e` (Playwright or similar).

Commands may be defined in `package.json`; exact scripts depend on the implementation.

## Project layout (reference)

- **Spec and plan**: `specs/001-online-appointment-booking/` — spec.md, plan.md, data-model.md, contracts/, quickstart.md.
- **Source**: `src/` — components, pages, hooks, services (gRPC), types.
- **Tests**: `tests/unit/`, `tests/integration/`, `tests/contract/`.

## gRPC contract and codegen

- Contract: `specs/001-online-appointment-booking/contracts/api.proto`.
- Generate TypeScript types and gRPC-Web client (e.g. with `protoc` and grpc-web plugin or buf) and output into `src/types/` and `src/services/` (or a `src/generated/` folder). Add a `pnpm run codegen` (or similar) if needed.
- Backend must implement the same proto; contract tests verify compatibility.

## Next steps

- Implement tasks from `specs/001-online-appointment-booking/tasks.md` (created by `/speckit.tasks`).
- Run Constitution Check and quality gates before merge (see `.specify/memory/constitution.md` and plan.md).
