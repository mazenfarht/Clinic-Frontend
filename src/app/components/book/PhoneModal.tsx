"use client";

import React, { useState } from "react";
import { X, Loader2, Phone } from "lucide-react";

interface PhoneModalProps {
  loading: boolean;
  error: string | null;
  onSubmit: (phone: string) => void;
  onClose: () => void;
}

const PHONE_RE = /^(010|011|012|015)\d{8}$/;

export function PhoneModal({ loading, error, onSubmit, onClose }: PhoneModalProps) {
  const [phone, setPhone] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim();

    if (!trimmed) {
      setLocalError("Please enter your phone number.");
      return;
    }
    if (!PHONE_RE.test(trimmed)) {
      setLocalError("Enter a valid Egyptian mobile number (e.g. 01012345678).");
      return;
    }

    setLocalError(null);
    onSubmit(trimmed);
  };

  const displayError = localError ?? error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Enter Your Phone Number</h2>
            <p className="mt-1 text-sm text-gray-500">
              We'll use this to find or create your patient record.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Mobile Number</label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                placeholder="01012345678"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setLocalError(null);
                }}
                disabled={loading}
                maxLength={11}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-300 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
              />
            </div>
            {displayError && (
              <p className="text-xs text-red-500">{displayError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Looking up…
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
