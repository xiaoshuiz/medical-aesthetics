# Research: Online Appointment Application (001-online-appointment-booking)

**Branch**: `001-online-appointment-booking`  
**Date**: 2025-03-03

## Technology Choices (from user input)

| Decision | Rationale | Alternatives considered |
|----------|------------|---------------------------|
| **Rsbuild** | Fast, minimal build tool for React/TypeScript; aligns with “minimal number of libraries.” | Vite, Create React App, Next.js — user explicitly chose Rsbuild. |
| **React + hooks** | Standard UI model; hooks keep logic reusable and testable. | Class components — hooks are preferred for new code. |
| **TanStack Query** | Server state, caching, and request lifecycle for gRPC/HTTP; minimal boilerplate. | SWR, raw fetch — TanStack Query requested; fits gRPC-Web flows. |
| **pnpm** | User requirement; fast, disk-efficient. | npm, yarn — user specified pnpm. |
| **Tailwind CSS** | Utility-first, minimal CSS surface; supports one design system (constitution III). | CSS Modules, styled-components — user specified Tailwind. |
| **TypeScript** | Type safety and better editor support; “as much as possible” per user. | JavaScript — user specified TypeScript. |
| **gRPC calling format** | User requirement; interface defined in proto; gRPC-Web for browser. | REST, GraphQL — user specified gRPC. |

## gRPC in the browser

- **Decision**: Use **gRPC-Web** so the browser client can call gRPC backends over HTTP/1.1 or HTTP/2.
- **Rationale**: Native gRPC uses HTTP/2 and is not supported in browser APIs; gRPC-Web is the standard way to keep the same service contract (proto) and call it from the frontend.
- **Alternatives**: REST adapter on backend (adds a layer); GraphQL (different contract shape). Keeping gRPC end-to-end preserves a single contract (see `contracts/`).

## Module boundaries (spec MOD-001–MOD-004)

- **Decision**: Map spec domains to frontend modules: identity (auth), profile, booking, payment, membership (status, benefits, balance). Each module exposes a small surface (hooks + types); cross-module only via those surfaces or gRPC.
- **Rationale**: Maximizes decoupling; allows isolated testing and replacement (e.g. auth or payment adapter) without touching unrelated code.
- **Alternatives**: Monolithic services — rejected to satisfy spec modularity and constitution Code Quality.

## Testing strategy

- **Decision**: Vitest for unit and component tests; contract tests for gRPC (messages and service behavior); integration tests with mock gRPC or test server where needed.
- **Rationale**: Constitution II and spec MOD-004 require testable modules and contract coverage; Vitest is a common fit for Rsbuild/Vite-style projects.
- **Alternatives**: Jest — Vitest is lighter and aligns with modern ESM/Rsbuild.

## Security and performance (spec SEC-*, PERF-*)

- **Decision**: Session/token handling and auth checks on every gRPC call (via client interceptor or wrapper); no credentials in frontend storage except secure token; timeouts and retries for gRPC calls to meet PERF-004.
- **Rationale**: Spec requires SEC-001–SEC-006 and PERF-001–PERF-004; frontend is responsible for token attachment, validation feedback, and not blocking UI beyond defined timeouts.
- **Alternatives**: Cookie-only auth — token + optional httpOnly cookie is acceptable; exact scheme is an implementation detail as long as SEC-* are met.

## Open points for implementation

- **Proto location**: `specs/001-online-appointment-booking/contracts/` holds the canonical proto (or equivalent contract); codegen can output TypeScript types and client stubs into `src/types/` and `src/services/` (or a generated folder).
- **Backend**: Backend gRPC service is out of scope for this repo; plan and contracts assume a compatible gRPC server. Contract tests can run against a mock or a test server.
