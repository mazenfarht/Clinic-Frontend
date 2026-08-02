"use client";

import React from "react";
import { Stethoscope } from "lucide-react";

import { useBooking } from "@/src/hooks/useBooking";
import { DatePicker } from "../components/book/DatePicker";
import { TimeSlotPicker } from "../components/book/TimeSlotPicker";
import { PhoneModal } from "../components/book/PhoneModal";
import { PatientRegistrationForm } from "../components/book/PatientRegistrationForm";
import { BookingSummary } from "../components/book/BookingSummary";
import { BookingSuccess } from "../components/book/BookingSuccess";

export default function BookingPage() {
  const booking = useBooking();

  const {
    step,
    selectedDate,
    selectedTime,
    slots,
    loadingSlots,
    slotsError,
    phone,
    lookupLoading,
    lookupError,
    patientName,
    isNewPatient,
    registrationLoading,
    registrationError,
    bookingLoading,
    bookingError,
    appointment,
    selectDate,
    selectTime,
    openPhoneModal,
    closePhoneModal,
    submitPhone,
    submitRegistration,
    confirmBooking,
    goToStep,
    reset,
  } = booking;

  // ─── Success Screen ──────────────────────────────────────────────────────────

  if (step === "SUCCESS" && appointment) {
    return (
      <PageShell>
        <BookingSuccess
          appointment={appointment}
          patientName={patientName}
          onBookAnother={reset}
        />
      </PageShell>
    );
  }

  // ─── Registration Form ───────────────────────────────────────────────────────

  if (step === "REGISTER_PATIENT") {
    return (
      <PageShell>
        <PatientRegistrationForm
          phone={phone}
          loading={registrationLoading}
          error={registrationError}
          onSubmit={submitRegistration}
          onBack={() => goToStep("PHONE_MODAL")}
        />
      </PageShell>
    );
  }

  // ─── Booking Summary ─────────────────────────────────────────────────────────

  if (step === "BOOKING_SUMMARY") {
    return (
      <PageShell>
        <BookingSummary
          patientName={patientName}
          phone={phone}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          loading={bookingLoading}
          error={bookingError}
          onConfirm={confirmBooking}
          onBack={() =>
            goToStep(isNewPatient ? "REGISTER_PATIENT" : "PHONE_MODAL")
          }
        />
      </PageShell>
    );
  }

  // ─── Main Date/Time Selection ────────────────────────────────────────────────

  return (
    <PageShell>
      {/* Phone modal overlay */}
      {step === "PHONE_MODAL" && (
        <PhoneModal
          loading={lookupLoading}
          error={lookupError}
          onSubmit={submitPhone}
          onClose={closePhoneModal}
        />
      )}

      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-200">
            <Stethoscope size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Book an Appointment
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Choose a date and time that works best for you.
          </p>
        </div>

        {/* Date picker */}
        <DatePicker
          value={selectedDate}
          onChange={selectDate}
          loading={loadingSlots}
        />

        {/* Time slot picker */}
        {selectedDate && (
          <TimeSlotPicker
            slots={slots}
            selected={selectedTime}
            loading={loadingSlots}
            error={slotsError}
            onSelect={selectTime}
          />
        )}

        {/* Confirm button */}
        {selectedTime && (
          <button
            type="button"
            onClick={openPhoneModal}
            className="w-full rounded-xl bg-blue-500 px-4 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-600 active:scale-[0.98]"
          >
            Confirm Appointment
          </button>
        )}
      </div>
    </PageShell>
  );
}

// ─── Page Shell ───────────────────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {children}
      </div>
    </main>
  );
}
