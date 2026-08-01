"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInPatient } from "@/src/services/queue";
import QueueStatus from "./QueueStatus";

type Props = {
  patient: any;
};

export default function QueueRow({ patient }: Props) {
  const queryClient = useQueryClient();

  const checkInMutation = useMutation({
    mutationFn: () => checkInPatient(patient.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queue"],
      });
    },

    onError: (error) => {
      console.error("Check-in error:", error);
    },
  });

  const handleCheckIn = () => {
    checkInMutation.mutate();
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
            disabled={checkInMutation.isPending}
            className="bg-[#12B76A] text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checkInMutation.isPending ? "Checking..." : "Check In"}
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
