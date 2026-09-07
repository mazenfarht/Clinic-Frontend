// src/modules/visits/components/VisitStats.tsx

"use client";

import { Activity, CheckCircle, Clock, FileText } from "lucide-react";
import { VisitMeta, Visit } from "../../../types/visit";

type Props = {
  visits: Visit[];
  meta: VisitMeta;
};

export default function VisitStats({ visits, meta }: Props) {
  const completed = visits.filter((v) => !!v.completedAt).length;
  const inProgress = visits.filter(
    (v) => !!v.startedAt && !v.completedAt
  ).length;
  const pending = visits.filter((v) => !v.startedAt && !v.completedAt).length;

  const stats = [
    {
      label: "Total Visits",
      value: meta.total,
      icon: FileText,
      bg: "bg-[#EBF3FF]",
      color: "text-[#1A6BCC]",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      bg: "bg-[#ECFDF3]",
      color: "text-[#027A48]",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Activity,
      bg: "bg-[#FFF7E6]",
      color: "text-[#B54708]",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      bg: "bg-[#F2F4F7]",
      color: "text-[#475467]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm p-4 flex items-center gap-4"
          >
            <div
              className={`p-2.5 rounded-lg ${stat.bg} ${stat.color} shrink-0`}
            >
              <Icon size={20} />
            </div>

            <div>
              <p className="text-xs text-[#6B7A92]">{stat.label}</p>
              <p className="text-xl font-bold text-[#1A2B45] mt-0.5">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
