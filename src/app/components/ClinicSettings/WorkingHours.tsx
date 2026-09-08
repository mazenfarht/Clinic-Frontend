"use client";

import { Clock } from "lucide-react";
import {
  WorkingHours as WorkingHoursType,
  DaySchedule,
} from "@/src/types/clinic";
import WorkingDay from "./WorkingDay";

type DayKey = keyof WorkingHoursType;

const DAYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

type Props = {
  workingHours: WorkingHoursType;
  onChange: (workingHours: WorkingHoursType) => void;
};

export default function WorkingHours({ workingHours, onChange }: Props) {
  const handleDayChange = (day: DayKey, schedule: DaySchedule) => {
    onChange({ ...workingHours, [day]: schedule });
  };

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <Clock size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Working Hours
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Set your clinic's opening and closing times for each day.
          </p>
        </div>
      </div>

      {/* Days */}
      <div className="px-6 py-2">
        {DAYS.map((day) => (
          <WorkingDay
            key={day}
            day={day}
            schedule={workingHours[day]}
            onChange={(schedule) => handleDayChange(day, schedule)}
          />
        ))}
      </div>
    </div>
  );
}
