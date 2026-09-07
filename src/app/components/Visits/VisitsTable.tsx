// src/modules/visits/components/VisitsTable.tsx

"use client";

import { Visit } from "../../../types/visit";
import VisitTableRow from "./VisitTableRow";

type Props = {
  visits: Visit[];
  onView: (visit: Visit) => void;
  onEdit?: (visit: Visit) => void;
  onDelete?: (visit: Visit) => void;
  canEdit: boolean;
  canDelete: boolean;
};

export default function VisitsTable({
  visits,
  onView,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}: Props) {
  if (visits.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm py-12 text-center">
        <p className="text-[#6B7A92]">No visits found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFB] border-b border-[#E2E8EF]">
            <tr className="text-xs text-[#6B7A92] uppercase">
              <th className="p-3">Patient</th>
              <th className="p-3">MRN</th>
              <th className="p-3">Visit Date</th>
              <th className="p-3">Chief Complaint</th>
              <th className="p-3">Diagnosis</th>
              <th className="p-3">Status</th>
              <th className="p-3">Started</th>
              <th className="p-3">Completed</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visits.map((visit) => (
              <VisitTableRow
                key={visit.id}
                visit={visit}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                canEdit={canEdit}
                canDelete={canDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
