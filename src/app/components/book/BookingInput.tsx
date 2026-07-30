"use client";

import { Field, ErrorMessage } from "formik";
import { LucideIcon } from "lucide-react";

type BookingInputProps = {
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  type?: string;
};

export default function BookingInput({
  name,
  label,
  placeholder,
  icon: Icon,
  type = "text",
}: BookingInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-[#1A2B45]"
      >
        {label}
      </label>

      <div className="relative group">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Icon
            size={20}
            className="text-[#94A3B8] transition-colors duration-300 group-focus-within:text-[#1A6BCC]"
          />
        </div>

        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
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
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-300

            focus:border-[#1A6BCC]
            focus:ring-4
            focus:ring-[#1A6BCC]/10

            hover:border-slate-300
          "
        />
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="text-sm text-red-500"
      />
    </div>
  );
}
