"use client";

import { useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePatient } from "../../../../services/patient";
import { usePatient } from "@/src/hooks/usePatients";
import PatientDetails from "../../../components/Patients/PatientDetails";
import PatientForm from "../../../components/Patients/PatientForm";

export default function PatientPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const id = params.id as string;

  const [formOpen, setFormOpen] = useState(false);

  const { data: patient, isLoading, isError } = usePatient(id);

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updatePatient>[1];
    }) => updatePatient(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["patient", id],
      });

      await queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      setFormOpen(false);
    },

    onError: (error) => {
      console.error("Update patient error:", error);
    },
  });

  const handleFormSubmit = (data: any) => {
    if (!patient) return;

    updateMutation.mutate({
      id: patient.id,
      data,
    });
  };

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
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#1A6BCC] hover:bg-[#155AB5] text-white px-4 py-2.5 rounded-lg transition"
        >
          <Pencil size={17} />
          Edit Patient
        </button>
      </div>

      {/* Patient Details */}
      <PatientDetails patient={patient} />

      {/* Edit Form */}
      {formOpen && (
        <PatientForm
          patient={patient}
          onSubmit={handleFormSubmit}
          onClose={() => {
            if (!updateMutation.isPending) {
              setFormOpen(false);
            }
          }}
        />
      )}
    </div>
  );
}
