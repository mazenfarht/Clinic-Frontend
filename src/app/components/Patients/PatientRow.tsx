"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Patient } from "@/src/types/patient";

type Props = {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onView?: (patient: Patient) => void;
};

export default function PatientRow({
  patient,
  onEdit,
  onDelete,
  onView,
}: Props) {
  const formattedDate = patient.dateOfBirth
    ? new Date(patient.dateOfBirth).toLocaleDateString("en-GB")
    : "—";

  const genderLabel = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
  }[patient.gender];

  const isDeleted = Boolean(patient.deletedAt);

  return (
    <tr className="border-b border-[#F0F3F7] hover:bg-[#EBF3FF] transition">
      {/* MRN */}
      <td className="p-3">
        <span className="font-mono font-bold text-[#1A2B45]">
          {patient.mrn}
        </span>
      </td>

      {/* Patient */}
      <td className="p-3">
        <div>
          <p className="font-medium text-[#1A2B45]">{patient.fullName}</p>

          <p className="text-xs text-[#6B7A92] mt-1">{patient.phone}</p>
        </div>
      </td>

      {/* Date of Birth */}
      <td className="p-3 text-sm text-[#344054]">{formattedDate}</td>

      {/* Gender */}
      <td className="p-3">
        <span className="text-sm text-[#344054]">{genderLabel}</span>
      </td>

      {/* Status */}
      <td className="p-3">
        {isDeleted ? (
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-[#FEF3F2] text-[#D92D20]">
            Deleted
          </span>
        ) : (
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
            Active
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex items-center gap-1">
          {/* View */}
          {onView && (
            <button
              type="button"
              onClick={() => onView(patient)}
              className="p-2 rounded-lg text-[#1A6BCC] hover:bg-[#EBF3FF] transition"
              title="View patient"
            >
              <Eye size={17} />
            </button>
          )}

          {/* Edit */}
          {!isDeleted && (
            <button
              type="button"
              onClick={() => onEdit(patient)}
              className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition"
              title="Edit patient"
            >
              <Pencil size={17} />
            </button>
          )}

          {/* Delete */}
          {!isDeleted && (
            <button
              type="button"
              onClick={() => onDelete(patient)}
              className="p-2 rounded-lg text-[#D92D20] hover:bg-[#FEF3F2] transition"
              title="Delete patient"
            >
              <Trash2 size={17} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
