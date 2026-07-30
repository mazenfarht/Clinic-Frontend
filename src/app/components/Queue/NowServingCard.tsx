"use client";

import { nextPatient } from "@/src/services/queue";
import DatePicker from "./DatePicker";

type Props = {
  queue: any;
  date: string;
  setDate: (date: string) => void;
  refetch: () => void;
};

export default function NowServingCard({
  queue,
  date,
  setDate,
  refetch,
}: Props) {
  const handleNextPatient = async () => {
    await nextPatient(date);
    refetch();
  };

  return (
    <div className="relative bg-[#EBF3FF] border-l-4 border-[#1A6BCC] rounded-xl p-6 shadow-sm">
      {/* Date */}
      <div className="absolute top-4 right-4">
        <DatePicker date={date} setDate={setDate} />
      </div>

      {/* Content */}
      <div>
        <p className="text-xs text-[#6B7A92] uppercase tracking-widest">
          Now Serving
        </p>

        <h2 className="text-6xl font-bold text-[#1A6BCC] font-mono mt-2">
          {queue.currentPatient?.queueNumber || "---"}
        </h2>

        <p className="text-xl font-semibold text-[#1A2B45] mt-1">
          {queue.currentPatient?.name || "No Current Patient"}
        </p>

        <button
          onClick={handleNextPatient}
          disabled={queue.waiting.length === 0}
          className="mt-5 bg-[#1A6BCC] hover:bg-[#155AB5] disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition shadow-sm"
        >
          Call Next Patient →
        </button>
      </div>
    </div>
  );
}
