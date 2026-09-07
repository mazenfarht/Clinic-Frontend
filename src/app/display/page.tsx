"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { useEffect, useMemo, useState } from "react";
import Loading from "./loading";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { useQueueStatus } from "@/src/hooks/useQueueStatus";
export default function Display() {
  const today = new Date().toLocaleDateString("en-CA");

  const { data, isLoading, isError } = useQueue({
    date: today,
    page: 1,
    limit: 100,
  });

  const { data: statusData } = useQueueStatus();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const queue = data?.data ?? [];

  const currentPatient = useMemo(() => {
    return queue.find((entry) => entry.status === "IN_PROGRESS") ?? null;
  }, [queue]);

  const nextPatient = statusData?.nextWaiting ?? null;

  const fullQueue = useMemo(() => {
    return [...queue].sort((a, b) => a.queueNumber - b.queueNumber);
  }, [queue]);

  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFB] p-6">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-red-500">
            Failed to load queue.
          </p>

          <p className="mt-1 text-xs text-gray-500">Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFB] p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl bg-[#1A2B45] p-4 text-white sm:flex-row sm:items-center sm:justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1A6BCC]">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-extrabold tracking-tight text-white">
            Clinic<span className="text-[#1A6BCC]">Q</span>
          </span>
        </Link>

        {/* Date / Time */}
        <div className="text-left sm:text-right">
          <p className="text-sm text-[#8DA0B8]">{date}</p>
          <p className="text-lg font-semibold">{time}</p>
        </div>
      </div>

      {/* CURRENT & NEXT PATIENT */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* NOW SERVING */}
        <div className="min-w-0 rounded-xl border-l-4 border-[#1A6BCC] bg-gradient-to-r from-[#EBF3FF] to-white p-5 sm:p-6">
          <p className="text-sm font-medium text-[#6B7A92]">NOW SERVING</p>

          <h2 className="mt-2 text-4xl font-bold text-[#1A6BCC] sm:text-5xl">
            {currentPatient?.queueNumber ?? "---"}
          </h2>

          <p className="mt-1 truncate text-lg font-semibold text-[#1A2B45] sm:text-xl">
            {currentPatient?.visit?.patient.fullName ??
              currentPatient?.reservedFor ??
              "No Current Patient"}
          </p>
        </div>

        {/* NEXT PATIENT */}
        <div className="min-w-0 rounded-xl border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-white p-5 sm:p-6">
          <p className="text-sm font-medium text-amber-600">NEXT PATIENT</p>

          <h2 className="mt-2 text-4xl font-bold text-amber-600 sm:text-5xl">
            {nextPatient?.queueNumber ?? "---"}
          </h2>

          <p className="mt-1 truncate text-lg font-semibold text-[#1A2B45] sm:text-xl">
            {nextPatient?.visit?.patient.fullName ??
              nextPatient?.reservedFor ??
              "No Next Patient"}
          </p>
        </div>
      </div>

      {/* QUEUE TABLE */}
      <div className="w-full overflow-hidden rounded-xl border border-[#E2E8EF] bg-white">
        <div className="border-b border-[#E2E8EF] p-4">
          <h3 className="text-lg font-semibold text-black">Full Queue</h3>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-[#F8FAFB] text-sm text-[#6B7A92]">
              <tr>
                <th className="whitespace-nowrap p-3 sm:p-4">Number</th>

                <th className="p-3 sm:p-4">Name</th>

                <th className="whitespace-nowrap p-3 sm:p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {fullQueue.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="p-8 text-center text-sm text-gray-400"
                  >
                    No queue entries found.
                  </td>
                </tr>
              ) : (
                fullQueue.map((entry) => {
                  const patientName =
                    entry.visit?.patient.fullName ??
                    entry.reservedFor ??
                    "Reserved Slot";

                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-[#F0F3F7] transition-colors hover:bg-[#EBF3FF]"
                    >
                      <td className="whitespace-nowrap p-3 font-mono text-sm font-bold text-black sm:p-4">
                        #{entry.queueNumber}
                      </td>

                      <td className="max-w-[300px] p-3 sm:p-4">
                        <p
                          className="truncate font-medium text-[#1A2B45]"
                          title={patientName}
                        >
                          {patientName}
                        </p>

                        {entry.isReserved && (
                          <p className="mt-0.5 text-xs text-gray-400">
                            Reserved
                          </p>
                        )}
                      </td>

                      <td className="whitespace-nowrap p-3 sm:p-4">
                        <StatusBadge status={entry.status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "WAITING" | "IN_PROGRESS" | "SERVED" | "CANCELLED";
}) {
  const styles = {
    WAITING: "bg-blue-100 text-blue-600",
    IN_PROGRESS: "bg-yellow-100 text-yellow-600",
    SERVED: "bg-green-100 text-green-600",
    CANCELLED: "bg-gray-100 text-gray-500",
  };

  const labels = {
    WAITING: "Waiting",
    IN_PROGRESS: "Now Serving",
    SERVED: "Served",
    CANCELLED: "Cancelled",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
