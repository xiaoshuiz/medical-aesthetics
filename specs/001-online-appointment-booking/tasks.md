# Tasks: Online Appointment Application for Medical Aesthetic Clinics

**Input**: Design documents from `specs/001-online-appointment-booking/`  
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md, quickstart.md

**Context**: Initialize the frontend repository and validate the project runs as normal. Backend is not required for initial setup; use mock services where needed.

**Organization**: Tasks are grouped by user story. Phase 1 focuses on repo init and run validation; Phase 2 is foundational; Phases 3+ are user stories in priority order.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1–US5) for story phases only
- Include exact file paths in descriptions

## Path Conventions

- Single frontend app at repo root: `src/`, `tests/`, `public/` (per plan.md)

---

## Phase 1: Setup (Init FE Repo & Validate Run)

**Purpose**: Initialize the frontend repository with Rsbuild, pnpm, React, TypeScript, Tailwind, TanStack Query; create folder structure per plan; validate `pnpm dev` and `pnpm build` run as normal.

- [x] T001 Create directory structure per plan: `src/components/`, `src/pages/`, `src/hooks/`, `src/services/`, `src/types/`, `src/modules/`, `tests/unit/`, `tests/integration/`, `tests/contract/`, `public/`
- [x] T002 Create `package.json` with pnpm (name, type module, scripts: dev, build, preview) and engines for Node
- [x] T003 Add dependencies: rsbuild, @rsbuild/core, @rsbuild/plugin-react, react, react-dom, @tanstack/react-query, typescript, tailwindcss, and devDependencies per plan (minimal set)
- [x] T004 Create `rsbuild.config.ts` with React plugin and configure build output and source entry
- [x] T005 Create `tsconfig.json` with strict mode and paths aligned with `src/`
- [x] T006 [P] Add Tailwind: create `tailwind.config.js` and integrate with Rsbuild (e.g. PostCSS or Rsbuild Tailwind plugin) in `rsbuild.config.ts`
- [x] T007 Create entry point: `index.html` (or root HTML) and `src/main.tsx` that renders React root; add minimal `src/App.tsx` with a visible placeholder
- [x] T008 Run `pnpm install` and `pnpm build`; confirm build completes without errors
- [x] T009 Run `pnpm dev` and open app in browser; confirm dev server starts, app loads, and there are no console or page errors (validate project run as normal)
- [x] T010 [P] Add Vitest config in `vitest.config.ts` and `test` script in `package.json`; add one smoke test in `tests/unit/app.test.tsx` that renders App
- [x] T011 [P] Configure ESLint and Prettier (or equivalent) and add `lint` and `format` scripts to `package.json`; ensure new code can pass lint/format (Constitution I)

**Checkpoint**: Repo is initialized; `pnpm install`, `pnpm build`, `pnpm dev`, `pnpm test`, and lint/format run successfully.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story: routing, session/auth shape, API layer (mock-ready), base layout and design tokens.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T012 Add React Router (or minimal router) and define routes in `src/App.tsx` or `src/routes.tsx` (login, register, home, profile, booking, history, membership placeholders)
- [x] T013 Add at least one automated test for gRPC contract or critical path (e.g. login flow) in `tests/contract/` or `tests/integration/` (Constitution II)
- [x] T014 Create auth/session context and types: `src/services/auth.ts` (or `src/modules/identity/context.ts`) with token storage, getSession, setSession, clearSession; no backend call yet
- [x] T015 Create base layout component in `src/components/Layout.tsx` and global Tailwind base/tokens in `src/index.css` or design tokens file
- [x] T016 Create API client facade in `src/services/client.ts` that can be switched to mock or gRPC-Web later; export typed stubs for Auth, Profile, Catalog, Appointment, Payment, Membership
- [x] T017 Add `.env.example` with placeholder `VITE_GRPC_WEB_BASE_URL` (or equivalent) and document in `specs/001-online-appointment-booking/quickstart.md` if needed

**Checkpoint**: Foundation ready — routing, auth context, and API facade exist; user story implementation can begin.

---

## Phase 3: User Story 1 – Secure Login (Priority: P1) 🎯 MVP

**Goal**: User can register, log in, and log out; protected routes redirect to login when unauthenticated.

**Independent Test**: Register a user, log in, see logged-in state, log out, then log in again and confirm identity is preserved.

- [x] T018 [P] [US1] Add login page component in `src/pages/Login.tsx` with route path `/login`
- [x] T019 [P] [US1] Add register page component in `src/pages/Register.tsx` with route path `/register`
- [x] T020 [US1] Implement mock auth service in `src/services/mock/auth.ts` (register, login, logout, getSession) returning stub session token and user summary
- [x] T021 [US1] Implement login form (identifier, password), validation, and submit in `src/pages/Login.tsx`; on success call auth context and redirect to home; error message MUST NOT reveal whether identifier exists (FR-005)
- [x] T022 [US1] Implement register form (identifier, password, display name) in `src/pages/Register.tsx`; on success log in and redirect
- [x] T023 [US1] Add protected route wrapper in `src/components/ProtectedRoute.tsx` that redirects to `/login` when no session and restores intended URL after login
- [x] T024 [US1] Add logout action and clear session in layout or header; ensure logout invalidates context and redirects to login

**Checkpoint**: User Story 1 is independently testable (register → login → logout → login).

---

## Phase 4: User Story 2 – View and Edit My Profile (Priority: P2)

**Goal**: Logged-in user can view and edit profile (display name, contact, avatar); changes persist and show consistently.

**Independent Test**: Log in, open profile, edit fields and save; reopen profile and confirm data matches.

- [x] T025 [P] [US2] Add profile page in `src/pages/Profile.tsx` with route path `/profile`
- [x] T026 [US2] Implement mock profile service in `src/services/mock/profile.ts` (getProfile, updateProfile) aligned with contracts `ProfileService`
- [x] T027 [US2] Implement profile view: fetch and display display name, contact, avatar in `src/pages/Profile.tsx`
- [x] T028 [US2] Implement profile edit form with validation (required fields per FR-008) and save in `src/pages/Profile.tsx`; show success or validation errors
- [x] T029 [US2] Wire profile API facade to mock in `src/services/client.ts` (or profile module) so profile page uses mock data

**Checkpoint**: User Story 2 is independently testable (view and edit profile with mock).

---

## Phase 5: User Story 3 – Book an Appointment and Pay Online (Priority: P3)

**Goal**: User can select procedure, time slot, doctor, see summary, and complete payment (mock); confirmed appointment appears.

**Independent Test**: Log in, select procedure → date/time → doctor, review summary, complete payment; confirm appointment appears in list.

- [ ] T030 [P] [US3] Add booking flow pages: `src/pages/Booking.tsx` (procedure/slot/doctor steps) and `src/pages/BookingConfirm.tsx` (summary and payment)
- [ ] T031 [US3] Implement mock catalog service in `src/services/mock/catalog.ts` (listProcedures, listDoctors, getAvailableSlots) per `contracts/api.proto` CatalogService
- [ ] T032 [US3] Implement mock appointment and payment in `src/services/mock/appointment.ts` and `src/services/mock/payment.ts` (createAppointment with payment intent, listPayments)
- [ ] T033 [US3] Implement procedure and slot selection UI in `src/pages/Booking.tsx` using TanStack Query and mock catalog; show only available slots
- [ ] T034 [US3] Implement doctor selection and booking summary (procedure, date, time, doctor, price) in `src/pages/Booking.tsx` or `src/pages/BookingConfirm.tsx`
- [ ] T035 [US3] Implement payment step (mock: confirm button that calls createAppointment + payment); show success and confirmation number in `src/pages/BookingConfirm.tsx`
- [ ] T036 [US3] Wire booking and payment API facade to mocks in `src/services/client.ts` so booking flow runs end-to-end with mock

**Checkpoint**: User Story 3 is independently testable (full booking + payment with mock).

---

## Phase 6: User Story 4 – View Appointment and Payment History (Priority: P4)

**Goal**: User can view list of appointments (upcoming/past) and list of payments with date, amount, description.

**Independent Test**: Log in, open appointment history and payment history; create one appointment, then confirm it appears in both lists.

- [ ] T037 [P] [US4] Add history page in `src/pages/History.tsx` with route path `/history` and tabs or sections for appointments and payments
- [ ] T038 [US4] Implement list appointments in `src/pages/History.tsx` using mock appointment service (listAppointments); show procedure, date, time, doctor, status
- [ ] T039 [US4] Implement list payments in `src/pages/History.tsx` using mock payment service (listPayments); show date, amount, description; add pagination or “recent N” per spec
- [ ] T040 [US4] Add empty state for no appointments and no payments in `src/pages/History.tsx` with clear message (not error)

**Checkpoint**: User Story 4 is independently testable (history lists with mock).

---

## Phase 7: User Story 5 – Membership: Status, Benefits, and Balance (Priority: P5)

**Goal**: User can see membership tier, benefits, and balance; use balance and member price in booking where applicable (mock).

**Independent Test**: Log in, open membership section; see status and balance; book with member price or balance and confirm correct amount.

- [ ] T041 [P] [US5] Add membership/account page in `src/pages/Membership.tsx` with route path `/membership`
- [ ] T042 [US5] Implement mock membership service in `src/services/mock/membership.ts` (getMemberStatus, getBalance, topUpBalance) per contracts
- [ ] T043 [US5] Implement membership view: display tier name and benefits list in `src/pages/Membership.tsx`
- [ ] T044 [US5] Implement balance display and top-up entry (mock) in `src/pages/Membership.tsx`; after “top-up” show updated balance
- [ ] T045 [US5] Apply member price and balance option in booking flow: in `src/pages/BookingConfirm.tsx` show member price when applicable and allow “pay with balance” (mock deduction)

**Checkpoint**: User Story 5 is independently testable (membership and balance with mock).

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Consistency, validation, and documentation.

- [ ] T046 [P] Ensure consistent error and success feedback (toast or inline) across login, profile, booking, payment, history, membership per FR-020
- [ ] T047 [P] Add responsive and accessibility basics: keyboard navigation and viewport behavior for main flows per constitution III
- [ ] T048 Run full flow per `specs/001-online-appointment-booking/quickstart.md`: `pnpm install`, `pnpm build`, `pnpm dev`; confirm no console or page errors; document any env or steps in quickstart
- [ ] T049 Remove or replace any temporary placeholder copy with consistent terminology for medical aesthetics context

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately. Must complete before Phase 2.
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories.
- **Phases 3–7 (User Stories)**: All depend on Phase 2. Can be done in order P1→P2→P3→P4→P5 or parallel if staffed.
- **Phase 8 (Polish)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: After Phase 2 only; no other story required.
- **US2 (P2)**: After Phase 2; uses US1 auth (logged-in user).
- **US3 (P3)**: After Phase 2; uses US1 auth.
- **US4 (P4)**: After Phase 2; uses US1 auth; best validated after US3 (has appointments/payments).
- **US5 (P5)**: After Phase 2; uses US1 auth; integrates with US3 booking (member price/balance).

### Parallel Opportunities

- Phase 1: T006, T010, T011 can run in parallel with others after T005/T007.
- Phase 2: T013, T015, T016 can run in parallel after T012.
- Phase 3: T018, T019, T020 can run in parallel.
- Phase 4: T025, T026 in parallel.
- Phase 5: T030, T031, T032 in parallel; then T033, T034.
- Phase 6: T037 with T038/T039.
- Phase 7: T041, T042 in parallel.
- Phase 8: T046, T047 in parallel.

---

## Implementation Strategy

### MVP First (Init + Validate, then US1)

1. Complete Phase 1 (Setup) — **init FE repo and validate project run as normal**.
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (User Story 1 – Login).
4. **STOP and VALIDATE**: Register, login, logout, protected route work with mock.
5. Proceed to US2–US5 or deploy/demo.

### Incremental Delivery

1. Phase 1 + Phase 2 → foundation and “project runs as normal” confirmed.
2. Phase 3 (US1) → testable login/register flow.
3. Phase 4 (US2) → testable profile.
4. Phase 5 (US3) → testable booking + payment.
5. Phase 6 (US4) → testable history.
6. Phase 7 (US5) → testable membership/balance.
7. Phase 8 → polish and quickstart validation.

---

## Notes

- All backend calls use **mocks** until gRPC backend is ready; swap `src/services/mock/*` for real gRPC-Web client in `src/services/client.ts` when backend is available.
- [P] = parallelizable; [USn] = user story label for traceability.
- Each user story phase is independently testable with mock data.
- Commit after each task or logical group; stop at any checkpoint to validate.
