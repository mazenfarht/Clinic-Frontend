"use client";

import { Clock3 } from "lucide-react";
import { ErrorMessage } from "formik";

type Props = {
  slots: string[];
  loading: boolean;
  selectedSlot: string;
  setFieldValue: (field: string, value: string) => void;
};

export default function TimeSlotField({
  slots,
  loading,
  selectedSlot,
  setFieldValue,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock3 size={18} className="text-[#1A6BCC]" />

          <h3 className="text-sm font-semibold text-[#1A2B45]">
            Available Time
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (slots.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock3 size={18} className="text-[#1A6BCC]" />

        <h3 className="text-sm font-semibold text-[#1A2B45]">Available Time</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {slots.map((slot) => {
          const active = selectedSlot === slot;

          return (
            <button
              key={slot}
              type="button"
              onClick={() => setFieldValue("slot", slot)}
              className={`
                h-12
                rounded-2xl
                border
                font-medium
                transition-all
                duration-300

                ${
                  active
                    ? "border-[#1A6BCC] bg-gradient-to-r from-[#1A6BCC] to-[#0EB5A2] text-white shadow-lg shadow-cyan-100"
                    : "border-slate-200 bg-white text-[#1A2B45] hover:border-[#1A6BCC] hover:bg-[#F4F9FF]"
                }
              `}
            >
              {slot}
            </button>
          );
        })}
      </div>

      <ErrorMessage
        name="slot"
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
}
