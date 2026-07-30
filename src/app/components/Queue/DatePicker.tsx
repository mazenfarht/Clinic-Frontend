"use client";

type Props = {
  date: string;
  setDate: (date: string) => void;
};

export default function DatePicker({ date, setDate }: Props) {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E2E8EF] shadow-sm">
      <span className="text-xs text-[#6B7A92]">Date</span>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="text-sm text-[#1A2B45] bg-transparent outline-none"
      />
    </div>
  );
}
