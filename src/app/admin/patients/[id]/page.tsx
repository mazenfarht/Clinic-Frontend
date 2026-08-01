"use client";

import { ArrowLeft, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { usePatient } from "@/src/hooks/usePatients";
import PatientDetails from "../../../components/Patients/PatientDetails";

export default function PatientPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const { data: patient, isLoading, isError } = usePatient(id);

  if (isLoading) {
    return (
      <div className="bg-[#F8FAFB] p-6">
        <p className="text-[#6B7A92]">Loading patient...</p>
      </div>
    );
  }

  if (isError || !patient) {
    return (
      <div className="bg-[#F8FAFB] p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1A6BCC] mb-4"
        >
          <ArrowLeft size={18} />
          Back to Patients
        </button>

        <p className="text-red-500">Patient not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFB] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#6B7A92] hover:text-[#1A6BCC] transition mb-3"
          >
            <ArrowLeft size={17} />
            Back to Patients
          </button>

          <h1 className="text-2xl font-bold text-[#1A2B45]">Patient Details</h1>

          <p className="text-sm text-[#6B7A92] mt-1">
            View patient information, visits and appointments.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 bg-[#1A6BCC] hover:bg-[#155AB5] text-white px-4 py-2.5 rounded-lg transition"
        >
          <Pencil size={17} />
          Edit Patient
        </button>
      </div>

      <PatientDetails patient={patient} />
    </div>
  );
}
