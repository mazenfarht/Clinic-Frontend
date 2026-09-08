"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getClinicSettings,
  updateClinicSettings,
} from "@/src/services/clinicSettings";
import { UpdateClinicSettingsData } from "../../../types/clinic";
import ClinicInfoForm from "../../components/ClinicSettings/ClinicInfoForm";
import WorkingHours from "../../components/ClinicSettings/WorkingHours";
import AppointmentSettings from "../../components/ClinicSettings/AppointmentSettings";
import QueueSettings from "../../components/ClinicSettings/QueueSettings";
import SaveSettingsButton from "../../components/ClinicSettings/SaveSettingsButton";
import { notifySuccess, notifyError } from "../../../lib/notify";
export default function SettingsPage() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ["clinic-settings"],
    queryFn: getClinicSettings,
  });

  const settings = settingsQuery.data;

  const [formData, setFormData] = useState<UpdateClinicSettingsData | null>(
    null
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.clinic.name,
        phone: settings.clinic.phone ?? "",
        email: settings.clinic.email ?? "",
        address: settings.clinic.address ?? "",
        maxPatientsPerDay: settings.maxPatientsPerDay,
        appointmentDuration: settings.appointmentDuration,
        gracePeriod: settings.gracePeriod,
        delayThreshold: settings.delayThreshold,
        workingHours: settings.workingHours,
      });
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: (data: UpdateClinicSettingsData) => updateClinicSettings(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clinic-settings"] });

      setTimeout(() => setSaveSuccess(false), 3000);
      notifySuccess("Settings saved successfully.");
    },

    onError: (error: any) => {
      console.log("STATUS:", error?.response?.status);
      console.log("RESPONSE:", error?.response?.data);

      const message =
        error?.response?.data?.message ?? "Failed to save settings.";

      notifyError(message);
    },
  });

  const handleSave = () => {
    if (!formData) return;

    const payload: UpdateClinicSettingsData = {
      ...formData,
      phone: formData.phone?.trim() || null,
      email: formData.email?.trim() || null,
      address: formData.address?.trim() || null,
    };

    console.log("PATCH PAYLOAD:", JSON.stringify(payload, null, 2));

    setSaveError(null);
    updateMutation.mutate(payload);
  };
  if (settingsQuery.isLoading) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <div className="flex items-center justify-center py-20">
          <p className="text-[#6B7A92]">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (settingsQuery.isError || !formData) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6">
        <div className="bg-white border border-[#E2E8EF] rounded-xl p-8 text-center">
          <p className="text-[#D92D20] font-medium">
            Failed to load clinic settings.
          </p>
          <button
            type="button"
            onClick={() => settingsQuery.refetch()}
            className="mt-4 px-4 py-2 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A2B45]">Clinic Settings</h1>
        <p className="text-sm text-[#6B7A92] mt-1">
          Manage your clinic information and configuration.
        </p>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="bg-[#ECFDF3] border border-[#6CE9A6] rounded-xl px-5 py-3">
          <p className="text-sm font-medium text-[#027A48]">
            Settings saved successfully.
          </p>
        </div>
      )}

      {/* Error Banner */}
      {saveError && (
        <div className="bg-[#FEF3F2] border border-[#FECACA] rounded-xl px-5 py-3">
          <p className="text-sm font-medium text-[#B42318]">{saveError}</p>
        </div>
      )}

      {/* Clinic Information */}
      <ClinicInfoForm
        name={formData.name ?? ""}
        phone={formData.phone ?? ""}
        email={formData.email ?? ""}
        address={formData.address ?? ""}
        onChange={(field, value) =>
          setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
        }
      />

      {/* Working Hours */}
      <WorkingHours
        workingHours={formData.workingHours!}
        onChange={(workingHours) =>
          setFormData((prev) => (prev ? { ...prev, workingHours } : prev))
        }
      />

      {/* Appointment Settings */}
      <AppointmentSettings
        maxPatientsPerDay={formData.maxPatientsPerDay ?? 50}
        appointmentDuration={formData.appointmentDuration ?? 30}
        gracePeriod={formData.gracePeriod ?? 15}
        onChange={(field, value) =>
          setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
        }
      />

      {/* Queue Settings */}
      <QueueSettings
        delayThreshold={formData.delayThreshold ?? 20}
        onChange={(value) =>
          setFormData((prev) =>
            prev ? { ...prev, delayThreshold: value } : prev
          )
        }
      />

      {/* Save */}
      <SaveSettingsButton
        loading={updateMutation.isPending}
        onSave={handleSave}
      />
    </div>
  );
}
