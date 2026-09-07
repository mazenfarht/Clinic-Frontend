"use client";

import { Modal, Field, inputCls, Spinner } from "./modal-utils";
import { useState } from "react";
import { useReserveQueue } from "../../../hooks/useQueue";
import type { ReserveQueuePayload } from "../../../types/queue";

interface ReserveQueueModalProps {
  onClose: () => void;
}

interface FormState {
  queueNumber: 1 | 2 | 3;
  reservedFor: string;
  notes: string;
}

const INITIAL: FormState = {
  queueNumber: 1,
  reservedFor: "",
  notes: "",
};

export default function ReserveQueueModal({ onClose }: ReserveQueueModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const reserve = useReserveQueue();

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.reservedFor.trim()) next.reservedFor = "This field is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const payload: ReserveQueuePayload = {
      queueNumber: form.queueNumber,
      reservedFor: form.reservedFor.trim(),
      ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
    };

    reserve.mutate(payload, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="mb-1 text-lg font-semibold text-gray-900">
        Reserve Queue Slot
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        Reserve a priority slot in the queue.
      </p>

      <div className="space-y-4">
        {/* Queue number selector */}
        <Field label="Queue Number" required>
          <div className="flex gap-2">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setField("queueNumber", n)}
                className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-semibold transition-colors ${
                  form.queueNumber === n
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Field>

        {/* Reserved for */}
        <Field label="Reserved For" required error={errors.reservedFor}>
          <input
            type="text"
            value={form.reservedFor}
            onChange={(e) => setField("reservedFor", e.target.value)}
            placeholder="e.g. Dr. Smith's patient, VIP"
            className={inputCls(!!errors.reservedFor)}
          />
        </Field>

        {/* Notes */}
        <Field label="Notes" hint="Optional">
          <textarea
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder="Any additional notes…"
            rows={3}
            className={inputCls(false)}
          />
        </Field>
      </div>

      {reserve.isError && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          Failed to reserve slot. Please try again.
        </p>
      )}

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={reserve.isPending}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={reserve.isPending}
          className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {reserve.isPending && <Spinner />}
          Reserve Slot
        </button>
      </div>
    </Modal>
  );
}
