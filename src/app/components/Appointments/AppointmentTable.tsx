import { CalendarDays, Loader2 } from "lucide-react";
import AppointmentRow from "./AppointmentRow";
import type { Appointment, PaginationMeta } from "@/src/types/appointment";

interface AppointmentTableProps {
  appointments: Appointment[];
  isLoading: boolean;
  isError: boolean;
  meta?: PaginationMeta;
  actionLoading: string | null;

  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onNoShow: (id: string) => void;

  onPageChange: (page: number) => void;
}

const COLUMNS = ["Patient", "Date", "Time", "Status", "Notes", "Actions"];

export default function AppointmentTable({
  appointments,
  isLoading,
  isError,
  meta,
  actionLoading,

  onConfirm,
  onCancel,
  onComplete,
  onNoShow,

  onPageChange,
}: AppointmentTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={COLUMNS.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 size={24} className="animate-spin" />
                    <p className="text-sm">Loading appointments…</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && isError && (
              <tr>
                <td colSpan={COLUMNS.length} className="py-16 text-center">
                  <p className="text-sm text-red-500">
                    Failed to load appointments. Please try again.
                  </p>
                </td>
              </tr>
            )}

            {!isLoading && !isError && appointments.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <CalendarDays size={32} className="text-slate-300" />
                    <p className="text-sm">No appointments found.</p>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              appointments.map((appt) => (
                <AppointmentRow
                  key={appt.id}
                  appointment={appt}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  onComplete={onComplete}
                  onNoShow={onNoShow}
                  actionLoading={actionLoading}
                />
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {(meta.page - 1) * meta.limit + 1}–
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(meta.page - 1)}
              disabled={!meta.hasPrevPage}
              className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === meta.totalPages ||
                  Math.abs(p - meta.page) <= 1
              )
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) {
                  acc.push("…");
                }

                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-slate-400 text-xs"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => onPageChange(p as number)}
                    className={[
                      "w-7 h-7 rounded-lg text-xs font-medium transition-colors",
                      p === meta.page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => onPageChange(meta.page + 1)}
              disabled={!meta.hasNextPage}
              className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
