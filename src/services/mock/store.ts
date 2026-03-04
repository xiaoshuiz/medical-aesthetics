/**
 * In-memory store for mock appointments and payments.
 * Persists to localStorage keyed by user_id so data survives refresh.
 */
import type { Appointment } from './appointment';
import type { Payment } from './payment';
import * as authStorage from '../auth';

const APPOINTMENTS_KEY = 'ma_mock_appointments';
const PAYMENTS_KEY = 'ma_mock_payments';
const BALANCE_KEY = 'ma_mock_balance';

function getUserId(): string | null {
  const session = authStorage.getSession();
  return session?.user?.user_id ?? null;
}

function loadAppointments(): Appointment[] {
  const uid = getUserId();
  if (!uid) return [];
  try {
    const raw = localStorage.getItem(`${APPOINTMENTS_KEY}_${uid}`);
    if (!raw) return [];
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

function saveAppointments(list: Appointment[]): void {
  const uid = getUserId();
  if (!uid) return;
  localStorage.setItem(`${APPOINTMENTS_KEY}_${uid}`, JSON.stringify(list));
}

function loadPayments(): Payment[] {
  const uid = getUserId();
  if (!uid) return [];
  try {
    const raw = localStorage.getItem(`${PAYMENTS_KEY}_${uid}`);
    if (!raw) return [];
    return JSON.parse(raw) as Payment[];
  } catch {
    return [];
  }
}

function savePayments(list: Payment[]): void {
  const uid = getUserId();
  if (!uid) return;
  localStorage.setItem(`${PAYMENTS_KEY}_${uid}`, JSON.stringify(list));
}

export function getStoredAppointments(): Appointment[] {
  return loadAppointments();
}

export function addAppointment(apt: Appointment): void {
  const list = loadAppointments();
  list.unshift(apt);
  saveAppointments(list);
}

export function getStoredPayments(): Payment[] {
  return loadPayments();
}

export function addPayment(p: Payment): void {
  const list = loadPayments();
  list.unshift(p);
  savePayments(list);
}

export function getStoredBalance(): number {
  const uid = getUserId();
  if (!uid) return 0;
  try {
    const raw = localStorage.getItem(`${BALANCE_KEY}_${uid}`);
    if (!raw) return 0;
    return Number.parseInt(raw, 10) || 0;
  } catch {
    return 0;
  }
}

export function setStoredBalance(cents: number): void {
  const uid = getUserId();
  if (!uid) return;
  localStorage.setItem(`${BALANCE_KEY}_${uid}`, String(Math.max(0, cents)));
}

export function deductBalance(cents: number): boolean {
  const current = getStoredBalance();
  if (current < cents) return false;
  setStoredBalance(current - cents);
  return true;
}
