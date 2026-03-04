# Implementation Plan: Online Appointment Application for Medical Aesthetic Clinics

**Branch**: `001-online-appointment-booking` | **Date**: 2025-03-03 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/001-online-appointment-booking/spec.md`

## Summary

Build a web application for medical aesthetic clinics: users register and log in, view and edit
profile, book appointments (procedure, time, doctor), pay online, view appointment and payment
history, and use membership (status, benefits, balance). The frontend is built with **Rsbuild**
using a **minimal set of libraries**: **React** (hooks), **TanStack Query**, **Tailwind CSS**, and
**TypeScript**. All backend communication uses the **gRPC** calling format (gRPC-Web from the
browser). The implementation keeps **modules decoupled** (identity, profile, booking, payment,
membership, balance) and aligns with the spec’s security, performance, and modularity requirements.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: Rsbuild, React 18+, TanStack Query, Tailwind CSS; gRPC-Web client for
API calls. Minimal additional libraries (e.g. no full UI kit unless justified).  
**Storage**: N/A at frontend; all persistent data lives behind the gRPC backend.  
**Testing**: Vitest for unit and component tests; contract tests for gRPC services (see
`specs/001-online-appointment-booking/contracts/`); integration/E2E as defined in task phase
(Playwright or similar if needed).  
**Target Platform**: Modern browsers (ESM); development and production build via Rsbuild.  
**Project Type**: Web application (frontend-only in this repo; backend is a gRPC service).  
**Performance Goals**: Per spec SC-006/SC-007 and PERF-001–PERF-004: user-visible feedback within
3s for critical actions; support ~100 concurrent users; p95 latency and load targets to be
validated in implementation.  
**Constraints**: Minimal library set; all server communication via gRPC; pnpm as package manager;
Tailwind for styling; React hooks and TanStack Query for state and server data.  
**Scale/Scope**: Single clinic; procedures, doctors, slots, and membership config provided by
backend; frontend scope is one SPA with login, profile, booking, payment, history, membership
flows.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify alignment with `.specify/memory/constitution.md`:

- **Code Quality (I)**: Structure uses a small, justified dependency set (Rsbuild, React, TanStack
  Query, Tailwind, TypeScript, gRPC client). Modules (identity, profile, booking, payment,
  membership, balance) have clear boundaries and minimal coupling per spec MOD-001–MOD-004.
- **Testing Standards (II)**: Unit tests (Vitest) for components and hooks; contract tests for
  gRPC services from `contracts/`; integration/E2E for critical user flows. Test strategy and
  coverage expectations are stated in this plan and in Phase 2 tasks.
- **User Experience Consistency (III)**: Single design system via Tailwind (tokens, components);
  consistent terminology and feedback (errors, success, loading) across flows per spec FR-020 and
  constitution III.
- **Performance Requirements (IV)**: Goals and constraints from spec (PERF-001–PERF-004, SC-006,
  SC-007) are reflected above; implementation will define p95/timeouts and load targets and
  validate in CI or manual gates.

## Project Structure

### Documentation (this feature)

```text
specs/001-online-appointment-booking/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (gRPC .proto and/or contract docs)
└── tasks.md             # Phase 2 output (/speckit.tasks – not created by this command)
```

### Source Code (repository root)

```text
src/
├── components/          # Shared UI components (design system)
├── pages/               # Route-level pages (login, profile, booking, history, membership)
├── hooks/               # React hooks (including TanStack Query wrappers)
├── services/            # gRPC client usage and module-facing API wrappers
├── types/               # Shared TypeScript types (aligned with gRPC/proto)
└── modules/             # Optional: identity, profile, booking, payment, membership (per MOD-001)

tests/
├── unit/                # Unit and component tests (Vitest)
├── integration/         # Integration tests (e.g. flows with mock gRPC)
└── contract/            # gRPC contract tests (services, messages)

public/                  # Static assets (Rsbuild)
```

**Structure decision**: Single frontend application at repository root. Rsbuild builds `src/`;
backend is a separate gRPC service. Modules (identity, profile, booking, payment, membership,
balance) are reflected in `src/modules/` or in `src/services/` + `src/pages/` with clear
boundaries; cross-module interaction is only via gRPC or well-defined in-app interfaces (MOD-002,
MOD-003). Contracts live under `specs/001-online-appointment-booking/contracts/` for
versioning and shared use with backend.

## Complexity Tracking

> No constitution violations. Table left empty; add rows only if a deviation is justified later.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                   |
