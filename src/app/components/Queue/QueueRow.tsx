"use client";

import { checkInPatient } from "@/src/services/queue";
import QueueStatus from "./QueueStatus";

type Props = {
  patient: any;
  refetch: () => void;
};

export default function QueueRow({ patient, refetch }: Props) {
  const handleCheckIn = async () => {
    await checkInPatient(patient.id);
    refetch();
  };

  return (
    <tr className="border-b border-[#F0F3F7] hover:bg-[#EBF3FF] transition">
      <td className="p-3 font-mono font-bold text-[#1A2B45]">
        {patient.queueNumber}
      </td>

      <td className="p-3 font-medium text-[#1A2B45]">{patient.name}</td>

      <td className="p-3">
        <QueueStatus status={patient.status} />
      </td>

      <td className="p-3">
        {patient.status === "scheduled" && (
          <button
            onClick={handleCheckIn}
            className="bg-[#12B76A] text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition"
          >
            Check In
          </button>
        )}

        {patient.status === "waiting" && (
          <span className="text-[#1A6BCC] text-sm font-medium">Waiting</span>
        )}

        {patient.status === "current" && (
          <span className="text-[#6366F1] text-sm font-medium">
            In Progress
          </span>
        )}

        {patient.status === "done" && (
          <span className="text-[#12B76A] text-sm font-medium">Completed</span>
        )}
      </td>
    </tr>
  );
}
