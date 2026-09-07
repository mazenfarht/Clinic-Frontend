// src/modules/visits/components/VisitCard.tsx

"use client";

import { Calendar, Eye, Hash, Pencil, Trash2, User } from "lucide-react";
import { Visit } from "../../../types/visit";

type Props = {
  visit: Visit;
  onView: (visit: Visit) => void;
  onEdit?: (visit: Visit) => void;
  onDelete?: (visit: Visit) => void;
  canEdit: boolean;
  canDelete: boolean;
};

const visitStatusStyles = (visit: Visit): string => {
  if (visit.completedAt) return "bg-[#ECFDF3] text-[#027A48]";
  if (visit.startedAt) return "bg-[#EBF3FF] text-[#1A6BCC]";
  return "bg-[#FFF7E6] text-[#B54708]";
};

const visitStatusLabel = (visit: Visit): string => {
  if (visit.completedAt) return "Completed";
  if (visit.startedAt) return "In Progress";
  return "Pending";
};

export default function VisitCard({
  visit,
  onView,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}: Props) {
  const visitDate = visit.visitDate
    ? new Date(visit.visitDate).toLocaleDateString("en-GB")
    : "—";

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm p-4 space-y-3">
      {/* Top row: patient name + status */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-[#1A2B45]">
            {visit.patient.fullName}
          </p>
          <p className="text-xs text-[#6B7A92] mt-0.5">{visit.patient.phone}</p>
        </div>

        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${visitStatusStyles(
            visit
          )}`}
        >
          {visitStatusLabel(visit)}
        </span>
      </div>

      {/* Info rows */}
      <div className="space-y-2">
        {/* MRN */}
        <div className="flex items-center gap-2 text-sm text-[#344054]">
          <Hash size={15} className="text-[#1A6BCC] shrink-0" />
          <span className="font-mono font-bold">{visit.patient.mrn}</span>
        </div>

        {/* Visit Date */}
        <div className="flex items-center gap-2 text-sm text-[#344054]">
          <Calendar size={15} className="text-[#1A6BCC] shrink-0" />
          <span>{visitDate}</span>
        </div>

        {/* Created By */}
        <div className="flex items-center gap-2 text-sm text-[#344054]">
          <User size={15} className="text-[#1A6BCC] shrink-0" />
          <span>{visit.createdBy.fullName}</span>
        </div>
      </div>

      {/* Chief Complaint */}
      {visit.chiefComplaint && (
        <div className="pt-1 border-t border-[#F0F3F7]">
          <p className="text-xs text-[#6B7A92]">Chief Complaint</p>
          <p className="text-sm text-[#344054] mt-0.5 line-clamp-2">
            {visit.chiefComplaint}
          </p>
        </div>
      )}

      {/* Diagnosis */}
      {visit.diagnosis && (
        <div>
          <p className="text-xs text-[#6B7A92]">Diagnosis</p>
          <p className="text-sm text-[#344054] mt-0.5 line-clamp-2">
            {visit.diagnosis}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#F0F3F7]">
        <button
          type="button"
          onClick={() => onView(visit)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm text-[#1A6BCC] bg-[#EBF3FF] hover:bg-[#D6E9FF] transition"
        >
          <Eye size={15} />
          View
        </button>

        {canEdit && onEdit && (
          <button
            type="button"
            onClick={() => onEdit(visit)}
            className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition"
            title="Edit visit"
          >
            <Pencil size={16} />
          </button>
        )}

        {canDelete && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(visit)}
            className="p-2 rounded-lg text-[#D92D20] hover:bg-[#FEF3F2] transition"
            title="Delete visit"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
