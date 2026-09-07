"use client";

import { Plus } from "lucide-react";

type Props = {
  onCreateClick: () => void;
  canCreate: boolean;
};

export default function VisitsHeader({ onCreateClick, canCreate }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-xs text-[#6B7A92] uppercase tracking-wider">
          Medical Records
        </p>
        <h1 className="text-2xl font-bold text-[#1A2B45] mt-1">Visits</h1>
        <p className="text-sm text-[#6B7A92] mt-1">
          Manage and view patient visit records
        </p>
      </div>

      {canCreate && (
        <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A6BCC] text-white text-sm font-medium hover:bg-[#155AB5] transition shadow-sm"
        >
          <Plus size={18} />
          New Visit
        </button>
      )}
    </div>
  );
}
