"use client";

import { BarChart2 } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <BarChart2 size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1A2B45]">Analytics</h1>
          <p className="text-sm text-[#6B7A92] mt-0.5">
            Track clinic performance and analyze visits, appointments, patients,
            and queue efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}
