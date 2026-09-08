"use client";

import { CalendarClock } from "lucide-react";

type Props = {
  maxPatientsPerDay: number;
  appointmentDuration: number;
  gracePeriod: number;
  onChange: (
    field: "maxPatientsPerDay" | "appointmentDuration" | "gracePeriod",
    value: number
  ) => void;
};

export default function AppointmentSettings({
  maxPatientsPerDay,
  appointmentDuration,
  gracePeriod,
  onChange,
}: Props) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <CalendarClock size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Appointment Settings
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Configure appointment capacity and duration.
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Max Patients Per Day */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Max Patients Per Day
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={maxPatientsPerDay}
            onChange={(e) =>
              onChange("maxPatientsPerDay", parseInt(e.target.value, 10) || 1)
            }
            className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45]"
          />
          <p className="text-xs text-[#6B7A92] mt-1">Between 1 and 1000.</p>
        </div>

        {/* Appointment Duration */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Appointment Duration
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              value={appointmentDuration}
              onChange={(e) =>
                onChange(
                  "appointmentDuration",
                  parseInt(e.target.value, 10) || 1
                )
              }
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B7A92]">
              min
            </span>
          </div>
          <p className="text-xs text-[#6B7A92] mt-1">Duration in minutes.</p>
        </div>

        {/* Grace Period */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Grace Period
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              value={gracePeriod}
              onChange={(e) =>
                onChange("gracePeriod", parseInt(e.target.value, 10) || 0)
              }
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B7A92]">
              min
            </span>
          </div>
          <p className="text-xs text-[#6B7A92] mt-1">
            Allowed late arrival time.
          </p>
        </div>
      </div>
    </div>
  );
}
