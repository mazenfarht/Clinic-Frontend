"use client";

import type { QueueEntry, QueueStatus } from "../../../types/queue";
import {
  useServeEntry,
  useSkipEntry,
  useRecallEntry,
  useCancelEntry,
  useStartEntry,
} from "../../../hooks/useQueue";

interface QueueRowProps {
  entry: QueueEntry;
}

const STATUS_STYLES: Record<QueueStatus, string> = {
  WAITING: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  SERVED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

const STATUS_LABELS: Record<QueueStatus, string> = {
  WAITING: "Waiting",
  IN_PROGRESS: "In Progress",
  SERVED: "Served",
  CANCELLED: "Cancelled",
};

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

export default function QueueRow({ entry }: QueueRowProps) {
  const serve = useServeEntry();
  const skip = useSkipEntry();
  const recall = useRecallEntry();
  const cancel = useCancelEntry();
  const start = useStartEntry();

  const isBusy =
    serve.isPending ||
    skip.isPending ||
    recall.isPending ||
    cancel.isPending ||
    start.isPending;

  const patient = entry.visit?.patient ?? null;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Queue # */}
      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
        {entry.queueNumber}
        {entry.isReserved && (
          <span className="ml-1 text-xs font-normal text-gray-400">
            (reserved)
          </span>
        )}
      </td>

      {/* Patient */}
      <td className="px-4 py-3">
        {patient ? (
          <>
            <p className="text-sm font-medium text-gray-900">
              {patient.fullName}
            </p>
            <p className="text-xs text-gray-500">{patient.mrn}</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-900">
              {entry.reservedFor ?? "—"}
            </p>
            <p className="text-xs text-gray-400 italic">Reserved slot</p>
          </>
        )}
      </td>

      {/* Phone */}
      <td className="px-4 py-3 text-sm text-gray-600">
        {patient?.phone ?? "—"}
      </td>

      {/* Check-in */}
      <td className="px-4 py-3 text-sm text-gray-600">
        {formatTime(entry.checkedInAt)}
      </td>

      {/* Wait */}
      <td className="px-4 py-3 text-sm text-gray-600">
        {entry.status === "WAITING" ? waitMinutes(entry.checkedInAt) : "—"}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
            STATUS_STYLES[entry.status]
          }`}
        >
          {STATUS_LABELS[entry.status]}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          {entry.status === "WAITING" && (
            <>
              <ActionButton
                label="Recall"
                onClick={() => recall.mutate(entry.id)}
                disabled={isBusy}
                variant="blue"
              />
              <ActionButton
                label="Cancel"
                onClick={() => cancel.mutate(entry.id)}
                disabled={isBusy}
                variant="red"
              />
            </>
          )}
          {entry.status === "IN_PROGRESS" && (
            <>
              <ActionButton
                label="Start"
                onClick={() => start.mutate(entry.id)}
                disabled={isBusy}
                variant="blue"
              />
              <ActionButton
                label="Serve"
                onClick={() => serve.mutate(entry.id)}
                disabled={isBusy}
                variant="green"
              />
              <ActionButton
                label="Skip"
                onClick={() => skip.mutate(entry.id)}
                disabled={isBusy}
                variant="gray"
              />
              <ActionButton
                label="Cancel"
                onClick={() => cancel.mutate(entry.id)}
                disabled={isBusy}
                variant="red"
              />
            </>
          )}
          {entry.status === "SERVED" && (
            <span className="text-xs text-gray-400">Completed</span>
          )}
          {entry.status === "CANCELLED" && (
            <span className="text-xs text-gray-400">Cancelled</span>
          )}
        </div>
      </td>
    </tr>
  );
}

const VARIANT_STYLES = {
  blue: "border-blue-200 text-blue-600 hover:bg-blue-50",
  green: "border-green-200 text-green-600 hover:bg-green-50",
  red: "border-red-200 text-red-600 hover:bg-red-50",
  gray: "border-gray-200 text-gray-600 hover:bg-gray-50",
};

function ActionButton({
  label,
  onClick,
  disabled,
  variant,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  variant: keyof typeof VARIANT_STYLES;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded border px-2 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${VARIANT_STYLES[variant]}`}
    >
      {label}
    </button>
  );
}
