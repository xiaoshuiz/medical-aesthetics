# Data Model: Online Appointment Application

**Branch**: `001-online-appointment-booking`  
**Date**: 2025-03-03  
**Source**: Entities and requirements from [spec.md](./spec.md)

This document describes the logical data model used by the application. Persistence and storage
are implemented by the gRPC backend; the frontend consumes these entities via gRPC responses and
types generated from `contracts/`.

---

## Entities and Attributes

### User

The person using the application.

| Attribute / concept | Description |
|---------------------|-------------|
| Identifier | Unique (e.g. mobile or email); used for login. |
| Credential | Not stored in plain text; only one-way derived/hashed value persisted (SEC-001). |
| Linkage | To Profile, Appointments, Payments, Member status, User balance. |

*Frontend*: Identified by session/token after login; no direct storage of password.

---

### Profile

Basic information for the logged-in user, editable in the app.

| Attribute | Description |
|-----------|-------------|
| Display name | User’s name shown in the app. |
| Contact | Contact method (e.g. phone or email); must stay consistent with identity where used for login. |
| Avatar | Optional profile image. |

**Relationship**: One-to-one with User.

**Validation** (FR-008): Required fields and format enforced on save; invalid or missing required
data must not be persisted.

---

### Procedure

A bookable medical aesthetic service offered by the clinic.

| Attribute | Description |
|-----------|-------------|
| Name | Procedure name. |
| Description | Optional description. |
| Base price | Standard price; may be overridden by member benefits. |

**Usage**: Listed in booking flow; referenced by member benefits (e.g. which procedures get a
discount).

---

### Doctor

A provider who can be assigned to an appointment.

| Attribute | Description |
|-----------|-------------|
| Display name | Name shown to the user. |
| Association | To available slots and appointments. |

When the clinic has multiple doctors, the user selects a doctor during booking (FR-011).

---

### Time slot / Availability

A bookable unit of time for a procedure (and optionally per doctor).

| Attribute | Description |
|-----------|-------------|
| Date | Calendar date. |
| Time range | Start (and optionally end) time. |
| Procedure | Procedure this slot is for. |
| Doctor | Doctor (if multiple). |

**Rules**: Used to prevent double-booking; only one confirmed appointment per slot and doctor
(FR-010). If the system holds a slot temporarily, it must be released on timeout or payment
failure (spec edge cases).

---

### Appointment

A booked service for a user.

| Attribute | Description |
|-----------|-------------|
| User | Owner of the appointment. |
| Procedure | Booked procedure. |
| Date, time | When the appointment is scheduled. |
| Doctor | Assigned doctor. |
| Status | e.g. upcoming, completed, cancelled. |
| Payment | Link to the payment that confirmed it (if paid). |

**Lifecycle**: Created only after successful payment or successful balance deduction (FR-012).
Failed or abandoned payment must not leave a confirmed appointment.

---

### Payment

A monetary transaction (for an appointment or balance top-up).

| Attribute | Description |
|-----------|-------------|
| User | Owner. |
| Amount | Transaction amount. |
| Date | When the payment occurred. |
| Status | e.g. success, failed. |
| Reference | Related appointment or top-up. |

**Audit**: SEC-005 requires security-relevant payment events to be logged; frontend shows
payment history (FR-015) from backend data.

---

### Member status (membership tier)

A level or tier assigned to a user (e.g. standard, silver, gold).

| Attribute | Description |
|-----------|-------------|
| Tier name / level | Displayed to the user (FR-016). |
| User | Which user has this status. |

Determines which benefits apply.

---

### Member benefit

A rule or entitlement attached to a member status.

| Attribute | Description |
|-----------|-------------|
| Type | e.g. discount percentage, fixed discount, eligible procedures. |
| Member status | Which tier this benefit belongs to. |
| Applicability | e.g. procedure IDs or categories. |

Applied at booking and payment so the user sees the correct price (FR-019).

---

### User balance

The user’s current prepaid balance (when the clinic supports it).

| Attribute | Description |
|-----------|-------------|
| User | Owner. |
| Current balance | Amount available. |

**Updates**: Decreased when the user pays with balance; increased on successful top-up (FR-017,
FR-018). Balance must update immediately after a successful deduction or top-up.

---

## State and validation (summary)

- **Profile**: Editable; validation on save (FR-008); last successful save wins (spec edge case).
- **Appointment**: Confirmed only after successful payment/balance deduction; no half-created
  appointment on payment failure.
- **Slot**: Released if payment fails or hold times out; no double-booking (FR-010).
- **Balance**: Deduction and top-up are atomic with payment records; displayed balance must
  match backend (SC-005).

---

## Relationship overview

```text
User 1──1 Profile
User 1──* Appointment  *──1 Procedure
Appointment *──1 Doctor
Appointment *──1 Payment (confirming)
User 1──* Payment
User 1──1 Member status  *──* Member benefit
User 1──1 User balance
Procedure, Doctor, Time slot: reference data and availability (many-to-many as needed)
```

Frontend modules (identity, profile, booking, payment, membership) map to these entities and
to the gRPC services defined in `contracts/`.
