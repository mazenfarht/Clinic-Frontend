// src/modules/visits/components/CreateVisitModal.tsx

"use client";

import { useCreateVisit } from "../../../hooks/visits/useCreateVisit";
import { CreateVisitPayload } from "../../../types/visit";
import VisitForm from "./VisitForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function CreateVisitModal({ open, onClose, onSuccess }: Props) {
  const { mutate, isPending, error } = useCreateVisit();

  if (!open) return null;

  const handleSubmit = (data: CreateVisitPayload) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      },
    });
  };

  const getErrorMessage = (error: unknown): string => {
    if (!error) return "";

    const err = error as {
      response?: { status?: number; data?: { message?: string } };
    };

    const status = err?.response?.status;
    const message = err?.response?.data?.message;

    if (status === 400)
      return message ?? "Invalid visit data. Please check the form.";
    if (status === 401) return "You are not authorized. Please log in again.";
    if (status === 403) return "You do not have permission to create visits.";
    if (status === 404)
      return message ?? "Patient, appointment, or queue entry not found.";
    if (status === 409)
      return (
        message ??
        "A visit already exists for this patient today, or the appointment/queue entry is already linked."
      );

    return message ?? "Something went wrong. Please try again.";
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 z-[60] max-w-sm w-full bg-[#FEF3F2] border border-[#FECACA] rounded-xl shadow-lg px-4 py-3">
          <p className="text-sm text-[#B42318] font-medium">
            {getErrorMessage(error)}
          </p>
        </div>
      )}

      <VisitForm
        mode="create"
        onSubmit={handleSubmit}
        onClose={onClose}
        loading={isPending}
      />
    </>
  );
}
