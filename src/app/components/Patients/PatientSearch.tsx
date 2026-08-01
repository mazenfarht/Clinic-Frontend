"use client";

import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function PatientSearch({
  value,
  onChange,
  placeholder = "Search by name, phone, or MRN...",
}: Props) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full">
      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A92]"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-white border border-[#D0D5DD] rounded-xl text-sm text-[#1A2B45] placeholder:text-[#98A2B3] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#6B7A92] hover:bg-[#F2F4F7] transition"
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}
