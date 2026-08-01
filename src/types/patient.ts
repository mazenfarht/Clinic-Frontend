export type Gender = "MALE" | "FEMALE" | "OTHER";

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

  createdBy?: {
    id: string;
    fullName: string;
  };

  updatedBy?: {
    id: string;
    fullName: string;
  };

  visits?: unknown[];
  appointments?: unknown[];
};

export type PatientAppointment = {
  id: string;
  clinicId: string;
  patientId: string;

  visitId: string | null;

  appointmentDate: string;
  appointmentTime: string;

  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";

  notes: string | null;

  patient?: {
    id: string;
    fullName: string;
    phone: string;
    mrn: string;
  };

  createdBy?: {
    id: string;
    fullName: string;
  };

  updatedBy?: {
    id: string;
    fullName: string;
  };

  createdAt: string;
  updatedAt: string;
};

export type PatientVisit = {
  id: string;

  visitDate: string;

  chiefComplaint: string | null;
  diagnosis: string | null;
  treatment: string | null;
  prescription: string | null;
  notes: string | null;

  patientId: string;

  appointmentId: string | null;
  queueEntryId: string | null;

  createdBy?: {
    id: string;
    fullName: string;
  };

  updatedAt?: string;
  createdAt?: string;
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

export type PatientsResponse = {
  data: Patient[];
  meta: PaginationMeta;
};
