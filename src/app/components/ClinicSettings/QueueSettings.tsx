"use client";

import { Timer } from "lucide-react";

type Props = {
  delayThreshold: number;
  onChange: (value: number) => void;
};

export default function QueueSettings({ delayThreshold, onChange }: Props) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <Timer size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Queue Settings
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Configure queue delay thresholds.
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="p-6">
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Delay Threshold
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              value={delayThreshold}
              onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6B7A92]">
              min
            </span>
          </div>
          <p className="text-xs text-[#6B7A92] mt-1">
            Minutes before a patient is marked as delayed in the queue.
          </p>
        </div>
      </div>
    </div>
  );
}
