"use client";

import React, { useState } from "react";
import { Loader2, User, Calendar, Users, ArrowLeft } from "lucide-react";
import type { Gender } from "@/src/types/booking";

interface RegistrationData {
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
}

interface PatientRegistrationFormProps {
  phone: string;
  loading: boolean;
  error: string | null;
  onSubmit: (data: RegistrationData) => void;
  onBack: () => void;
}

const today = new Date().toISOString().split("T")[0];

export function PatientRegistrationForm({
  phone,
  loading,
  error,
  onSubmit,
  onBack,
}: PatientRegistrationFormProps) {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!fullName.trim() || fullName.trim().length < 3)
      next.fullName = "Full name must be at least 3 characters.";
    if (!dateOfBirth) next.dateOfBirth = "Date of birth is required.";
    if (!gender) next.gender = "Please select a gender.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ fullName: fullName.trim(), dateOfBirth, gender: gender as Gender });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Create Your Patient Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          Phone: <span className="font-medium text-gray-700">{phone}</span> — We couldn't find
          an existing record. Please fill in your details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <User size={14} className="text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            placeholder="Sara Ahmed"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors((p) => ({ ...p, fullName: undefined }));
            }}
            disabled={loading}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-300 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Calendar size={14} className="text-blue-500" />
            Date of Birth
          </label>
          <input
            type="date"
            max={today}
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
              setErrors((p) => ({ ...p, dateOfBirth: undefined }));
            }}
            disabled={loading}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Users size={14} className="text-blue-500" />
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["MALE", "FEMALE"] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                disabled={loading}
                onClick={() => {
                  setGender(g);
                  setErrors((p) => ({ ...p, gender: undefined }));
                }}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition
                  ${
                    gender === g
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                  } disabled:opacity-50`}
              >
                {g === "MALE" ? "Male" : "Female"}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating profile…
            </>
          ) : (
            "Continue to Summary"
          )}
        </button>
      </form>
    </div>
  );
}
