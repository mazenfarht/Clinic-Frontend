// src/app/admin/visits/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Visit, VisitFilters } from "../../../types/visit";
import {
  VisitsHeader,
  VisitsFilters,
  VisitsTable,
  VisitCard,
  VisitStats,
  VisitPagination,
  CreateVisitModal,
  EditVisitModal,
  DeleteVisitDialog,
  useVisits,
  useDeleteVisit,
} from "../../components/Visits";

const DEFAULT_FILTERS: VisitFilters = {
  page: 1,
  limit: 10,
};

export default function VisitsPage() {
  const router = useRouter();

  // -----------------------------
  // Filters
  // -----------------------------

  const [filters, setFilters] = useState<VisitFilters>(DEFAULT_FILTERS);

  // -----------------------------
  // Modal state
  // -----------------------------

  const [createOpen, setCreateOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [deletingVisit, setDeletingVisit] = useState<Visit | null>(null);

  // -----------------------------
  // Data
  // -----------------------------

  const { data, isLoading, isError, refetch } = useVisits(filters);

  const visits = data?.data ?? [];
  const meta = data?.meta;

  // -----------------------------
  // Delete
  // -----------------------------

  const { mutate: deleteVisit, isPending: isDeleting } = useDeleteVisit();

  const handleConfirmDelete = (visit: Visit) => {
    deleteVisit(visit.id, {
      onSuccess: () => {
        setDeletingVisit(null);
      },
    });
  };

  // -----------------------------
  // Handlers
  // -----------------------------

  const handleFiltersChange = (newFilters: VisitFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleView = (visit: Visit) => {
    router.push(`/admin/visits/${visit.id}`);
  };

  const handleEdit = (visit: Visit) => {
    setEditingVisit(visit);
  };

  const handleDelete = (visit: Visit) => {
    setDeletingVisit(visit);
  };

  // Role — reads from localStorage to match the existing project pattern.
  // The backend remains the source of truth; this only controls UI visibility.
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
          <p className="text-[#6B7A92]">Loading visits...</p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (isError) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <div className="bg-white border border-[#E2E8EF] rounded-xl p-8 text-center">
          <p className="text-[#D92D20] font-medium">Failed to load visits.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
      {/* Header */}
      <VisitsHeader
        canCreate={isDoctor}
        onCreateClick={() => setCreateOpen(true)}
      />

      {/* Stats */}
      {meta && visits.length > 0 && <VisitStats visits={visits} meta={meta} />}

      {/* Filters */}
      <VisitsFilters
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      {/* Table — desktop */}
      <div className="hidden md:block">
        <VisitsTable
          visits={visits}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={isDoctor}
          canDelete={isDoctor}
        />
      </div>

      {/* Cards — mobile */}
      <div className="md:hidden space-y-4">
        {visits.length === 0 ? (
          <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm py-12 text-center">
            <p className="text-[#6B7A92]">No visits found.</p>
          </div>
        ) : (
          visits.map((visit) => (
            <VisitCard
              key={visit.id}
              visit={visit}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={isDoctor}
              canDelete={isDoctor}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <VisitPagination meta={meta} onPageChange={handlePageChange} />
      )}

      {/* Create Modal */}
      <CreateVisitModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => setCreateOpen(false)}
      />

      {/* Edit Modal */}
      <EditVisitModal
        visit={editingVisit}
        open={!!editingVisit}
        onClose={() => setEditingVisit(null)}
        onSuccess={() => setEditingVisit(null)}
      />

      {/* Delete Dialog */}
      <DeleteVisitDialog
        visit={deletingVisit}
        open={!!deletingVisit}
        loading={isDeleting}
        onClose={() => setDeletingVisit(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
