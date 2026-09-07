// src/modules/visits/components/VisitForm.tsx

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  CreateVisitPayload,
  UpdateVisitPayload,
  Visit,
} from "../../../types/visit";

type Mode = "create" | "edit";

type Props =
  | {
      mode: "create";
      onSubmit: (data: CreateVisitPayload) => void;
      onClose: () => void;
      loading?: boolean;
      visit?: never;
    }
  | {
      mode: "edit";
      visit: Visit;
      onSubmit: (data: UpdateVisitPayload) => void;
      onClose: () => void;
      loading?: boolean;
    };

export default function VisitForm(props: Props) {
  const { mode, onClose, loading = false } = props;

  const visit = mode === "edit" ? props.visit : null;

  const [patientId, setPatientId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [queueEntryId, setQueueEntryId] = useState("");
  const [visitDate, setVisitDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [chiefComplaint, setChiefComplaint] = useState(
    visit?.chiefComplaint ?? ""
  );
  const [diagnosis, setDiagnosis] = useState(visit?.diagnosis ?? "");
  const [treatment, setTreatment] = useState(visit?.treatment ?? "");
  const [prescription, setPrescription] = useState(visit?.prescription ?? "");
  const [notes, setNotes] = useState(visit?.notes ?? "");
  const [followUpDate, setFollowUpDate] = useState(
    visit?.followUpDate ? visit.followUpDate.slice(0, 10) : ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "create") {
      if (!patientId.trim()) return;

      const payload: CreateVisitPayload = {
        patientId: patientId.trim(),
        visitDate: visitDate || undefined,
        chiefComplaint: chiefComplaint.trim() || undefined,
        diagnosis: diagnosis.trim() || undefined,
        treatment: treatment.trim() || undefined,
        prescription: prescription.trim() || undefined,
        notes: notes.trim() || undefined,
        appointmentId: appointmentId.trim() || undefined,
        queueEntryId: queueEntryId.trim() || undefined,
      };

      (props as { onSubmit: (d: CreateVisitPayload) => void }).onSubmit(
        payload
      );
    } else {
      const payload: UpdateVisitPayload = {
        chiefComplaint: chiefComplaint.trim() || undefined,
        diagnosis: diagnosis.trim() || undefined,
        treatment: treatment.trim() || undefined,
        prescription: prescription.trim() || undefined,
        notes: notes.trim() || undefined,
        followUpDate: followUpDate || undefined,
      };

      (props as { onSubmit: (d: UpdateVisitPayload) => void }).onSubmit(
        payload
      );
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm text-[#1A2B45] outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition placeholder:text-[#98A2B3]";

  const textareaClass =
    "w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm text-[#1A2B45] outline-none resize-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition placeholder:text-[#98A2B3]";

  const labelClass = "block text-sm font-medium text-[#1A2B45] mb-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8EF] shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-[#1A2B45]">
              {mode === "create" ? "New Visit" : "Edit Visit"}
            </h2>
            <p className="text-sm text-[#6B7A92] mt-1">
              {mode === "create"
                ? "Create a new patient visit record"
                : "Update visit information"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg text-[#6B7A92] hover:bg-[#F2F4F7] transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 overflow-y-auto flex-1"
        >
          {/* Create-only fields */}
          {mode === "create" && (
            <>
              {/* Patient ID */}
              <div>
                <label className={labelClass}>
                  Patient ID <span className="text-[#D92D20]">*</span>
                </label>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="Enter patient UUID"
                  required
                  className={inputClass}
                />
              </div>

              {/* Appointment ID */}
              <div>
                <label className={labelClass}>Appointment ID (optional)</label>
                <input
                  type="text"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                  placeholder="Enter appointment UUID"
                  className={inputClass}
                />
              </div>

              {/* Queue Entry ID */}
              <div>
                <label className={labelClass}>Queue Entry ID (optional)</label>
                <input
                  type="text"
                  value={queueEntryId}
                  onChange={(e) => setQueueEntryId(e.target.value)}
                  placeholder="Enter queue entry UUID"
                  className={inputClass}
                />
              </div>

              {/* Visit Date */}
              <div>
                <label className={labelClass}>Visit Date</label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </>
          )}

          {/* Edit-only: show read-only patient & date */}
          {mode === "edit" && visit && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Patient</label>
                <input
                  type="text"
                  value={visit.patient.fullName}
                  disabled
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm text-[#6B7A92] bg-[#F2F4F7] outline-none"
                />
              </div>
              <div>
                <label className={labelClass}>Visit Date</label>
                <input
                  type="text"
                  value={new Date(visit.visitDate).toLocaleDateString("en-GB")}
                  disabled
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm text-[#6B7A92] bg-[#F2F4F7] outline-none"
                />
              </div>
            </div>
          )}

          {/* Chief Complaint */}
          <div>
            <label className={labelClass}>Chief Complaint</label>
            <textarea
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder="Describe the main complaint..."
              rows={2}
              maxLength={500}
              className={textareaClass}
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label className={labelClass}>Diagnosis</label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis..."
              rows={2}
              maxLength={1000}
              className={textareaClass}
            />
          </div>

          {/* Treatment */}
          <div>
            <label className={labelClass}>Treatment</label>
            <textarea
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              placeholder="Describe the treatment plan..."
              rows={2}
              maxLength={1000}
              className={textareaClass}
            />
          </div>

          {/* Prescription */}
          <div>
            <label className={labelClass}>Prescription</label>
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription details..."
              rows={2}
              maxLength={1000}
              className={textareaClass}
            />
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              maxLength={1000}
              className={textareaClass}
            />
          </div>

          {/* Follow-up Date (edit only) */}
          {mode === "edit" && (
            <div>
              <label className={labelClass}>Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg border border-[#D0D5DD] text-[#344054] hover:bg-[#F8FAFB] transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                ? "Create Visit"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
