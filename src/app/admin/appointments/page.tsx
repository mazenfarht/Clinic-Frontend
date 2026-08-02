"use client";

// src/app/appointments/page.tsx

import { useAppointments } from "../../../hooks/useAppointments";
import AppointmentHeader from "../../components/Appointments/AppointmentHeader";
import AppointmentFilters from "../../components/Appointments/AppointmentFilters";
import AppointmentTable from "../../components/Appointments/AppointmentTable";

export default function AppointmentsPage() {
  const {
    appointments,
    meta,
    isLoading,
    isError,
    filters,
    updateFilter,
    resetFilters,
    setPage,
    actionLoading,
    actionError,
    dismissActionError,
    handleCancel,
    handleComplete,
  } = useAppointments();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        <AppointmentHeader total={meta?.total} />

        {actionError && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
            <span className="shrink-0 mt-0.5">⚠</span>
            <span className="flex-1">{actionError}</span>
            <button
              onClick={dismissActionError}
              className="text-red-400 hover:text-red-600 shrink-0 text-xs"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        <AppointmentFilters
          filters={filters}
          onChange={updateFilter}
          onReset={resetFilters}
        />

        <AppointmentTable
          appointments={appointments}
          isLoading={isLoading}
          isError={isError}
          meta={meta}
          actionLoading={actionLoading}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
