"use client";

import { CalendarPlus } from "lucide-react";

export default function BookingHeader() {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A6BCC] to-[#0EB5A2] shadow-lg shadow-cyan-200/50">
          <CalendarPlus className="h-8 w-8 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A2B45]">
            Let's get you scheduled
          </h1>

          <p className="mt-2 text-base leading-7 text-[#6B7A92]">
            Complete the form below to reserve your appointment. It only takes a
            minute.
          </p>
        </div>
      </div>

      <div className="mt-8 h-px w-full bg-gradient-to-r from-[#1A6BCC]/20 via-[#0EB5A2]/20 to-transparent" />
    </div>
  );
}
