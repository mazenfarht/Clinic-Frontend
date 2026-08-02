"use client";

import React from "react";
import { Clock, Loader2 } from "lucide-react";

interface TimeSlotPickerProps {
  slots: string[];
  selected: string;
  loading: boolean;
  error: string | null;
  onSelect: (time: string) => void;
}

export function TimeSlotPicker({
  slots,
  selected,
  loading,
  error,
  onSelect,
}: TimeSlotPickerProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-gray-50 py-10 text-gray-400">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading available slots…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-6 text-center text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (slots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Clock size={16} className="text-blue-500" />
        Select a Time Slot
      </label>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((time) => {
          const isSelected = time === selected;
          return (
            <button
              key={time}
              type="button"
              onClick={() => onSelect(time)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
