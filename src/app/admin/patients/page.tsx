"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Patient } from "@/src/types/patient";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../../services/patient";
import PatientSearch from "../../components/Patients/PatientSearch";
import PatientFilters from "../../components/Patients/PatientFilters";
import PatientForm from "../../components/Patients/PatientForm";
import DeletePatientModal from "../../components/Patients/DeletePatientModal";
import PatientTable from "../../components/Patients/PatientTable";

type Gender = "ALL" | "MALE" | "FEMALE" | "OTHER";

export default function PatientsPage() {
  const queryClient = useQueryClient();

  // -----------------------------
  // Filters
  // -----------------------------

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<Gender>("ALL");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 10;

  // -----------------------------
  // Modal state
  // -----------------------------

  const [formOpen, setFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // -----------------------------
  // Get Patients
  // -----------------------------

  const patientsQuery = useQuery({
    queryKey: [
      "patients",
      {
        search,
        gender,
        includeDeleted,
        page,
        limit,
      },
    ],

    queryFn: () =>
      getPatients({
        search: search || undefined,
        gender: gender === "ALL" ? undefined : gender,
        includeDeleted,
        page,
        limit,
      }),

    placeholderData: (previousData) => previousData,
  });

  const patients = patientsQuery.data?.data ?? [];
  const meta = patientsQuery.data?.meta;

  // -----------------------------
  // Create Patient
  // -----------------------------

  const createMutation = useMutation({
    mutationFn: createPatient,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      setFormOpen(false);
      setEditingPatient(null);
    },

    onError: (error) => {
      console.error("Create patient error:", error);
    },
  });

  // -----------------------------
  // Update Patient
  // -----------------------------

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updatePatient>[1];
    }) => updatePatient(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      setFormOpen(false);
      setEditingPatient(null);
    },

    onError: (error) => {
      console.error("Update patient error:", error);
    },
  });

  // -----------------------------
  // Delete Patient
  // -----------------------------

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePatient(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      setDeleteModalOpen(false);
      setSelectedPatient(null);
    },

    onError: (error) => {
      console.error("Delete patient error:", error);
    },
  });

  // -----------------------------
  // Handlers
  // -----------------------------

  const handleAddPatient = () => {
    setEditingPatient(null);
    setFormOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormOpen(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setDeleteModalOpen(true);
  };

  const handleViewPatient = (patient: Patient) => {
    window.location.href = `/admin/patients/${patient.id}`;
  };

  const handleFormSubmit = (data: any) => {
    if (editingPatient) {
      updateMutation.mutate({
        id: editingPatient.id,
        data,
      });

      return;
    }

    createMutation.mutate(data);
  };

  const handleResetFilters = () => {
    setSearch("");
    setGender("ALL");
    setIncludeDeleted(false);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleGenderChange = (value: Gender) => {
    setGender(value);
    setPage(1);
  };

  const handleIncludeDeletedChange = (value: boolean) => {
    setIncludeDeleted(value);
    setPage(1);
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (patientsQuery.isLoading) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <div className="flex items-center justify-center py-20">
          <p className="text-[#6B7A92]">Loading patients...</p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (patientsQuery.isError) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <div className="bg-white border border-[#E2E8EF] rounded-xl p-8 text-center">
          <p className="text-[#D92D20] font-medium">Failed to load patients.</p>

          <button
            type="button"
            onClick={() => patientsQuery.refetch()}
            className="mt-4 px-4 py-2 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2B45]">Patients</h1>

          <p className="text-sm text-[#6B7A92] mt-1">
            Manage and view all clinic patients.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddPatient}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition shadow-sm"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      {/* Search */}
      <PatientSearch value={search} onChange={handleSearchChange} />

      {/* Filters */}
      <PatientFilters
        gender={gender}
        includeDeleted={includeDeleted}
        onGenderChange={handleGenderChange}
        onIncludeDeletedChange={handleIncludeDeletedChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <PatientTable
        patients={patients}
        onEdit={handleEditPatient}
        onDelete={handleDeletePatient}
        onView={handleViewPatient}
      />

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-[#E2E8EF] rounded-xl px-4 py-3">
          <p className="text-sm text-[#6B7A92]">
            Page {meta.page} of {meta.totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!meta.hasPrevPage}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-2 text-sm rounded-lg border border-[#D0D5DD] text-[#344054] hover:bg-[#F8FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!meta.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-2 text-sm rounded-lg border border-[#D0D5DD] text-[#344054] hover:bg-[#F8FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Patient Form */}
      {formOpen && (
        <PatientForm
          patient={editingPatient}
          onSubmit={handleFormSubmit}
          onClose={() => {
            if (!isSaving) {
              setFormOpen(false);
              setEditingPatient(null);
            }
          }}
        />
      )}

      {/* Delete Modal */}
      <DeletePatientModal
        patient={selectedPatient}
        open={deleteModalOpen}
        loading={deleteMutation.isPending}
        onClose={() => {
          if (!deleteMutation.isPending) {
            setDeleteModalOpen(false);
            setSelectedPatient(null);
          }
        }}
        onConfirm={(patient) => {
          deleteMutation.mutate(patient.id);
        }}
      />
    </div>
  );
}
