"use client";

import React from "react";
import { CalendarDays } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  loading?: boolean;
}

export function DatePicker({ value, onChange, loading }: DatePickerProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <CalendarDays size={16} className="text-blue-500" />
        Select Appointment Date
      </label>
      <input
        type="date"
        min={today}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
