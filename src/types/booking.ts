// ─── Availability ────────────────────────────────────────────────────────────

export interface AvailabilityResponse {
  date: string;
  isOpen: boolean;
  availableSlots: string[]; // ["09:00", "09:30", ...]
}

// ─── Patient Lookup ───────────────────────────────────────────────────────────

export interface PatientLookupPayload {
  phone: string;
}

export interface PatientLookupResponse {
  exists: boolean;
  patientId?: string;
  fullName?: string;
}

// ─── Patient Registration ─────────────────────────────────────────────────────

export type Gender = "MALE" | "FEMALE";

export interface PatientRegistrationPayload {
  fullName: string;
  phone: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  gender: Gender;
}

export interface PatientRegistrationResponse {
  patientId: string;
  fullName: string;
}

// ─── Appointment Booking ──────────────────────────────────────────────────────

export interface AppointmentPayload {
  patientId: string;
  appointmentDate: string; // "YYYY-MM-DD"
  appointmentTime: string; // "HH:mm"
  notes?: string;
}

export interface AppointmentResponse {
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  queueNumber?: number;
}

// ─── Booking Flow State ───────────────────────────────────────────────────────

export type BookingStep =
  | "SELECT_DATE_TIME"
  | "PHONE_MODAL"
  | "REGISTER_PATIENT"
  | "BOOKING_SUMMARY"
  | "SUCCESS";

export interface BookingState {
  step: BookingStep;
  selectedDate: string;
  selectedTime: string;
  slots: string[];
  loadingSlots: boolean;
  slotsError: string | null;

  phone: string;
  lookupLoading: boolean;
  lookupError: string | null;

  patientId: string | null;
  patientName: string | null;
  isNewPatient: boolean;

  registrationLoading: boolean;
  registrationError: string | null;

  bookingLoading: boolean;
  bookingError: string | null;

  appointment: AppointmentResponse | null;
}
