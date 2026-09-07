import type { AppointmentStatus } from "./appointment";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type UserReference = {
  id: string;
  fullName: string;
};

export type PatientAppointment = {
  id: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  notes: string | null;
};

export type PatientVisit = {
  id: string;
  visitDate: string;
  chiefComplaint: string | null;
  diagnosis: string | null;
  treatment?: string | null;
  prescription?: string | null;
  notes?: string | null;
  createdAt?: string;
};

export type Patient = {
  id: string;
  clinicId: string;
  mrn: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address: string | null;
  notes: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;

  createdBy?: UserReference;
  updatedBy?: UserReference;

  appointments?: PatientAppointment[];
  visits?: PatientVisit[];
};

export type PatientDetails = Patient & {
  visits: PatientVisit[];
  appointments: PatientAppointment[];
};

export type CreatePatientData = {
  mrn: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  address?: string;
  notes?: string;
};

export type UpdatePatientData = {
  fullName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  address?: string | null;
  notes?: string | null;
};

export type PatientsQueryParams = {
  search?: string;
  gender?: Gender;
  includeDeleted?: boolean;
  page?: number;
  limit?: number;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PaginatedApiResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
};

export type PatientsResponse = PaginatedApiResponse<Patient>;

export type PatientDetailsResponse = ApiResponse<PatientDetails>;

export type PatientAppointmentResponse = ApiResponse<PatientAppointment>;

export type PatientVisitResponse = ApiResponse<PatientVisit>;
