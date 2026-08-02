"use client";

// src/components/Appointments/AppointmentRow.tsx

import { useRouter } from "next/navigation";
import { Eye, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import AppointmentStatus from "./AppointmentStatus";
import type { Appointment } from "@/src/types/appointment";
import {
  parseDate,
  parseTime,
  formatDateShort,
  formatTime12,
} from "@/src/types/appointment";

interface AppointmentRowProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  actionLoading: string | null;
}

export default function AppointmentRow({
  appointment: appt,
  onCancel,
  onComplete,
  actionLoading,
}: AppointmentRowProps) {
  const router = useRouter();
  const date = formatDateShort(parseDate(appt.appointmentDate));
  const time = formatTime12(parseTime(appt.appointmentTime));
  const isActing = actionLoading === appt.id;
  const isScheduled = appt.status === "SCHEDULED";

  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
      {/* Patient */}
      <td className="px-4 py-3">
        <p className="text-sm font-semibold text-slate-800">
          {appt.patient.fullName}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{appt.patient.phone}</p>
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
        {date}
      </td>

      {/* Time */}
      <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
        {time}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <AppointmentStatus status={appt.status} />
      </td>

      {/* Notes */}
      <td className="px-4 py-3">
        {appt.notes ? (
          <span
            className="text-xs text-slate-500 line-clamp-1 max-w-[160px] block"
            title={appt.notes}
          >
            {appt.notes}
          </span>
        ) : (
          <span className="text-xs text-slate-300">—</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {/* View → navigates to /appointments/:id */}
          <button
            onClick={() => router.push(`/admin/appointments/${appt.id}`)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
            title="View details"
          >
            <Eye size={15} />
          </button>

          {/* Complete */}
          {isScheduled && (
            <button
              onClick={() => onComplete(appt.id)}
              disabled={isActing}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors disabled:opacity-40"
              title="Mark as completed"
            >
              {isActing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <CheckCircle2 size={15} />
              )}
            </button>
          )}

          {/* Cancel */}
          {isScheduled && (
            <button
              onClick={() => onCancel(appt.id)}
              disabled={isActing}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-40"
              title="Cancel appointment"
            >
              {isActing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <XCircle size={15} />
              )}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
