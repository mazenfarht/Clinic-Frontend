"use client";

import { CalendarCheck, XCircle, CheckCircle2, CalendarX } from "lucide-react";
import { AppointmentMetrics as AppointmentMetricsType } from "@/src/types/analytics";

type MetricRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg?: string;
  iconColor?: string;
};

function MetricRow({
  icon,
  label,
  value,
  iconBg = "bg-[#EBF3FF]",
  iconColor = "text-[#1A6BCC]",
}: MetricRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F0F3F7] last:border-0">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconBg} ${iconColor} shrink-0`}>
          {icon}
        </div>
        <span className="text-sm text-[#344054]">{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#1A2B45]">{value}</span>
    </div>
  );
}

type Props = {
  appointmentMetrics: AppointmentMetricsType;
};

export default function AppointmentMetrics({ appointmentMetrics }: Props) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <CalendarCheck size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Appointment Performance
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Appointment completion and cancellation metrics.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-6 py-2">
        <MetricRow
          icon={<CalendarCheck size={17} />}
          label="Total Completed"
          value={appointmentMetrics.totalCompleted}
          iconBg="bg-[#EBF3FF]"
          iconColor="text-[#1A6BCC]"
        />
        <MetricRow
          icon={<CalendarX size={17} />}
          label="Total Cancelled"
          value={appointmentMetrics.totalCancelled}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#D92D20]"
        />
        <MetricRow
          icon={<CheckCircle2 size={17} />}
          label="Completion Rate"
          value={`${appointmentMetrics.completionRate}%`}
          iconBg="bg-[#ECFDF3]"
          iconColor="text-[#027A48]"
        />
        <MetricRow
          icon={<XCircle size={17} />}
          label="Cancellation Rate"
          value={`${appointmentMetrics.cancellationRate}%`}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#D92D20]"
        />
      </div>
    </div>
  );
}
