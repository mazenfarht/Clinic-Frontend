import { api } from "@/src/lib/axios";

import type {
  AvailabilityResponse,
  PatientLookupPayload,
  PatientLookupResponse,
  PatientRegistrationPayload,
  PatientRegistrationResponse,
  AppointmentPayload,
  AppointmentResponse,
} from "@/src/types/booking";

const CLINIC_ID = process.env.NEXT_PUBLIC_CLINIC_ID;

if (!CLINIC_ID) {
  throw new Error("NEXT_PUBLIC_CLINIC_ID is not configured");
}

export async function getAvailability(
  date: string
): Promise<AvailabilityResponse> {
  const res = await api.get(`/public/clinics/${CLINIC_ID}/availability`, {
    params: { date },
  });

  console.log("AVAILABILITY RESPONSE:", res.data);

  return res.data.data;
}
export async function lookupPatient(
  payload: PatientLookupPayload
): Promise<PatientLookupResponse> {
  const res = await api.post<{ data: PatientLookupResponse }>(
    `/public/clinics/${CLINIC_ID}/patients/lookup`,
    payload
  );

  return res.data.data;
}

export async function registerPatient(
  payload: PatientRegistrationPayload
): Promise<PatientRegistrationResponse> {
  const res = await api.post<{ data: PatientRegistrationResponse }>(
    `/public/clinics/${CLINIC_ID}/patients/register`,
    payload
  );

  return res.data.data;
}

export async function bookAppointment(
  payload: AppointmentPayload
): Promise<AppointmentResponse> {
  const res = await api.post<{ data: AppointmentResponse }>(
    `/public/clinics/${CLINIC_ID}/appointments`,
    payload
  );

  return res.data.data;
}
