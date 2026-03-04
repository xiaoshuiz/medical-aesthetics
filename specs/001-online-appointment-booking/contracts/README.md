# gRPC Contracts: Online Appointment Application

**Branch**: `001-online-appointment-booking`

All client–server communication uses **gRPC**. The browser frontend uses **gRPC-Web** against the
same service definitions. This directory holds the canonical contract definitions.

## Contract format

- **`api.proto`**: Protocol Buffers definition of services and messages. One package;
  services are grouped by domain (auth, profile, booking, payment, membership) to align with
  spec modules (MOD-001, MOD-002).

## Usage

- Backend implements the gRPC services defined in `api.proto`.
- Frontend uses a gRPC-Web client and TypeScript types/code generated from `api.proto` (e.g.
  with `protoc` and a gRPC-Web plugin, or a codegen step in the build).
- Contract tests (see repository `tests/contract/`) validate that client and server conform to
  the same messages and service semantics.

## Service–module mapping

| Module   | gRPC service(s)     | Purpose |
|----------|----------------------|---------|
| Identity | Auth                 | Login, logout, register, session |
| Profile  | Profile              | Get/update user profile |
| Booking  | Procedure, Slot, Appointment | List procedures, list slots, create/list appointments |
| Payment  | Payment              | Create payment, list payments, top-up (if supported) |
| Membership | Membership, Balance | Member status, benefits, balance |

All calls that touch user-specific data must be authorized (SEC-002); the backend validates
the session/token and rejects unauthorized access.

## Versioning

- Changes to messages or RPCs are backward-compatible when possible (e.g. new optional fields).
- Breaking changes (e.g. removing or renaming fields) require a contract version bump and
  coordination with backend and frontend.
