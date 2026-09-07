"use client";

import { useQueryClient } from "@tanstack/react-query";
import { QUEUE_KEY } from "../../../hooks/useQueue";

interface QueueHeaderProps {
  onReset: () => void;
}

export default function QueueHeader({ onReset }: QueueHeaderProps) {
  const qc = useQueryClient();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handleRefresh() {
    qc.invalidateQueries({ queryKey: [QUEUE_KEY] });
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Queue</h1>
        <p className="mt-0.5 text-sm text-gray-500">{today}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshIcon />
          Refresh
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors"
        >
          <ResetIcon />
          Reset Queue
        </button>
      </div>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}
