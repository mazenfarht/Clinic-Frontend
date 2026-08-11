// src/types/appointment.ts

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";
// ── Shared sub-types (match actual API response shapes) ───────────────────

export interface AppointmentPatient {
  id: string;
  fullName: string;
  phone: string;
  mrn: string;
}

export interface AppointmentUser {
  id: string;
  fullName: string;
}

export interface AppointmentVisit {
  id: string;
  visitDate: string;
  chiefComplaint: string | null;
  diagnosis: string | null;
  treatment: string | null;
  prescription: string | null;
  notes: string | null;
  createdAt: string;
}

// ── Core appointment (used in list) ──────────────────────────────────────

export interface Appointment {
  id: string;
  clinicId: string;
  patientId: string;
  visitId: string | null;
  appointmentDate: string; // ISO datetime string e.g. "2024-02-01T00:00:00.000Z"
  appointmentTime: string; // ISO datetime string e.g. "1970-01-01T09:30:00.000Z"
  status: AppointmentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  patient: AppointmentPatient;
  createdBy: AppointmentUser | null;
  updatedBy: AppointmentUser | null;
}

// ── Full appointment detail (includes visit) ──────────────────────────────

export interface AppointmentDetail extends Appointment {
  visit: AppointmentVisit | null;
}

// ── Pagination meta ───────────────────────────────────────────────────────

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ── API response wrappers ─────────────────────────────────────────────────

export interface AppointmentListResponse {
  success: true;
  message: string;
  data: Appointment[];
  meta: PaginationMeta;
}

export interface AppointmentDetailResponse {
  success: true;
  message: string;
  data: AppointmentDetail;
}

// ── Query / filter params ─────────────────────────────────────────────────

export interface AppointmentFiltersParams {
  search?: string;
  status?: AppointmentStatus | "";
  date?: string;
  fromDate?: string;
  toDate?: string;
  patientId?: string;
  page?: number;
  limit?: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Extract HH:MM from the stored ISO time string (epoch-based) */
export function parseTime(isoTime: string): string {
  const d = new Date(isoTime);
  const h = d.getUTCHours().toString().padStart(2, "0");
  const m = d.getUTCMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Extract YYYY-MM-DD from the stored ISO date string */
export function parseDate(isoDate: string): string {
  return isoDate.split("T")[0];
}

/** Format HH:MM → "9:30 AM" */
export function formatTime12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Format YYYY-MM-DD → "Feb 1, 2024" */
export function formatDateShort(ymd: string): string {
  return new Date(ymd + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Format YYYY-MM-DD → "Thursday, February 1, 2024" */
export function formatDateLong(ymd: string): string {
  return new Date(ymd + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
