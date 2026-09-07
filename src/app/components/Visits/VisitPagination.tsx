// src/modules/visits/components/VisitPagination.tsx

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { VisitMeta } from "../../../types/visit";

type Props = {
  meta: VisitMeta;
  onPageChange: (page: number) => void;
};

export default function VisitPagination({ meta, onPageChange }: Props) {
  const { page, totalPages, total, limit, hasNextPage, hasPrevPage } = meta;

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-[#E2E8EF] rounded-xl shadow-sm px-5 py-3">
      {/* Info */}
      <p className="text-sm text-[#6B7A92]">
        Showing <span className="font-medium text-[#1A2B45]">{from}</span>
        {" – "}
        <span className="font-medium text-[#1A2B45]">{to}</span>
        {" of "}
        <span className="font-medium text-[#1A2B45]">{total}</span> visits
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pages */}
        {getPages().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 py-1 text-sm text-[#6B7A92]"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p as number)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                p === page
                  ? "bg-[#1A6BCC] text-white"
                  : "text-[#344054] hover:bg-[#F2F4F7]"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
