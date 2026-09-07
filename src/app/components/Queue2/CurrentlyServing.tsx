"use client";

import { useQueueStatus } from "../../../hooks/useQueueStatus";
import {
  useServeEntry,
  useSkipEntry,
  useRecallEntry,
  useCancelEntry,
} from "../../../hooks/useQueue";

function formatTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CurrentlyServing() {
  const { data, isLoading } = useQueueStatus();
  const serve = useServeEntry();
  const skip = useSkipEntry();
  const recall = useRecallEntry();
  const cancel = useCancelEntry();

  const entry = data?.currentlyServing;
  const isBusy =
    serve.isPending || skip.isPending || recall.isPending || cancel.isPending;

  if (isLoading) {
    return (
      <div className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
    );
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Currently Serving
        </h2>
        {entry && (
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            #{entry.queueNumber}
          </span>
        )}
      </div>

      {!entry ? (
        <p className="text-sm text-blue-400">
          No patient is currently being served.
        </p>
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
              Called at:{" "}
              <span className="font-medium text-gray-700">
                {formatTime(entry.calledAt)}
              </span>
            </span>
            <span>
              Started at:{" "}
              <span className="font-medium text-gray-700">
                {formatTime(entry.startedAt)}
              </span>
            </span>
          </div>

          {/* Status badge */}
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              In Progress
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <ActionBtn
              label="✓ Serve"
              onClick={() => serve.mutate(entry.id)}
              disabled={isBusy}
              variant="green"
            />
            <ActionBtn
              label="↩ Recall"
              onClick={() => recall.mutate(entry.id)}
              disabled={isBusy}
              variant="gray"
            />
            <ActionBtn
              label="⤭ Skip"
              onClick={() => skip.mutate(entry.id)}
              disabled={isBusy}
              variant="amber"
            />
            <ActionBtn
              label="✕ Cancel"
              onClick={() => cancel.mutate(entry.id)}
              disabled={isBusy}
              variant="red"
            />
          </div>
        </>
      )}
    </div>
  );
}

const VARIANTS = {
  green: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100",
  gray: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  amber: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100",
  red: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100",
};

function ActionBtn({
  label,
  onClick,
  disabled,
  variant,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  variant: keyof typeof VARIANTS;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${VARIANTS[variant]}`}
    >
      {label}
    </button>
  );
}
