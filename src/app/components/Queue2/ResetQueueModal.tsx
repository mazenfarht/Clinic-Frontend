"use client";

import { Modal, Spinner } from "./modal-utils";
import { useResetQueue } from "../../../hooks/useQueue";

interface ResetQueueModalProps {
  onClose: () => void;
}

export default function ResetQueueModal({ onClose }: ResetQueueModalProps) {
  const reset = useResetQueue();

  function handleReset() {
    reset.mutate(undefined, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <Modal onClose={onClose}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">Reset Queue</h2>
      <p className="mt-2 text-sm text-gray-500">
        This will permanently clear all active queue entries for today. Served
        and cancelled records will be preserved. This action cannot be undone.
      </p>

      {reset.isError && (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          Failed to reset the queue. Please try again.
        </p>
      )}

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={reset.isPending}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleReset}
          disabled={reset.isPending}
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {reset.isPending && <Spinner />}
          Reset Queue
        </button>
      </div>
    </Modal>
  );
}
