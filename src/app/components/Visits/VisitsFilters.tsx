// src/modules/visits/components/VisitsFilters.tsx

"use client";

import { Filter, RotateCcw, Search, X } from "lucide-react";
import { VisitFilters } from "../../../types/visit";

type Props = {
  filters: VisitFilters;
  onChange: (filters: VisitFilters) => void;
  onReset: () => void;
};

export default function VisitsFilters({ filters, onChange, onReset }: Props) {
  const hasFilters =
    !!filters.search ||
    !!filters.date ||
    !!filters.fromDate ||
    !!filters.toDate ||
    !!filters.sortBy ||
    !!filters.sortOrder;

  const handleChange = (partial: Partial<VisitFilters>) => {
    onChange({ ...filters, ...partial, page: 1 });
  };

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm p-4 space-y-4">
      {/* Search */}
      <div className="relative w-full">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A92]"
        />
        <input
          type="text"
          value={filters.search ?? ""}
          onChange={(e) =>
            handleChange({ search: e.target.value || undefined })
          }
          placeholder="Search by patient name, MRN, complaint..."
          className="w-full pl-11 pr-10 py-3 bg-white border border-[#D0D5DD] rounded-xl text-sm text-[#1A2B45] placeholder:text-[#98A2B3] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
        />
        {filters.search && (
          <button
            type="button"
            onClick={() => handleChange({ search: undefined })}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#6B7A92] hover:bg-[#F2F4F7] transition"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* Row: date filters + sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter icon */}
        <div className="flex items-center gap-2 text-[#1A2B45]">
          <Filter size={18} />
          <span className="text-sm font-semibold">Filters</span>
        </div>

        {/* Exact Date */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#6B7A92] whitespace-nowrap">
            Date
          </label>
          <input
            type="date"
            value={filters.date ?? ""}
            onChange={(e) =>
              handleChange({ date: e.target.value || undefined })
            }
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] bg-white outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          />
        </div>

        {/* From Date */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#6B7A92] whitespace-nowrap">
            From
          </label>
          <input
            type="date"
            value={filters.fromDate ?? ""}
            onChange={(e) =>
              handleChange({ fromDate: e.target.value || undefined })
            }
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] bg-white outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          />
        </div>

        {/* To Date */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#6B7A92] whitespace-nowrap">To</label>
          <input
            type="date"
            value={filters.toDate ?? ""}
            onChange={(e) =>
              handleChange({ toDate: e.target.value || undefined })
            }
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] bg-white outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          />
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#6B7A92] whitespace-nowrap">
            Sort By
          </label>
          <select
            value={filters.sortBy ?? ""}
            onChange={(e) =>
              handleChange({ sortBy: e.target.value || undefined })
            }
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] bg-white outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          >
            <option value="">Default</option>
            <option value="visitDate">Visit Date</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-[#6B7A92] whitespace-nowrap">
            Order
          </label>
          <select
            value={filters.sortOrder ?? ""}
            onChange={(e) =>
              handleChange({
                sortOrder: (e.target.value as "asc" | "desc") || undefined,
              })
            }
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] bg-white outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          >
            <option value="">Default</option>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="lg:ml-auto inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-[#6B7A92] hover:bg-[#F8FAFB] transition"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
