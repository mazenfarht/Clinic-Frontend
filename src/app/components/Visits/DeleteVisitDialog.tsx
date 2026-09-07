// src/modules/visits/components/DeleteVisitDialog.tsx

"use client";

import { AlertTriangle, X } from "lucide-react";
import { Visit } from "../../../types/visit";

type Props = {
  visit: Visit | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: (visit: Visit) => void;
};

export default function DeleteVisitDialog({
  visit,
  open,
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  if (!open || !visit) return null;

  const visitDate = visit.visitDate
    ? new Date(visit.visitDate).toLocaleDateString("en-GB")
    : "—";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8EF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF3F2] text-[#D92D20] flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>

            <h2 className="text-lg font-semibold text-[#1A2B45]">
              Delete Visit
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm leading-6 text-[#6B7A92]">
            Are you sure you want to delete the visit for{" "}
            <span className="font-semibold text-[#1A2B45]">
              {visit.patient.fullName}
            </span>{" "}
            on <span className="font-semibold text-[#1A2B45]">{visitDate}</span>
            ?
          </p>

          <div className="p-3 rounded-lg bg-[#FEF3F2] border border-[#FECACA]">
            <p className="text-xs leading-5 text-[#B42318]">
              This action cannot be undone. Any linked appointment or queue
              entry will be automatically unlinked.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-[#F8FAFB] border-t border-[#E2E8EF]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 rounded-lg border border-[#D0D5DD] text-[#344054] hover:bg-white transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(visit)}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-[#D92D20] text-white hover:bg-[#B42318] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete Visit"}
          </button>
        </div>
      </div>
    </div>
  );
}
