export interface VisitPatient {
  id: string;
  fullName: string;
  phone: string;
  mrn: string;
}

export interface VisitCreatedBy {
  id: string;
  fullName: string;
}

export interface VisitUpdatedBy {
  id: string;
  fullName: string;
}

export interface VisitAppointment {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notes: string | null;
}

export interface VisitQueueEntry {
  id: string;
  queueNumber: number;
  status: string;
  calledAt: string | null;
  servedAt: string | null;
}

export interface Visit {
  id: string;
  clinicId: string;
  patientId: string;
  visitDate: string;
  chiefComplaint: string | null;
  diagnosis: string | null;
  treatment: string | null;
  prescription: string | null;
  notes: string | null;
  startedAt: string | null;
  completedAt: string | null;
  followUpDate: string | null;
  createdAt: string;
  updatedAt: string;
  patient: VisitPatient;
  createdBy: VisitCreatedBy;
  updatedBy: VisitUpdatedBy | null;
  appointment?: VisitAppointment | null;
  queueEntry?: VisitQueueEntry | null;
}

export interface VisitMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface VisitFilters {
  search?: string;
  patientId?: string;
  createdById?: string;
  date?: string;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface CreateVisitPayload {
  patientId: string;
  appointmentId?: string;
  queueEntryId?: string;
  visitDate?: string;
  chiefComplaint?: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  notes?: string;
}

export interface UpdateVisitPayload {
  chiefComplaint?: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: string;
  notes?: string;
  followUpDate?: string;
}

export interface VisitsResponse {
  success: boolean;
  message: string;
  data: Visit[];
  meta: VisitMeta;
}

export interface VisitResponse {
  success: boolean;
  message: string;
  data: Visit;
}
