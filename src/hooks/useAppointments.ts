"use client";

// src/hooks/useAppointments.ts

import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAppointments,
  cancelAppointment,
  completeAppointment,
} from "@/src/services/appointment";
import type { AppointmentFiltersParams } from "@/src/types/appointment";

const QUERY_KEY = "appointments";

export function useAppointments() {
  const queryClient = useQueryClient();

  // ── Filters ───────────────────────────────────────────────────────────────

  const [filters, setFilters] = useState<AppointmentFiltersParams>({
    page: 1,
    limit: 10,
  });

  const updateFilter = useCallback(
    (patch: Partial<AppointmentFiltersParams>) => {
      setFilters((prev) => ({ ...prev, ...patch, page: 1 }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 10 });
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // ── List query ────────────────────────────────────────────────────────────

  const {
    data: listResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => getAppointments(filters),
    staleTime: 30_000,
  });

  const appointments = listResponse?.data ?? [];
  const meta = listResponse?.meta;

  // ── Status actions ────────────────────────────────────────────────────────

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  function extractMessage(err: unknown): string {
    if (
      err &&
      typeof err === "object" &&
      "response" in err &&
      (err as { response?: { data?: { message?: string } } }).response?.data
        ?.message
    ) {
      return (err as { response: { data: { message: string } } }).response.data
        .message;
    }
    return "An unexpected error occurred.";
  }

  const handleCancel = useCallback(
    async (id: string) => {
      setActionLoading(id);
      setActionError(null);
      try {
        await cancelAppointment(id);
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      } catch (err) {
        setActionError(extractMessage(err));
      } finally {
        setActionLoading(null);
      }
    },
    [queryClient]
  );

  const handleComplete = useCallback(
    async (id: string) => {
      setActionLoading(id);
      setActionError(null);
      try {
        await completeAppointment(id);
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      } catch (err) {
        setActionError(extractMessage(err));
      } finally {
        setActionLoading(null);
      }
    },
    [queryClient]
  );

  const dismissActionError = useCallback(() => setActionError(null), []);

  return {
    // List
    appointments,
    meta,
    isLoading,
    isError,
    error,
    refetch,

    // Filters
    filters,
    updateFilter,
    resetFilters,
    setPage,

    // Actions
    actionLoading,
    actionError,
    dismissActionError,
    handleCancel,
    handleComplete,
  };
}
