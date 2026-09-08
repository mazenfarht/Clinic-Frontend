"use client";

import { Save } from "lucide-react";

type Props = {
  loading: boolean;
  onSave: () => void;
};

export default function SaveSettingsButton({ loading, onSave }: Props) {
  return (
    <div className="flex justify-end pb-6">
      <button
        type="button"
        onClick={onSave}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={18} />
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
