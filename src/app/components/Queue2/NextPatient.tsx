"use client";

import { useQueueStatus } from "../../../hooks/useQueueStatus";
import { useCallNext, useStartEntry } from "../../../hooks/useQueue";

function formatTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function waitMinutes(checkedInAt: string | null): string {
  if (!checkedInAt) return "—";
  const diff = Math.floor(
    (Date.now() - new Date(checkedInAt).getTime()) / 60000
  );
  return diff < 1 ? "< 1 min" : `${diff} min`;
}

export default function NextPatient() {
  const { data, isLoading } = useQueueStatus();
  const callNext = useCallNext();
  const start = useStartEntry();

  const entry = data?.nextWaiting;
  const isBusy = callNext.isPending || start.isPending;

  if (isLoading) {
    return (
      <div className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Next Patient
        </h2>
        {entry && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            #{entry.queueNumber}
          </span>
        )}
      </div>

      {!entry ? (
        <p className="text-sm text-amber-400">No patients waiting.</p>
      ) : (
        <>
          {/* Patient info */}
          <div className="mb-4 space-y-1">
            {entry.visit ? (
              <>
                <p className="text-base font-semibold text-gray-900">
                  {entry.visit.patient.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  MRN: {entry.visit.patient.mrn}
                </p>
                <p className="text-xs text-gray-500">
                  {entry.visit.patient.phone}
                </p>
                {entry.visit.chiefComplaint && (
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Chief complaint:</span>{" "}
                    {entry.visit.chiefComplaint}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-500 italic">Reserved slot</p>
            )}
          </div>

          {/* Timestamps */}
          <div className="mb-4 flex gap-4 text-xs text-gray-500">
            <span>
              Checked in:{" "}
              <span className="font-medium text-gray-700">
                {formatTime(entry.checkedInAt)}
              </span>
            </span>
            <span>
              Waiting:{" "}
              <span className="font-medium text-gray-700">
                {waitMinutes(entry.checkedInAt)}
              </span>
            </span>
          </div>

          {/* Status badge */}
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
              Waiting
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => callNext.mutate()}
              disabled={isBusy}
              className="rounded-md border border-amber-300 bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-200 transition-colors disabled:opacity-50"
            >
              📢 Call Next
            </button>
            <button
              onClick={() => start.mutate(entry.id)}
              disabled={isBusy}
              className="rounded-md border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              ▶ Start Consultation
            </button>
          </div>
        </>
      )}
    </div>
  );
}
