"use client";

import { useState } from "react";
import { useQueue } from "../../../hooks/useQueue";
import QueueRow from "./QueueRow";
import type { QueueStatus } from "../../../types/queue";

const STATUS_OPTIONS: { label: string; value: QueueStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Waiting", value: "WAITING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Served", value: "SERVED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const PAGE_SIZE = 20;

export default function QueueList() {
  const [statusFilter, setStatusFilter] = useState<QueueStatus | "">("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQueue({
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(dateFilter ? { date: dateFilter } : {}),
    page,
    limit: PAGE_SIZE,
  });

  const meta = data?.meta;

  function handleStatusChange(value: QueueStatus | "") {
    setStatusFilter(value);
    setPage(1);
  }

  function handleDateChange(value: string) {
    setDateFilter(value);
    setPage(1);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 px-4 py-3">
        <div className="flex gap-1">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleStatusChange(opt.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === opt.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => handleDateChange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left">
              {[
                "Num",
                "Patient",
                "Phone",
                "Check-in",
                "Wait",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  <LoadingSpinner />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-red-500"
                >
                  Failed to load queue. Please refresh.
                </td>
              </tr>
            )}

            {!isLoading && !isError && data?.data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-gray-400"
                >
                  No queue entries found.
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              data?.data.map((entry) => (
                <QueueRow key={entry.id} entry={entry} />
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-500">
            Page {meta.page} of {meta.totalPages} · {meta.total} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!meta.hasPrevPage}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={!meta.hasNextPage}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <svg
        className="h-6 w-6 animate-spin text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  );
}
