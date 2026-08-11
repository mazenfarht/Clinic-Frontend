// src/components/Appointments/AppointmentStatus.tsx

import type { AppointmentStatus as TStatus } from "@/src/types/appointment";

interface AppointmentStatusProps {
  status: TStatus;
  size?: "sm" | "md";
}

const CONFIG: Record<TStatus, { label: string; className: string }> = {
  SCHEDULED: {
    label: "Scheduled",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-slate-100 text-slate-500 border-slate-200",
  },
  NO_SHOW: {
    label: "No Show",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function AppointmentStatus({
  status,
  size = "sm",
}: AppointmentStatusProps) {
  const { label, className } = CONFIG[status] ?? CONFIG.SCHEDULED;

  return (
    <span
      className={[
        "inline-flex items-center border rounded-full font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
