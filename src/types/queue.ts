export type QueueStatus = "WAITING" | "IN_PROGRESS" | "SERVED" | "CANCELLED";

export interface QueueVisitPatient {
  id: string;
  fullName: string;
  phone: string;
  mrn: string;
}

export interface QueueVisit {
  id: string;
  visitDate: string;
  chiefComplaint: string | null;
  patient: QueueVisitPatient;
}

export interface QueueEntry {
  id: string;
  clinicId: string;
  visitId: string | null;
  queueDate: string;
  queueNumber: number;
  isReserved: boolean;
  reservedFor: string | null;
  status: QueueStatus;
  checkedInAt: string | null;
  calledAt: string | null;
  startedAt: string | null;
  servedAt: string | null;
  createdAt: string;
  updatedAt: string;
  visit: QueueVisit | null;
  createdBy: { id: string; fullName: string };
  updatedBy: { id: string; fullName: string };
}

export interface QueueStatusEntry {
  id: string;
  queueNumber: number;
  status: QueueStatus;
  checkedInAt: string | null;
  calledAt: string | null;
  startedAt: string | null;
  visit: QueueVisit | null;
}

export interface QueueStatusSummary {
  currentlyServing: QueueStatusEntry | null;
  nextWaiting: QueueStatusEntry | null;
  waitingCount: number;
  servedCount: number;
}

export interface QueueStatistics {
  date: string;
  total: number;
  waiting: number;
  inProgress: number;
  served: number;
  cancelled: number;
  averageWaitTimeMinutes: number | null;
  averageServeTimeMinutes: number | null;
}

// ── Request payloads ──────────────────────────────────────────────

export interface CheckInPayload {
  patientId: string;
  appointmentId?: string;
  chiefComplaint?: string;
  notes?: string;
}

export interface ReserveQueuePayload {
  queueNumber: 1 | 2 | 3;
  reservedFor: string;
  notes?: string;
}

export interface ResetQueueResult {
  cancelled: number;
}

// ── Query params ──────────────────────────────────────────────────

export interface QueueListParams {
  status?: QueueStatus;
  date?: string; // ISO date string YYYY-MM-DD
  page?: number;
  limit?: number;
}

// ── Pagination ────────────────────────────────────────────────────

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedQueue {
  data: QueueEntry[];
  meta: PaginatedMeta;
}

// ── Generic API response wrappers ─────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginatedMeta;
}
