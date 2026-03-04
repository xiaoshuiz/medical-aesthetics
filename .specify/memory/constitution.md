<!--
Sync Impact Report (2025-03-03):
- Version change: 1.0.0 → 1.1.0 (MINOR: Documentation Language section added)
- Modified principles: N/A
- Added sections: Documentation Language (all spec artifacts English only)
- Removed sections: None
- Templates: unchanged
- Follow-up TODOs: None
-->

# Medical Aesthetics Constitution

## Core Principles

### I. Code Quality

All deliverables MUST meet the following:

- Code MUST be readable and maintainable; naming and structure MUST follow project style
  guides (lint/format). New code MUST pass existing lint and format checks.
- Complexity MUST be justified; avoid unnecessary abstractions and indirection (YAGNI).
- Dead code, commented-out blocks, and unexplained workarounds MUST NOT be committed.
- Dependencies MUST be minimal and justified; avoid unused or redundant packages.

**Rationale**: Sustained velocity and safe changes depend on consistent, understandable code
and a low defect rate.

### II. Testing Standards

Testing discipline is mandatory:

- Test coverage and test types (unit, integration, contract) MUST be defined per feature
  in the implementation plan; critical paths and contracts MUST have automated tests.
- Tests MUST be deterministic (no flake from time, randomness, or external state) and
  fast enough to run in CI on every change.
- When test-first is required by the plan, tests MUST be written and MUST fail before
  implementation; Red–Green–Refactor MUST be followed for that scope.
- Test code MUST be maintained to the same quality bar as production code.

**Rationale**: Reliable regression detection and confident refactoring require a strict,
automated testing standard.

### III. User Experience Consistency

User-facing behavior and interface MUST be consistent and predictable:

- UI/UX MUST follow a single design system (components, tokens, patterns) across the
  application; deviations MUST be documented and justified.
- Interactions, terminology, and feedback (errors, success, loading) MUST be consistent
  across flows; copy and labels MUST align with the same vocabulary.
- Accessibility and responsiveness requirements MUST be defined per feature and MUST be
  verified (e.g. keyboard navigation, contrast, viewport behavior).

**Rationale**: Consistency reduces cognitive load, supports accessibility, and ensures a
coherent product experience for medical aesthetics booking and related flows.

### IV. Performance Requirements

Performance is a non-negotiable requirement:

- Each feature or subsystem MUST have explicit performance targets where relevant (e.g.
  response time p95, time-to-interactive, resource limits); these MUST be stated in the
  plan or spec.
- Performance regressions MUST be caught before release; CI or manual checks MUST
  include performance gates where targets are defined.
- Resource usage (memory, CPU, network) MUST be bounded and monitored in production
  paths; unbounded growth or leaks MUST be treated as defects.

**Rationale**: Medical aesthetics booking and related flows require responsive, scalable
behavior under load; unclear or unverified performance leads to production incidents.

## Quality Gates

- All PRs MUST pass automated lint, format, and test runs before merge.
- Constitution compliance MUST be verified in code review (principles I–IV and any
  feature-specific gates from the plan).
- New dependencies and architectural choices that affect complexity or performance MUST
  be justified in the plan or in the PR description.
- Performance-sensitive changes MUST be validated against stated targets or documented
  as non-regressive.

## Development Workflow

- Implementation MUST follow the approved plan and spec for the feature branch; scope
  changes MUST be reflected in the spec and, if needed, in the constitution.
- Code review MUST confirm alignment with Code Quality, Testing Standards, User
  Experience Consistency, and Performance Requirements before approval.
- Breaking changes to contracts or user-facing behavior MUST be documented with
  migration or communication steps.
- Quickstart and operational docs MUST be updated when setup or run procedures change.

## Documentation Language

- All recorded specification and design artifacts MUST be written in **English only**.
- This applies to: spec.md, plan.md, tasks.md, data-model.md, contracts (e.g. .proto,
  README), research.md, quickstart.md, checklists, and any other files under
  `specs/` or produced by speckit commands. User-facing copy in the application
  (e.g. UI strings) may use other languages when required by product; the
  specification and planning documents themselves remain English.

## Governance

- This constitution supersedes ad-hoc practices for the Medical Aesthetics project;
  conflicts MUST be resolved in favor of the constitution.
- Amendments REQUIRE: a documented proposal, impact on principles and templates, and
  version bump per semantic versioning (MAJOR: incompatible principle changes; MINOR:
  new principles or material expansion; PATCH: clarifications and typos).
- Compliance MUST be reviewed in every PR; violations MUST be justified in the
  Complexity Tracking table (in the plan) or fixed before merge.
- Runtime and development guidance (e.g. README, quickstart) MUST reference the
  constitution where relevant and MUST stay consistent with current principles.

**Version**: 1.1.0 | **Ratified**: 2025-03-03 | **Last Amended**: 2025-03-03
