"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { useDate } from "@/src/context/DateContext";
import NowServingCard from "../../components/Queue/NowServingCard";
import QueueTable from "../../components/Queue/QueueTable";

export default function Queue() {
  const { date, setDate } = useDate();

  const { queue, fullQueue, refetch } = useQueue(date);

  if (!queue) return <p className="p-6 text-[#6B7A92]">No data</p>;

  return (
    <div className="bg-[#F8FAFB] p-6 space-y-6">
      <NowServingCard
        queue={queue}
        date={date}
        setDate={setDate}
        refetch={refetch}
      />

      <QueueTable patients={fullQueue} refetch={refetch} />
    </div>
  );
}
