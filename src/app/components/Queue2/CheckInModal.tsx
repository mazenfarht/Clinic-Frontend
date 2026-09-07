"use client";

import { Modal, Field, inputCls, Spinner } from "./modal-utils";
import { useState, useEffect, useRef } from "react";
import { useCheckIn } from "../../../hooks/useQueue";
import { usePatientSearch } from "../../../hooks/usePatientSearch";
import { useAppointmentLookup } from "../../../hooks/useAppointmentLookup";
import type { CheckInPayload } from "../../../types/queue";
import type { Patient } from "@/src/types/patient";
import type { Appointment } from "@/src/types/appointment";
import { parseTime, formatTime12 } from "@/src/types/appointment";

interface CheckInModalProps {
  onClose: () => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function CheckInModal({ onClose }: CheckInModalProps) {
  // ── Patient search state ──────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientError, setPatientError] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Appointment state ─────────────────────────────────────────
  const [appointmentDate, setAppointmentDate] = useState(todayISO());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [skipAppointment, setSkipAppointment] = useState(false);

  // ── Clinical info (unchanged) ─────────────────────────────────
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [notes, setNotes] = useState("");

  const checkIn = useCheckIn();

  const {
    data: patientResults,
    isFetching: searchingPatients,
    isError: patientSearchError,
  } = usePatientSearch(searchQuery);

  const {
    data: appointmentResults,
    isFetching: loadingAppointments,
    isError: appointmentSearchError,
  } = useAppointmentLookup(selectedPatient?.id ?? "", appointmentDate);

  // Reset appointment selection when date or patient changes
  useEffect(() => {
    setSelectedAppointment(null);
    setSkipAppointment(false);
  }, [appointmentDate, selectedPatient]);

  // Focus search on open
  useEffect(() => {
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, []);

  function handleSelectPatient(patient: Patient) {
    setSelectedPatient(patient);
    setPatientError("");
    setSearchQuery(patient.fullName);
  }

  function handleClearPatient() {
    setSelectedPatient(null);
    setSearchQuery("");
    setPatientError("");
    setSelectedAppointment(null);
    setSkipAppointment(false);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }

  function validate(): boolean {
    if (!selectedPatient) {
      setPatientError("Please search and select a patient.");
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validate()) return;

    const payload: CheckInPayload = {
      patientId: selectedPatient!.id,
      ...(selectedAppointment && !skipAppointment
        ? { appointmentId: selectedAppointment.id }
        : {}),
      ...(chiefComplaint.trim()
        ? { chiefComplaint: chiefComplaint.trim() }
        : {}),
      ...(notes.trim() ? { notes: notes.trim() } : {}),
    };

    checkIn.mutate(payload, {
      onSuccess: () => onClose(),
    });
  }

  const showDropdown =
    !selectedPatient &&
    searchQuery.trim().length >= 2 &&
    (searchingPatients || patientSearchError || patientResults !== undefined);

  const appointments = appointmentResults?.data ?? [];
  const hasAppointments = appointments.length > 0;

  return (
    <Modal onClose={onClose}>
      <h2 className="mb-1 text-lg font-semibold text-gray-900">
        Check In Patient
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        Add a patient to today's queue.
      </p>

      <div className="space-y-4">
        {/* ── Patient Search (replaces Patient ID field) ── */}
        <Field
          label="Search Patient"
          required
          hint="Name, phone, or MRN"
          error={patientError}
        >
          <div className="relative">
            {selectedPatient ? (
              /* Selected patient confirmation */
              <div className="flex items-center justify-between rounded-md border border-green-400 bg-green-50 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedPatient.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    MRN: {selectedPatient.mrn} · {selectedPatient.phone}
                  </p>
                </div>
                <button
                  onClick={handleClearPatient}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  title="Change patient"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPatientError("");
                  }}
                  placeholder="Type name, phone number, or MRN…"
                  className={inputCls(!!patientError)}
                />
                {searchQuery.trim().length >= 2 && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}

            {/* Search results dropdown */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-52 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                {searchingPatients && (
                  <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-gray-500">
                    <Spinner />
                    Searching…
                  </div>
                )}

                {!searchingPatients && patientSearchError && (
                  <div className="px-4 py-3 text-sm text-red-500">
                    Search failed. Please try again.
                  </div>
                )}

                {!searchingPatients &&
                  !patientSearchError &&
                  patientResults?.data.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-400">
                      No patients found for "{searchQuery}".
                    </div>
                  )}

                {!searchingPatients &&
                  !patientSearchError &&
                  patientResults?.data.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => handleSelectPatient(patient)}
                      className="flex w-full flex-col border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {patient.fullName}
                      </span>
                      <span className="text-xs text-gray-500">
                        MRN: {patient.mrn} · {patient.phone}
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>
          {!selectedPatient &&
            searchQuery.trim().length < 2 &&
            !patientError && (
              <p className="mt-1 text-xs text-gray-400">
                Type at least 2 characters to search.
              </p>
            )}
        </Field>

        {/* ── Appointment Date + Lookup (replaces Appointment ID field) ── */}
        {selectedPatient && (
          <>
            <Field label="Appointment Date" hint="Optional">
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className={inputCls(false)}
              />
            </Field>

            {/* Appointment results */}
            <div>
              {loadingAppointments && (
                <div className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500">
                  <Spinner />
                  Looking up appointments…
                </div>
              )}

              {!loadingAppointments && appointmentSearchError && (
                <p className="text-xs text-red-500">
                  Failed to load appointments. You can still continue as
                  walk-in.
                </p>
              )}

              {!loadingAppointments &&
                !appointmentSearchError &&
                !hasAppointments && (
                  <p className="text-xs text-gray-400">
                    No appointments found for this date — patient will be
                    checked in as a walk-in.
                  </p>
                )}

              {!loadingAppointments &&
                !appointmentSearchError &&
                hasAppointments && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-600">
                      Select appointment or continue as walk-in:
                    </p>
                    {appointments.map((appt) => {
                      const isSelected = selectedAppointment?.id === appt.id;
                      const isLinkable =
                        appt.status === "SCHEDULED" ||
                        appt.status === "CONFIRMED";
                      return (
                        <button
                          key={appt.id}
                          onClick={() => {
                            if (!isLinkable) return;
                            setSelectedAppointment(isSelected ? null : appt);
                            setSkipAppointment(false);
                          }}
                          disabled={!isLinkable}
                          className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                            isSelected
                              ? "border-gray-900 bg-gray-900 text-white"
                              : isLinkable
                              ? "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50"
                              : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {formatTime12(parseTime(appt.appointmentTime))}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                isSelected
                                  ? "bg-white/20 text-white"
                                  : appt.status === "SCHEDULED"
                                  ? "bg-amber-100 text-amber-700"
                                  : appt.status === "CONFIRMED"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {appt.status}
                            </span>
                          </div>
                          {appt.notes && (
                            <p
                              className={`mt-0.5 text-xs ${
                                isSelected ? "text-white/80" : "text-gray-500"
                              }`}
                            >
                              {appt.notes}
                            </p>
                          )}
                          {!isLinkable && (
                            <p className="mt-0.5 text-xs text-gray-400">
                              Cannot link — appointment is{" "}
                              {appt.status.toLowerCase()}
                            </p>
                          )}
                        </button>
                      );
                    })}

                    {/* Walk-in option */}
                    <button
                      onClick={() => {
                        setSkipAppointment(true);
                        setSelectedAppointment(null);
                      }}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                        skipAppointment
                          ? "border-gray-900 bg-gray-900 font-medium text-white"
                          : "border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      Continue as walk-in (no appointment)
                    </button>
                  </div>
                )}
            </div>
          </>
        )}

        {/* ── Chief Complaint (unchanged) ── */}
        <Field label="Chief Complaint" hint="Optional">
          <input
            type="text"
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            placeholder="e.g. Headache, Follow-up"
            className={inputCls(false)}
          />
        </Field>

        {/* ── Notes (unchanged) ── */}
        <Field label="Notes" hint="Optional">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes…"
            rows={3}
            className={inputCls(false)}
          />
        </Field>
      </div>

      {checkIn.isError && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {(() => {
            const err = checkIn.error as {
              response?: { data?: { message?: string } };
            };
            const msg = err?.response?.data?.message ?? "";
            if (msg.toLowerCase().includes("already has an active"))
              return "This patient is already in today's queue.";
            if (msg.toLowerCase().includes("already has a visit"))
              return "This appointment already has a visit linked to it.";
            return "Failed to check in patient. Please try again.";
          })()}
        </p>
      )}

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={checkIn.isPending}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={checkIn.isPending}
          className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {checkIn.isPending && <Spinner />}
          Check In
        </button>
      </div>
    </Modal>
  );
}
