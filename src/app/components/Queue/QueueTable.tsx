"use client";

import QueueRow from "./QueueRow";

type Props = {
  patients: any[];
  refetch: () => void;
};

export default function QueueTable({ patients, refetch }: Props) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[#E2E8EF]">
        <h3 className="text-lg font-semibold text-[#1A2B45]">Queue List</h3>
      </div>

      {patients.length === 0 ? (
        <div className="text-center text-[#6B7A92] py-8">
          No patients in queue
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFB] text-xs text-[#6B7A92] uppercase">
            <tr>
              <th className="p-3">Number</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <QueueRow key={patient.id} patient={patient} refetch={refetch} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
