"use client";

import React, { useState } from "react";
import { CalendarDays, Clock, User, Phone, Loader2, ArrowLeft, Pencil } from "lucide-react";

interface BookingSummaryProps {
  patientName: string | null;
  phone: string;
  selectedDate: string;
  selectedTime: string;
  loading: boolean;
  error: string | null;
  onConfirm: (notes?: string) => void;
  onBack: () => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BookingSummary({
  patientName,
  phone,
  selectedDate,
  selectedTime,
  loading,
  error,
  onConfirm,
  onBack,
}: BookingSummaryProps) {
  const [notes, setNotes] = useState("");

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Review Your Appointment</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please confirm the details below before booking.
        </p>
      </div>

      {/* Summary Card */}
      <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <SummaryRow
          icon={<User size={15} className="text-blue-400" />}
          label="Patient"
          value={patientName ?? "—"}
        />
        <SummaryRow
          icon={<Phone size={15} className="text-blue-400" />}
          label="Phone"
          value={phone}
        />
        <SummaryRow
          icon={<CalendarDays size={15} className="text-blue-400" />}
          label="Date"
          value={formatDate(selectedDate)}
        />
        <SummaryRow
          icon={<Clock size={15} className="text-blue-400" />}
          label="Time"
          value={selectedTime}
        />
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <Pencil size={13} className="text-blue-400" />
          Notes for the doctor{" "}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Describe your symptoms or reason for visit…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={loading}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={() => onConfirm(notes.trim() || undefined)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Booking…
          </>
        ) : (
          "Confirm Appointment"
        )}
      </button>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <span className="flex-shrink-0">{icon}</span>
      <span className="w-16 flex-shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
}
