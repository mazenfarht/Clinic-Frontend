"use client";

import { Field, ErrorMessage } from "formik";
import { CalendarDays } from "lucide-react";

type DateInputProps = {
  setFieldValue: (field: string, value: string) => void;
  fetchSlots: (date: string) => void;
};

export default function DateInput({
  setFieldValue,
  fetchSlots,
}: DateInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="date"
        className="block text-sm font-semibold text-[#1A2B45]"
      >
        Appointment Date
      </label>

      <div className="relative group">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <CalendarDays
            size={20}
            className="text-[#94A3B8] transition-colors duration-300 group-focus-within:text-[#1A6BCC]"
          />
        </div>

        <Field
          id="date"
          name="date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            pl-12
            pr-4
            text-[#1A2B45]
            outline-none
            transition-all
            duration-300

            hover:border-slate-300

            focus:border-[#1A6BCC]
            focus:ring-4
            focus:ring-[#1A6BCC]/10

            [color-scheme:light]
          "
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            setFieldValue("date", value);
            fetchSlots(value);
          }}
        />
      </div>

      <ErrorMessage
        name="date"
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
}
