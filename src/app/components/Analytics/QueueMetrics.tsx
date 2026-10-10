"use client";

import {
  Users,
  XCircle,
  CheckCircle2,
  Clock,
  Timer,
  Activity,
} from "lucide-react";
import { QueueMetrics as QueueMetricsType } from "@/src/types/analytics";

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
  queueMetrics: QueueMetricsType;
};

export default function QueueMetrics({ queueMetrics }: Props) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <Activity size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Queue Performance
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Queue efficiency metrics for the selected period.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-6 py-2">
        <MetricRow
          icon={<Users size={17} />}
          label="Total Served"
          value={queueMetrics.totalServed}
          iconBg="bg-[#EBF3FF]"
          iconColor="text-[#1A6BCC]"
        />
        <MetricRow
          icon={<XCircle size={17} />}
          label="Total Cancelled"
          value={queueMetrics.totalCancelled}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#D92D20]"
        />
        <MetricRow
          icon={<CheckCircle2 size={17} />}
          label="Completion Rate"
          value={`${queueMetrics.completionRate}%`}
          iconBg="bg-[#ECFDF3]"
          iconColor="text-[#027A48]"
        />
        <MetricRow
          icon={<XCircle size={17} />}
          label="Cancellation Rate"
          value={`${queueMetrics.cancellationRate}%`}
          iconBg="bg-[#FEF3F2]"
          iconColor="text-[#D92D20]"
        />
        <MetricRow
          icon={<Clock size={17} />}
          label="Average Wait Time"
          value={`${queueMetrics.averageWaitTimeMinutes} min`}
          iconBg="bg-[#FFF7E6]"
          iconColor="text-[#B54708]"
        />
        <MetricRow
          icon={<Timer size={17} />}
          label="Average Serve Time"
          value={`${queueMetrics.averageServeTimeMinutes} min`}
          iconBg="bg-[#FFF7E6]"
          iconColor="text-[#B54708]"
        />
      </div>
    </div>
  );
}
