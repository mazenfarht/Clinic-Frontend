"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { useDate } from "@/src/context/DateContext";
import NowServingCard from "../../components/Queue/NowServingCard";
import QueueTable from "../../components/Queue/QueueTable";

export default function Queue() {
  const { date, setDate } = useDate();

  const { queue, fullQueue, loading } = useQueue(date);

  if (loading) {
    return (
      <div className="bg-[#F8FAFB] p-6">
        <p className="text-[#6B7A92]">Loading queue...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFB] p-6 space-y-6">
      <NowServingCard queue={queue} date={date} setDate={setDate} />

      <QueueTable patients={fullQueue} />
    </div>
  );
}
