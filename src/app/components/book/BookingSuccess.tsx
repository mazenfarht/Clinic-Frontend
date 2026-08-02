"use client";

import React from "react";
import { CheckCircle2, CalendarDays, Clock, Hash } from "lucide-react";
import type { AppointmentResponse } from "@/src/types/booking";

interface BookingSuccessProps {
  appointment: AppointmentResponse;
  patientName: string | null;
  onBookAnother: () => void;
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

export function BookingSuccess({
  appointment,
  patientName,
  onBookAnother,
}: BookingSuccessProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center space-y-6 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 size={48} className="text-green-500" />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Appointment Confirmed!
        </h2>
        {patientName && (
          <p className="mt-1 text-gray-500">
            See you soon,{" "}
            <span className="font-medium text-gray-700">{patientName}</span>.
          </p>
        )}
      </div>

      {/* Details card */}
      <div className="w-full divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
        {appointment.queueNumber != null && (
          <SuccessRow
            icon={<Hash size={15} className="text-blue-400" />}
            label="Queue No."
            value={`#${appointment.queueNumber}`}
          />
        )}
        <SuccessRow
          icon={<CalendarDays size={15} className="text-blue-400" />}
          label="Date"
          value={formatDate(appointment.appointmentDate)}
        />
        <SuccessRow
          icon={<Clock size={15} className="text-blue-400" />}
          label="Time"
          value={appointment.appointmentTime}
        />
      </div>

      <p className="text-sm text-gray-400">
        Please arrive 10 minutes before your scheduled time.
      </p>

      <button
        type="button"
        onClick={onBookAnother}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
      >
        Book Another Appointment
      </button>
    </div>
  );
}

function SuccessRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 text-left">
      <span className="flex-shrink-0">{icon}</span>
      <span className="w-16 flex-shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}
