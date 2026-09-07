import { useEffect } from "react";

/* ── Backdrop + card ─────────────────────────────────────────── */

export function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}

/* ── Form field wrapper ──────────────────────────────────────── */

export function Field({
  label,
  hint,
  required,
  error,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-xs text-gray-400">({hint})</span>}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ── Input class helper ──────────────────────────────────────── */

export function inputCls(hasError: boolean): string {
  return [
    "w-full rounded-md border px-3 py-2 text-sm text-gray-900",
    "placeholder:text-gray-400 focus:outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-gray-300 focus:ring-gray-900",
  ].join(" ");
}

/* ── Button spinner ──────────────────────────────────────────── */

export function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
