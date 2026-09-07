"use client";

import { useQueueStatus } from "../../../hooks/useQueueStatus";

export default function QueueSummary() {
  const { data, isLoading } = useQueueStatus();

  const currentlyServing = data?.currentlyServing;
  const nextWaiting = data?.nextWaiting;

  const cards = [
    {
      label: "Currently Serving",
      value: currentlyServing
        ? `#${currentlyServing.queueNumber} — ${
            currentlyServing.visit?.patient.fullName ?? "Reserved"
          }`
        : "—",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Next Patient",
      value: nextWaiting
        ? `#${nextWaiting.queueNumber} — ${
            nextWaiting.visit?.patient.fullName ?? "Reserved"
          }`
        : "—",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Waiting",
      value: data?.waitingCount ?? "—",
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      label: "Served Today",
      value: data?.servedCount ?? "—",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-gray-200 bg-gray-50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border ${card.border} ${card.bg} px-5 py-4`}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {card.label}
          </p>
          <p className={`mt-1.5 text-lg font-semibold ${card.color} truncate`}>
            {String(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
