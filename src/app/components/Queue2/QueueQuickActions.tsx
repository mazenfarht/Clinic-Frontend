"use client";

import { useQueueStatus } from "../../../hooks/useQueueStatus";
import {
  useCallNext,
  useServeEntry,
  useSkipEntry,
  useRecallEntry,
  useCancelEntry,
  useStartEntry,
} from "../../../hooks/useQueue";

interface QueueQuickActionsProps {
  onCheckIn: () => void;
  onReserve: () => void;
}

export default function QueueQuickActions({
  onCheckIn,
  onReserve,
}: QueueQuickActionsProps) {
  const { data } = useQueueStatus();

  const callNext = useCallNext();
  const serve = useServeEntry();
  const skip = useSkipEntry();
  const recall = useRecallEntry();
  const cancel = useCancelEntry();
  const start = useStartEntry();

  const serving = data?.currentlyServing;
  const next = data?.nextWaiting;

  const isBusy =
    callNext.isPending ||
    serve.isPending ||
    skip.isPending ||
    recall.isPending ||
    cancel.isPending ||
    start.isPending;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Quick Actions
      </h2>

      <div className="space-y-2">
        {/* Always available */}
        <QuickBtn
          label="+ Check In Patient"
          onClick={onCheckIn}
          disabled={false}
          variant="primary"
        />
        <QuickBtn
          label="⊞ Reserve Slot"
          onClick={onReserve}
          disabled={false}
          variant="secondary"
        />

        <hr className="my-2 border-gray-100" />

        {/* Call next — enabled when there's a next waiting patient */}
        <QuickBtn
          label="📢 Call Next"
          onClick={() => callNext.mutate()}
          disabled={isBusy || !next}
          variant="amber"
        />

        {/* Actions on currently serving */}
        <QuickBtn
          label="▶ Start Consultation"
          onClick={() => serving && start.mutate(serving.id)}
          disabled={isBusy || !serving}
          variant="blue"
        />
        <QuickBtn
          label="✓ Serve"
          onClick={() => serving && serve.mutate(serving.id)}
          disabled={isBusy || !serving}
          variant="green"
        />
        <QuickBtn
          label="↩ Recall"
          onClick={() => serving && recall.mutate(serving.id)}
          disabled={isBusy || !serving}
          variant="gray"
        />
        <QuickBtn
          label="⤭ Skip"
          onClick={() => serving && skip.mutate(serving.id)}
          disabled={isBusy || !serving}
          variant="gray"
        />
        <QuickBtn
          label="✕ Cancel"
          onClick={() => serving && cancel.mutate(serving.id)}
          disabled={isBusy || !serving}
          variant="red"
        />
      </div>
    </div>
  );
}

const VARIANTS = {
  primary: "bg-gray-900 text-white hover:bg-gray-700 border-transparent",
  secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
  amber: "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100",
  blue: "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100",
  green: "bg-green-50 text-green-700 border-green-300 hover:bg-green-100",
  red: "bg-red-50 text-red-700 border-red-300 hover:bg-red-100",
  gray: "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100",
};

function QuickBtn({
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
      className={`w-full rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]}`}
    >
      {label}
    </button>
  );
}
