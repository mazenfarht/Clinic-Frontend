"use client";

import {
  Calendar,
  MapPin,
  Phone,
  FileText,
  User,
  Hash,
  X,
  Clock,
} from "lucide-react";
import { Patient } from "@/src/types/patient";

type Props = {
  patient: Patient;
  onClose?: () => void;
};

const statusStyles = {
  SCHEDULED: "bg-[#FFF7E6] text-[#B54708]",
  CONFIRMED: "bg-[#ECFDF3] text-[#027A48]",
  COMPLETED: "bg-[#EBF3FF] text-[#1A6BCC]",
  CANCELLED: "bg-[#FEF3F2] text-[#D92D20]",
  NO_SHOW: "bg-[#F2F4F7] text-[#475467]",
};

const statusLabels = {
  SCHEDULED: "Scheduled",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

export default function PatientDetails({ patient, onClose }: Props) {
  const formattedDate = patient.dateOfBirth
    ? new Date(patient.dateOfBirth).toLocaleDateString("en-GB")
    : "—";

  const createdAt = patient.createdAt
    ? new Date(patient.createdAt).toLocaleDateString("en-GB")
    : "—";

  const genderLabel = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
  }[patient.gender];

  const appointments = patient.appointments ?? [];

  const formatAppointmentDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const formatAppointmentTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8EF]">
        <div>
          <p className="text-xs text-[#6B7A92] uppercase tracking-wider">
            Patient Details
          </p>

          <h2 className="text-2xl font-bold text-[#1A2B45] mt-1">
            {patient.fullName}
          </h2>

          <p className="text-sm text-[#6B7A92] mt-1">MRN: {patient.mrn}</p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Status */}
      <div className="px-6 pt-5">
        {patient.deletedAt ? (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#FEF3F2] text-[#D92D20]">
            Deleted
          </span>
        ) : (
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
            Active
          </span>
        )}
      </div>

      {/* Information */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MRN */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
            <Hash size={18} />
          </div>

          <div>
            <p className="text-xs text-[#6B7A92]">MRN</p>
            <p className="text-sm font-medium text-[#1A2B45] mt-1">
              {patient.mrn}
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
            <User size={18} />
          </div>

          <div>
            <p className="text-xs text-[#6B7A92]">Full Name</p>
            <p className="text-sm font-medium text-[#1A2B45] mt-1">
              {patient.fullName}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
            <Phone size={18} />
          </div>

          <div>
            <p className="text-xs text-[#6B7A92]">Phone</p>
            <p className="text-sm font-medium text-[#1A2B45] mt-1">
              {patient.phone || "—"}
            </p>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
            <Calendar size={18} />
          </div>

          <div>
            <p className="text-xs text-[#6B7A92]">Date of Birth</p>
            <p className="text-sm font-medium text-[#1A2B45] mt-1">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
            <User size={18} />
          </div>

          <div>
            <p className="text-xs text-[#6B7A92]">Gender</p>
            <p className="text-sm font-medium text-[#1A2B45] mt-1">
              {genderLabel}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
            <MapPin size={18} />
          </div>

          <div>
            <p className="text-xs text-[#6B7A92]">Address</p>
            <p className="text-sm font-medium text-[#1A2B45] mt-1">
              {patient.address || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="px-6 pb-6">
        <div className="border border-[#E2E8EF] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} className="text-[#1A6BCC]" />

            <h3 className="text-sm font-semibold text-[#1A2B45]">Notes</h3>
          </div>

          <p className="text-sm leading-6 text-[#6B7A92]">
            {patient.notes || "No notes available."}
          </p>
        </div>
      </div>

      {/* Appointments */}
      <div className="px-6 pb-6">
        <div className="border border-[#E2E8EF] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#1A6BCC]" />

              <h3 className="text-sm font-semibold text-[#1A2B45]">
                Appointments
              </h3>
            </div>

            <span className="text-xs text-[#6B7A92]">
              {appointments.length} total
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-sm text-[#6B7A92]">
                No appointments available.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => {
                const status = appointment.status;

                return (
                  <div
                    key={appointment.id}
                    className="border border-[#E2E8EF] rounded-lg p-4 bg-[#F8FAFB]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Date */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
                          <Calendar size={17} />
                        </div>

                        <div>
                          <p className="text-xs text-[#6B7A92]">Date</p>

                          <p className="text-sm font-medium text-[#1A2B45] mt-1">
                            {formatAppointmentDate(appointment.appointmentDate)}
                          </p>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
                          <Clock size={17} />
                        </div>

                        <div>
                          <p className="text-xs text-[#6B7A92]">Time</p>

                          <p className="text-sm font-medium text-[#1A2B45] mt-1">
                            {formatAppointmentTime(appointment.appointmentTime)}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-xs text-[#6B7A92] mb-1">Status</p>

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            statusStyles[status] ??
                            "bg-[#F2F4F7] text-[#475467]"
                          }`}
                        >
                          {statusLabels[status] ?? status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="px-6 py-4 bg-[#F8FAFB] border-t border-[#E2E8EF]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#6B7A92]">
          <span>Registered: {createdAt}</span>

          <span>
            {patient.visits?.length ?? 0} visits · {appointments.length}{" "}
            appointments
          </span>
        </div>
      </div>
    </div>
  );
}
