"use client";

import { Filter, RotateCcw } from "lucide-react";

type Gender = "ALL" | "MALE" | "FEMALE" | "OTHER";

type Props = {
  gender: Gender;
  includeDeleted: boolean;
  onGenderChange: (gender: Gender) => void;
  onIncludeDeletedChange: (includeDeleted: boolean) => void;
  onReset?: () => void;
};

export default function PatientFilters({
  gender,
  includeDeleted,
  onGenderChange,
  onIncludeDeletedChange,
  onReset,
}: Props) {
  const hasFilters = gender !== "ALL" || includeDeleted;

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter Title */}
        <div className="flex items-center gap-2 text-[#1A2B45]">
          <Filter size={18} />

          <span className="text-sm font-semibold">Filters</span>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-2">
          <label htmlFor="gender" className="text-sm text-[#6B7A92]">
            Gender
          </label>

          <select
            id="gender"
            value={gender}
            onChange={(e) => onGenderChange(e.target.value as Gender)}
            className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm text-[#344054] bg-white outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
          >
            <option value="ALL">All</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Include Deleted */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => onIncludeDeletedChange(e.target.checked)}
            className="w-4 h-4 accent-[#1A6BCC]"
          />

          <span className="text-sm text-[#344054]">
            Include deleted patients
          </span>
        </label>

        {/* Reset */}
        {hasFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="lg:ml-auto inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-[#6B7A92] hover:bg-[#F8FAFB] transition"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
