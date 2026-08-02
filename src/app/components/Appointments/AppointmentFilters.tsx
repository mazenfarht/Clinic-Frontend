"use client";

// src/components/Appointments/AppointmentFilters.tsx

import { Search, X } from "lucide-react";
import type {
  AppointmentFiltersParams,
  AppointmentStatus,
} from "@/src/types/appointment";

interface AppointmentFiltersProps {
  filters: AppointmentFiltersParams;
  onChange: (patch: Partial<AppointmentFiltersParams>) => void;
  onReset: () => void;
}

const STATUS_OPTIONS: { value: AppointmentStatus | ""; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const hasActiveFilters = (f: AppointmentFiltersParams) =>
  !!(f.search || f.status || f.date || f.fromDate || f.toDate);

export default function AppointmentFilters({
  filters,
  onChange,
  onReset,
}: AppointmentFiltersProps) {
  return (
    <div className="bg-white text-black rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={filters.search ?? ""}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search patient name, phone, MRN…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Status */}
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            onChange({ status: e.target.value as AppointmentStatus | "" })
          }
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white transition-colors"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          value={filters.date ?? ""}
          onChange={(e) => onChange({ date: e.target.value || undefined })}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white transition-colors"
          title="Filter by exact date"
        />

        {/* From date */}
        <input
          type="date"
          value={filters.fromDate ?? ""}
          onChange={(e) => onChange({ fromDate: e.target.value || undefined })}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white transition-colors"
          placeholder="From"
          title="From date"
        />

        {/* To date */}
        <input
          type="date"
          value={filters.toDate ?? ""}
          onChange={(e) => onChange({ toDate: e.target.value || undefined })}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white transition-colors"
          placeholder="To"
          title="To date"
        />

        {/* Reset */}
        {hasActiveFilters(filters) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
