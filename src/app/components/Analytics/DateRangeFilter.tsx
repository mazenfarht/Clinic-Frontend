"use client";

import { useState } from "react";
import { CalendarRange } from "lucide-react";

type Props = {
  fromDate: string;
  toDate: string;
  onApply: (fromDate: string, toDate: string) => void;
};

export default function DateRangeFilter({ fromDate, toDate, onApply }: Props) {
  const [localFrom, setLocalFrom] = useState(fromDate);
  const [localTo, setLocalTo] = useState(toDate);
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    setError(null);

    if (!localFrom || !localTo) {
      setError("Both dates are required.");
      return;
    }

    if (localFrom > localTo) {
      setError("From date must be before or equal to To date.");
      return;
    }

    onApply(localFrom, localTo);
  };

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm p-4">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        {/* Icon + Label */}
        <div className="flex items-center gap-2 text-[#1A2B45] lg:pb-0.5">
          <CalendarRange size={18} />
          <span className="text-sm font-semibold">Date Range</span>
        </div>

        {/* From Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#6B7A92] font-medium">
            From Date
          </label>
          <input
            type="date"
            value={localFrom}
            onChange={(e) => {
              setLocalFrom(e.target.value);
              setError(null);
            }}
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#1A2B45] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#6B7A92] font-medium">To Date</label>
          <input
            type="date"
            value={localTo}
            onChange={(e) => {
              setLocalTo(e.target.value);
              setError(null);
            }}
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#1A2B45] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          />
        </div>

        {/* Apply Button */}
        <button
          type="button"
          onClick={handleApply}
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-[#1A6BCC] text-white text-sm hover:bg-[#155AB5] transition shadow-sm"
        >
          Apply
        </button>
      </div>

      {/* Validation Error */}
      {error && (
        <p className="text-xs text-[#D92D20] mt-3 font-medium">{error}</p>
      )}
    </div>
  );
}
