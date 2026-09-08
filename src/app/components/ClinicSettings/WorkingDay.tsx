"use client";

import { DaySchedule } from "@/src/types/clinic";

type Props = {
  day: string;
  schedule: DaySchedule;
  onChange: (schedule: DaySchedule) => void;
};

export default function WorkingDay({ day, schedule, onChange }: Props) {
  const handleToggle = () => {
    onChange({ ...schedule, isOpen: !schedule.isOpen });
  };

  const handleOpenChange = (value: string) => {
    onChange({ ...schedule, open: value });
  };

  const handleCloseChange = (value: string) => {
    onChange({ ...schedule, close: value });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-[#F0F3F7] last:border-0">
      {/* Day Name + Toggle */}
      <div className="flex items-center gap-3 w-36 shrink-0">
        <button
          type="button"
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
            schedule.isOpen ? "bg-[#1A6BCC]" : "bg-[#D0D5DD]"
          }`}
          aria-label={`Toggle ${day}`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              schedule.isOpen ? "translate-x-4" : "translate-x-1"
            }`}
          />
        </button>

        <span className="text-sm font-medium text-[#1A2B45] capitalize">
          {day}
        </span>
      </div>

      {/* Status Badge */}
      <div className="w-16 shrink-0">
        {schedule.isOpen ? (
          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
            Open
          </span>
        ) : (
          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[#F2F4F7] text-[#6B7A92]">
            Closed
          </span>
        )}
      </div>

      {/* Time Inputs */}
      <div className="flex items-center gap-3 flex-1">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#6B7A92]">Opens at</label>
          <input
            type="time"
            value={schedule.open}
            onChange={(e) => handleOpenChange(e.target.value)}
            disabled={!schedule.isOpen}
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#1A2B45] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition disabled:bg-[#F2F4F7] disabled:text-[#98A2B3] disabled:cursor-not-allowed"
          />
        </div>

        <span className="text-[#6B7A92] text-sm mt-4">—</span>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#6B7A92]">Closes at</label>
          <input
            type="time"
            value={schedule.close}
            onChange={(e) => handleCloseChange(e.target.value)}
            disabled={!schedule.isOpen}
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#1A2B45] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition disabled:bg-[#F2F4F7] disabled:text-[#98A2B3] disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
