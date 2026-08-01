"use client";

import PatientRow from "./PatientRow";
import { Patient } from "@/src/types/patient";

type Props = {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onView?: (patient: Patient) => void;
};

export default function PatientTable({
  patients,
  onEdit,
  onDelete,
  onView,
}: Props) {
  if (patients.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm py-12 text-center">
        <p className="text-[#6B7A92]">No patients found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFB] border-b border-[#E2E8EF]">
            <tr className="text-xs text-[#6B7A92] uppercase">
              <th className="p-3">MRN</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Date of Birth</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
