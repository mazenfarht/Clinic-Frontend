// src/modules/visits/components/EditVisitModal.tsx

"use client";

import { useUpdateVisit } from "../../../hooks/visits/useUpdateVisit";
import { UpdateVisitPayload, Visit } from "../../../types/visit";
import VisitForm from "./VisitForm";

type Props = {
  visit: Visit | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function EditVisitModal({
  visit,
  open,
  onClose,
  onSuccess,
}: Props) {
  const { mutate, isPending, error } = useUpdateVisit(visit?.id ?? "");

  if (!open || !visit) return null;

  const handleSubmit = (data: UpdateVisitPayload) => {
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
      return message ?? "Invalid data. Please check the form.";
    if (status === 401) return "You are not authorized. Please log in again.";
    if (status === 403) return "You do not have permission to edit visits.";
    if (status === 404) return message ?? "Visit not found.";

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
        mode="edit"
        visit={visit}
        onSubmit={handleSubmit}
        onClose={onClose}
        loading={isPending}
      />
    </>
  );
}
