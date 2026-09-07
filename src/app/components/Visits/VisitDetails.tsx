// src/modules/visits/components/VisitDetails.tsx

"use client";

import {
  Calendar,
  Clock,
  FileText,
  Hash,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { Visit } from "../../../types/visit";

type Props = {
  visit: Visit;
  onClose?: () => void;
};

const appointmentStatusStyles: Record<string, string> = {
  SCHEDULED: "bg-[#FFF7E6] text-[#B54708]",
  CONFIRMED: "bg-[#ECFDF3] text-[#027A48]",
  COMPLETED: "bg-[#EBF3FF] text-[#1A6BCC]",
  CANCELLED: "bg-[#FEF3F2] text-[#D92D20]",
  NO_SHOW: "bg-[#F2F4F7] text-[#475467]",
};

const appointmentStatusLabels: Record<string, string> = {
  SCHEDULED: "Scheduled",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

const queueStatusStyles: Record<string, string> = {
  WAITING: "bg-[#FFF7E6] text-[#B54708]",
  CALLED: "bg-[#EBF3FF] text-[#1A6BCC]",
  SERVING: "bg-[#F0FDF4] text-[#15803D]",
  SERVED: "bg-[#ECFDF3] text-[#027A48]",
  SKIPPED: "bg-[#F2F4F7] text-[#475467]",
};

const queueStatusLabels: Record<string, string> = {
  WAITING: "Waiting",
  CALLED: "Called",
  SERVING: "Serving",
  SERVED: "Served",
  SKIPPED: "Skipped",
};

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC] shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-[#6B7A92]">{label}</p>
        <p className="text-sm font-medium text-[#1A2B45] mt-1">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function SectionBlock({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="border border-[#E2E8EF] rounded-xl p-4">
      <p className="text-xs text-[#6B7A92] mb-2">{label}</p>
      <p className="text-sm leading-6 text-[#344054]">{value || "—"}</p>
    </div>
  );
}

export default function VisitDetails({ visit, onClose }: Props) {
  const visitDate = visit.visitDate
    ? new Date(visit.visitDate).toLocaleDateString("en-GB")
    : "—";

  const startedAt = visit.startedAt
    ? new Date(visit.startedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const completedAt = visit.completedAt
    ? new Date(visit.completedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const followUpDate = visit.followUpDate
    ? new Date(visit.followUpDate).toLocaleDateString("en-GB")
    : "—";

  const createdAt = visit.createdAt
    ? new Date(visit.createdAt).toLocaleString("en-GB")
    : "—";

  const updatedAt = visit.updatedAt
    ? new Date(visit.updatedAt).toLocaleString("en-GB")
    : "—";

  const visitStatusLabel = visit.completedAt
    ? "Completed"
    : visit.startedAt
    ? "In Progress"
    : "Pending";

  const visitStatusStyle = visit.completedAt
    ? "bg-[#ECFDF3] text-[#027A48]"
    : visit.startedAt
    ? "bg-[#EBF3FF] text-[#1A6BCC]"
    : "bg-[#FFF7E6] text-[#B54708]";

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8EF]">
        <div>
          <p className="text-xs text-[#6B7A92] uppercase tracking-wider">
            Visit Details
          </p>
          <h2 className="text-2xl font-bold text-[#1A2B45] mt-1">
            {visit.patient.fullName}
          </h2>
          <p className="text-sm text-[#6B7A92] mt-1">Visit on {visitDate}</p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${visitStatusStyle}`}
          >
            {visitStatusLabel}
          </span>

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
      </div>

      <div className="p-6 space-y-6">
        {/* Patient Information */}
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B45] mb-4">
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoRow
              icon={User}
              label="Full Name"
              value={visit.patient.fullName}
            />
            <InfoRow icon={Phone} label="Phone" value={visit.patient.phone} />
            <InfoRow icon={Hash} label="MRN" value={visit.patient.mrn} />
          </div>
        </div>

        {/* Visit Information */}
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B45] mb-4">
            Visit Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InfoRow icon={Calendar} label="Visit Date" value={visitDate} />
            <InfoRow
              icon={Calendar}
              label="Follow-up Date"
              value={followUpDate}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBlock
              label="Chief Complaint"
              value={visit.chiefComplaint}
            />
            <SectionBlock label="Diagnosis" value={visit.diagnosis} />
            <SectionBlock label="Treatment" value={visit.treatment} />
            <SectionBlock label="Prescription" value={visit.prescription} />
          </div>
          {visit.notes && (
            <div className="mt-4">
              <SectionBlock label="Notes" value={visit.notes} />
            </div>
          )}
        </div>

        {/* Timing */}
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B45] mb-4">Timing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow icon={Clock} label="Started At" value={startedAt} />
            <InfoRow icon={Clock} label="Completed At" value={completedAt} />
          </div>
        </div>

        {/* Created / Updated */}
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B45] mb-4">
            Record Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow
              icon={User}
              label="Created By"
              value={visit.createdBy.fullName}
            />
            <InfoRow
              icon={User}
              label="Updated By"
              value={visit.updatedBy?.fullName}
            />
            <InfoRow icon={Clock} label="Created At" value={createdAt} />
            <InfoRow icon={Clock} label="Updated At" value={updatedAt} />
          </div>
        </div>

        {/* Appointment */}
        {visit.appointment && (
          <div>
            <h3 className="text-sm font-semibold text-[#1A2B45] mb-4">
              Linked Appointment
            </h3>
            <div className="border border-[#E2E8EF] rounded-xl p-4 bg-[#F8FAFB]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <InfoRow
                  icon={Calendar}
                  label="Appointment Date"
                  value={new Date(
                    visit.appointment.appointmentDate
                  ).toLocaleDateString("en-GB")}
                />
                <InfoRow
                  icon={Clock}
                  label="Appointment Time"
                  value={new Date(
                    visit.appointment.appointmentTime
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC] shrink-0">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7A92]">Status</p>
                    <span
                      className={`inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        appointmentStatusStyles[visit.appointment.status] ??
                        "bg-[#F2F4F7] text-[#475467]"
                      }`}
                    >
                      {appointmentStatusLabels[visit.appointment.status] ??
                        visit.appointment.status}
                    </span>
                  </div>
                </div>
                <InfoRow
                  icon={FileText}
                  label="Notes"
                  value={visit.appointment.notes}
                />
              </div>
            </div>
          </div>
        )}

        {/* Queue Entry */}
        {visit.queueEntry && (
          <div>
            <h3 className="text-sm font-semibold text-[#1A2B45] mb-4">
              Linked Queue Entry
            </h3>
            <div className="border border-[#E2E8EF] rounded-xl p-4 bg-[#F8FAFB]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <InfoRow
                  icon={Hash}
                  label="Queue Number"
                  value={String(visit.queueEntry.queueNumber)}
                />
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC] shrink-0">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7A92]">Status</p>
                    <span
                      className={`inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        queueStatusStyles[visit.queueEntry.status] ??
                        "bg-[#F2F4F7] text-[#475467]"
                      }`}
                    >
                      {queueStatusLabels[visit.queueEntry.status] ??
                        visit.queueEntry.status}
                    </span>
                  </div>
                </div>
                <InfoRow
                  icon={Clock}
                  label="Called At"
                  value={
                    visit.queueEntry.calledAt
                      ? new Date(visit.queueEntry.calledAt).toLocaleTimeString(
                          "en-US",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : null
                  }
                />
                <InfoRow
                  icon={Clock}
                  label="Served At"
                  value={
                    visit.queueEntry.servedAt
                      ? new Date(visit.queueEntry.servedAt).toLocaleTimeString(
                          "en-US",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : null
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
