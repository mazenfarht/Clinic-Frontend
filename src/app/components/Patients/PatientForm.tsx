"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Patient } from "@/src/types/patient";

type PatientFormData = {
  mrn: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address?: string;
  notes?: string;
};

type Props = {
  patient?: Patient | null;
  onSubmit: (data: PatientFormData) => void;
  onClose: () => void;
};

export default function PatientForm({ patient, onSubmit, onClose }: Props) {
  const [mrn, setMrn] = useState(patient?.mrn ?? "");
  const [fullName, setFullName] = useState(patient?.fullName ?? "");
  const [phone, setPhone] = useState(patient?.phone ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(
    patient?.dateOfBirth ? patient.dateOfBirth.slice(0, 10) : ""
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">(
    patient?.gender ?? "MALE"
  );

  const [address, setAddress] = useState(patient?.address ?? "");

  const [notes, setNotes] = useState(patient?.notes ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !dateOfBirth || !gender) {
      return;
    }

    // MRN مطلوب عند إنشاء المريض فقط
    if (!patient && !mrn.trim()) {
      return;
    }

    onSubmit({
      mrn: mrn.trim(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      dateOfBirth,
      gender,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8EF]">
          <div>
            <h2 className="text-xl font-semibold text-[#1A2B45]">
              {patient ? "Edit Patient" : "Add Patient"}
            </h2>

            <p className="text-sm text-[#6B7A92] mt-1">
              {patient
                ? "Update patient information"
                : "Enter patient information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* MRN */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              MRN
            </label>

            <input
              type="text"
              value={mrn}
              onChange={(e) => setMrn(e.target.value)}
              disabled={!!patient}
              placeholder="e.g. MRN001"
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition disabled:bg-[#F2F4F7] disabled:text-[#6B7A92]"
            />

            {patient && (
              <p className="text-xs text-[#6B7A92] mt-1">
                MRN cannot be changed after creation.
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter patient full name"
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              Phone
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              Date of Birth
            </label>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value as "MALE" | "FEMALE" | "OTHER")
              }
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              Address
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#1A2B45] mb-2">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={3}
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none resize-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#D0D5DD] text-[#344054] hover:bg-[#F8FAFB] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition"
            >
              {patient ? "Save Changes" : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
