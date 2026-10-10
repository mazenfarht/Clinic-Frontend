"use client";

import {
  Users,
  XCircle,
  CheckCircle2,
  Clock,
  Timer,
  CalendarCheck,
} from "lucide-react";
import { QueueMetrics, AppointmentMetrics } from "@/src/types/analytics";

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg?: string;
  iconColor?: string;
};

function StatCard({
  icon,
  label,
  value,
  iconBg = "bg-[#EBF3FF]",
  iconColor = "text-[#1A6BCC]",
}: StatCardProps) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm p-5 flex items-start gap-4">
      <div className={`p-2.5 rounded-lg ${iconBg} ${iconColor} shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[#1A2B45]">{value}</p>
        <p className="text-sm text-[#6B7A92] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

type Props = {
  queueMetrics: QueueMetrics;
  appointmentMetrics: AppointmentMetrics;
};

export default function AnalyticsSummaryCards({
  queueMetrics,
  appointmentMetrics,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Queue Summary */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B7A92] uppercase tracking-wider mb-3">
          Queue
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={<Users size={20} />}
            label="Total Served"
            value={queueMetrics.totalServed}
            iconBg="bg-[#EBF3FF]"
            iconColor="text-[#1A6BCC]"
          />
          <StatCard
            icon={<XCircle size={20} />}
            label="Total Cancelled"
            value={queueMetrics.totalCancelled}
            iconBg="bg-[#FEF3F2]"
            iconColor="text-[#D92D20]"
          />
          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Completion Rate"
            value={`${queueMetrics.completionRate}%`}
            iconBg="bg-[#ECFDF3]"
            iconColor="text-[#027A48]"
          />
          <StatCard
            icon={<XCircle size={20} />}
            label="Cancellation Rate"
            value={`${queueMetrics.cancellationRate}%`}
            iconBg="bg-[#FEF3F2]"
            iconColor="text-[#D92D20]"
          />
          <StatCard
            icon={<Clock size={20} />}
            label="Avg Wait Time"
            value={`${queueMetrics.averageWaitTimeMinutes} min`}
            iconBg="bg-[#FFF7E6]"
            iconColor="text-[#B54708]"
          />
          <StatCard
            icon={<Timer size={20} />}
            label="Avg Serve Time"
            value={`${queueMetrics.averageServeTimeMinutes} min`}
            iconBg="bg-[#FFF7E6]"
            iconColor="text-[#B54708]"
          />
        </div>
      </div>

      {/* Appointment Summary */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B7A92] uppercase tracking-wider mb-3">
          Appointments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<CalendarCheck size={20} />}
            label="Total Completed"
            value={appointmentMetrics.totalCompleted}
            iconBg="bg-[#EBF3FF]"
            iconColor="text-[#1A6BCC]"
          />
          <StatCard
            icon={<XCircle size={20} />}
            label="Total Cancelled"
            value={appointmentMetrics.totalCancelled}
            iconBg="bg-[#FEF3F2]"
            iconColor="text-[#D92D20]"
          />
          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Completion Rate"
            value={`${appointmentMetrics.completionRate}%`}
            iconBg="bg-[#ECFDF3]"
            iconColor="text-[#027A48]"
          />
          <StatCard
            icon={<XCircle size={20} />}
            label="Cancellation Rate"
            value={`${appointmentMetrics.cancellationRate}%`}
            iconBg="bg-[#FEF3F2]"
            iconColor="text-[#D92D20]"
          />
        </div>
      </div>
    </div>
  );
}
