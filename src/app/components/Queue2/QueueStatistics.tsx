"use client";

import { useQueueStatistics } from "../../../hooks/useQueueStatistics";

function formatMinutes(minutes: number | null): string {
  if (minutes === null) return "—";
  if (minutes < 1) return "< 1 min";
  return `${Math.round(minutes)} min`;
}

export default function QueueStatistics() {
  const { data, isLoading } = useQueueStatistics();

  const stats = [
    { label: "Total", value: data?.total ?? "—", color: "text-gray-700" },
    { label: "Waiting", value: data?.waiting ?? "—", color: "text-amber-600" },
    {
      label: "In Progress",
      value: data?.inProgress ?? "—",
      color: "text-blue-600",
    },
    { label: "Served", value: data?.served ?? "—", color: "text-green-600" },
    {
      label: "Cancelled",
      value: data?.cancelled ?? "—",
      color: "text-gray-400",
    },
    {
      label: "Avg Wait",
      value: isLoading
        ? "—"
        : formatMinutes(data?.averageWaitTimeMinutes ?? null),
      color: "text-purple-600",
    },
    {
      label: "Avg Serve",
      value: isLoading
        ? "—"
        : formatMinutes(data?.averageServeTimeMinutes ?? null),
      color: "text-indigo-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="h-32 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Today's Statistics
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className={`text-xl font-bold ${s.color}`}>{String(s.value)}</p>
            <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
