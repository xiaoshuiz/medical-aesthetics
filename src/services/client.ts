/**
 * API client facade. Switch to gRPC-Web implementation when backend is ready.
 * Exports typed stubs for Auth, Profile, Catalog, Appointment, Payment, Membership.
 */

export * as auth from './mock/auth';
export * as profile from './mock/profile';
export * as catalog from './mock/catalog';
export * as appointment from './mock/appointment';
export * as payment from './mock/payment';
export * as membership from './mock/membership';
