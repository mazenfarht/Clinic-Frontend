// src/modules/visits/services/visit.service.ts

import apiClient from "../lib/axios";
import {
  VisitsResponse,
  VisitResponse,
  VisitFilters,
  CreateVisitPayload,
  UpdateVisitPayload,
} from "../types/visit";

export const visitService = {
  getVisits: async (filters?: VisitFilters): Promise<VisitsResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.search) params.append("search", filters.search);
      if (filters.patientId) params.append("patientId", filters.patientId);
      if (filters.createdById)
        params.append("createdById", filters.createdById);
      if (filters.date) params.append("date", filters.date);
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    const { data } = await apiClient.get<VisitsResponse>(
      `/visits?${params.toString()}`
    );
    return data;
  },

  getVisitById: async (id: string): Promise<VisitResponse> => {
    const { data } = await apiClient.get<VisitResponse>(`/visits/${id}`);
    return data;
  },

  getPatientVisits: async (
    patientId: string,
    filters?: VisitFilters
  ): Promise<VisitsResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.search) params.append("search", filters.search);
      if (filters.date) params.append("date", filters.date);
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    const { data } = await apiClient.get<VisitsResponse>(
      `/patients/${patientId}/visits?${params.toString()}`
    );
    return data;
  },

  createVisit: async (payload: CreateVisitPayload): Promise<VisitResponse> => {
    const { data } = await apiClient.post<VisitResponse>("/visits", payload);
    return data;
  },

  updateVisit: async (
    id: string,
    payload: UpdateVisitPayload
  ): Promise<VisitResponse> => {
    const { data } = await apiClient.patch<VisitResponse>(
      `/visits/${id}`,
      payload
    );
    return data;
  },

  deleteVisit: async (id: string): Promise<void> => {
    await apiClient.delete(`/visits/${id}`);
  },
};
