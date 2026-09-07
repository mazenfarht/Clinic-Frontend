// src/app/admin/visits/[id]/page.tsx

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import {
  VisitDetails,
  EditVisitModal,
  DeleteVisitDialog,
  useVisit,
  useDeleteVisit,
} from "../../../components/Visits";
import { Visit } from "../../../../types/visit";

export default function VisitPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // -----------------------------
  // Data
  // -----------------------------

  const { data, isLoading, isError } = useVisit(id);
  const visit = data?.data ?? null;

  // -----------------------------
  // Delete
  // -----------------------------

  const { mutate: deleteVisit, isPending: isDeleting } = useDeleteVisit();

  const handleConfirmDelete = (visit: Visit) => {
    deleteVisit(visit.id, {
      onSuccess: () => {
        router.push("/admin/visits");
      },
    });
  };

  // -----------------------------
  // Role
  // -----------------------------

  const userRole =
    typeof window !== "undefined"
      ? (() => {
          try {
            const raw = localStorage.getItem("clinic_user");
            return raw ? JSON.parse(raw)?.role : null;
          } catch {
            return null;
          }
        })()
      : null;

  const isDoctor = userRole === "DOCTOR";

  // -----------------------------
  // Loading
  // -----------------------------

  if (isLoading) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <div className="flex items-center justify-center py-20">
          <p className="text-[#6B7A92]">Loading visit...</p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Error / Not Found
  // -----------------------------

  if (isError || !visit) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-[#6B7A92] hover:text-[#1A6BCC] transition mb-4"
        >
          <ArrowLeft size={17} />
          Back to Visits
        </button>

        <div className="bg-white border border-[#E2E8EF] rounded-xl p-8 text-center">
          <p className="text-[#D92D20] font-medium">Visit not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#6B7A92] hover:text-[#1A6BCC] transition mb-3"
          >
            <ArrowLeft size={17} />
            Back to Visits
          </button>

          <h1 className="text-2xl font-bold text-[#1A2B45]">Visit Details</h1>

          <p className="text-sm text-[#6B7A92] mt-1">
            View complete information for this visit record.
          </p>
        </div>

        {/* Doctor actions */}
        {isDoctor && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A6BCC] text-white text-sm font-medium hover:bg-[#155AB5] transition shadow-sm"
            >
              <Pencil size={17} />
              Edit Visit
            </button>

            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#D0D5DD] text-[#D92D20] text-sm font-medium hover:bg-[#FEF3F2] transition shadow-sm"
            >
              <Trash2 size={17} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Visit Details */}
      <VisitDetails visit={visit} />

      {/* Edit Modal */}
      {isDoctor && (
        <EditVisitModal
          visit={visit}
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSuccess={() => setEditOpen(false)}
        />
      )}

      {/* Delete Dialog */}
      {isDoctor && (
        <DeleteVisitDialog
          visit={deleteOpen ? visit : null}
          open={deleteOpen}
          loading={isDeleting}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
