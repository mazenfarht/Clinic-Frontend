import { api } from "@/src/lib/axios";
import type {
  AppointmentListResponse,
  AppointmentDetailResponse,
  AppointmentFiltersParams,
} from "@/src/types/appointment";

function buildParams(
  filters: AppointmentFiltersParams
): Record<string, string | number> {
  const params: Record<string, string | number> = {};

  if (filters.search?.trim()) params.search = filters.search.trim();
  if (filters.status) params.status = filters.status;
  if (filters.date) params.date = filters.date;
  if (filters.fromDate) params.fromDate = filters.fromDate;
  if (filters.toDate) params.toDate = filters.toDate;
  if (filters.patientId) params.patientId = filters.patientId;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  return params;
}

// GET /appointments
export async function getAppointments(
  filters: AppointmentFiltersParams = {}
): Promise<AppointmentListResponse> {
  const res = await api.get<AppointmentListResponse>("/appointments", {
    params: buildParams(filters),
  });

  return res.data;
}

// GET /appointments/:id
export async function getAppointmentById(
  id: string
): Promise<AppointmentDetailResponse> {
  const res = await api.get<AppointmentDetailResponse>(`/appointments/${id}`);

  return res.data;
}

// PATCH /appointments/:id/confirm
export async function confirmAppointment(id: string): Promise<void> {
  await api.patch(`/appointments/${id}/confirm`);
}

// PATCH /appointments/:id/complete
export async function completeAppointment(id: string): Promise<void> {
  await api.patch(`/appointments/${id}/complete`);
}

// PATCH /appointments/:id/no-show
export async function noShowAppointment(id: string): Promise<void> {
  await api.patch(`/appointments/${id}/no-show`);
}

// PATCH /appointments/:id/cancel
export async function cancelAppointment(id: string): Promise<void> {
  await api.patch(`/appointments/${id}/cancel`);
}
