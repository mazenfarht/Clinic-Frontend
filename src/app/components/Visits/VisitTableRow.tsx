// src/modules/visits/components/VisitTableRow.tsx

"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
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

export default function VisitTableRow({
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

  const startedAt = visit.startedAt
    ? new Date(visit.startedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const completedAt = visit.completedAt
    ? new Date(visit.completedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <tr className="border-b border-[#F0F3F7] hover:bg-[#EBF3FF] transition">
      {/* Patient */}
      <td className="p-3">
        <div>
          <p className="font-medium text-[#1A2B45]">{visit.patient.fullName}</p>
          <p className="text-xs text-[#6B7A92] mt-1">{visit.patient.phone}</p>
        </div>
      </td>

      {/* MRN */}
      <td className="p-3">
        <span className="font-mono font-bold text-[#1A2B45]">
          {visit.patient.mrn}
        </span>
      </td>

      {/* Visit Date */}
      <td className="p-3 text-sm text-[#344054]">{visitDate}</td>

      {/* Chief Complaint */}
      <td className="p-3">
        <p className="text-sm text-[#344054] max-w-[200px] truncate">
          {visit.chiefComplaint || "—"}
        </p>
      </td>

      {/* Diagnosis */}
      <td className="p-3">
        <p className="text-sm text-[#344054] max-w-[200px] truncate">
          {visit.diagnosis || "—"}
        </p>
      </td>

      {/* Status */}
      <td className="p-3">
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${visitStatusStyles(
            visit
          )}`}
        >
          {visitStatusLabel(visit)}
        </span>
      </td>

      {/* Started */}
      <td className="p-3 text-sm text-[#344054]">{startedAt}</td>

      {/* Completed */}
      <td className="p-3 text-sm text-[#344054]">{completedAt}</td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex items-center gap-1">
          {/* View */}
          <button
            type="button"
            onClick={() => onView(visit)}
            className="p-2 rounded-lg text-[#1A6BCC] hover:bg-[#EBF3FF] transition"
            title="View visit"
          >
            <Eye size={17} />
          </button>

          {/* Edit */}
          {canEdit && onEdit && (
            <button
              type="button"
              onClick={() => onEdit(visit)}
              className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition"
              title="Edit visit"
            >
              <Pencil size={17} />
            </button>
          )}

          {/* Delete */}
          {canDelete && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(visit)}
              className="p-2 rounded-lg text-[#D92D20] hover:bg-[#FEF3F2] transition"
              title="Delete visit"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
