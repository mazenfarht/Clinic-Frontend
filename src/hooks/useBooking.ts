"use client";

import { useState, useCallback } from "react";
import type {
  BookingState,
  BookingStep,
  PatientRegistrationPayload,
  AppointmentResponse,
} from "@/src/types/booking";
import {
  getAvailability,
  lookupPatient,
  registerPatient,
  bookAppointment,
} from "@/src/services/publicBooking";

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: BookingState = {
  step: "SELECT_DATE_TIME",
  selectedDate: "",
  selectedTime: "",
  slots: [],
  loadingSlots: false,
  slotsError: null,

  phone: "",
  lookupLoading: false,
  lookupError: null,

  patientId: null,
  patientName: null,
  isNewPatient: false,

  registrationLoading: false,
  registrationError: null,

  bookingLoading: false,
  bookingError: null,

  appointment: null,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useBooking() {
  const [state, setState] = useState<BookingState>(initialState);

  const patch = (partial: Partial<BookingState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  // ── Step 1: Select date → fetch slots ──────────────────────────────────────

  const selectDate = useCallback(async (date: string) => {
    patch({
      selectedDate: date,
      selectedTime: "",
      slots: [],
      slotsError: null,
      loadingSlots: true,
    });

    try {
      const availability = await getAvailability(date);

      if (!availability.isOpen) {
        patch({
          loadingSlots: false,
          slotsError: "The clinic is closed on this day.",
          slots: [],
        });
        return;
      }

      if (availability.availableSlots.length === 0) {
        patch({
          loadingSlots: false,
          slotsError: "No available slots for this date.",
          slots: [],
        });
        return;
      }

      patch({
        loadingSlots: false,
        slots: availability.availableSlots,
        slotsError: null,
      });
    } catch {
      patch({
        loadingSlots: false,
        slotsError: "Failed to load available slots. Please try again.",
        slots: [],
      });
    }
  }, []);

  // ── Step 2: Select time ────────────────────────────────────────────────────
  const selectTime = useCallback(
    (time: string) => {
      if (!state.slots.includes(time)) {
        patch({
          bookingError: "This appointment time is no longer available.",
        });
        return;
      }

      patch({
        selectedTime: time,
        bookingError: null,
      });
    },
    [state.slots]
  );

  // ── Step 3: Open phone modal ───────────────────────────────────────────────

  const openPhoneModal = useCallback(() => {
    patch({ step: "PHONE_MODAL", lookupError: null, phone: "" });
  }, []);

  const closePhoneModal = useCallback(() => {
    patch({ step: "SELECT_DATE_TIME" });
  }, []);

  // ── Step 4: Lookup patient by phone ────────────────────────────────────────
  const submitPhone = useCallback(
    async (phone: string) => {
      patch({
        phone,
        lookupLoading: true,
        lookupError: null,
        bookingError: null,
      });

      try {
        const result = await lookupPatient({ phone });

        // Existing patient
        if (result.exists && result.patientId) {
          patch({
            lookupLoading: false,
            patientId: result.patientId,
            patientName: result.fullName ?? null,
            isNewPatient: false,
            bookingLoading: true,
          });

          try {
            const appointment = await bookAppointment({
              patientId: result.patientId,
              appointmentDate: state.selectedDate,
              appointmentTime: state.selectedTime,
            });

            patch({
              bookingLoading: false,
              appointment,
              step: "SUCCESS",
            });
          } catch (err: unknown) {
            const message = (
              err as {
                response?: {
                  data?: {
                    message?: string;
                  };
                };
              }
            )?.response?.data?.message;

            patch({
              bookingLoading: false,
              lookupError:
                message ?? "You already have an appointment on this day.",
            });
          }

          return;
        }

        // New patient
        patch({
          lookupLoading: false,
          isNewPatient: true,
          step: "REGISTER_PATIENT",
        });
      } catch {
        patch({
          lookupLoading: false,
          lookupError: "Failed to look up patient. Please try again.",
        });
      }
    },
    [state.selectedDate, state.selectedTime]
  );
  // ── Step 5: Register new patient ───────────────────────────────────────────

  const submitRegistration = useCallback(
    async (data: Omit<PatientRegistrationPayload, "phone">) => {
      patch({ registrationLoading: true, registrationError: null });

      try {
        const result = await registerPatient({
          ...data,
          phone: state.phone,
        });

        patch({
          registrationLoading: false,
          patientId: result.patientId,
          patientName: result.fullName,
          step: "BOOKING_SUMMARY",
        });
      } catch {
        patch({
          registrationLoading: false,
          registrationError:
            "Registration failed. Please check your details and try again.",
        });
      }
    },
    [state.phone]
  );

  // ── Step 6: Confirm appointment ────────────────────────────────────────────

  const confirmBooking = useCallback(
    async (notes?: string) => {
      if (!state.patientId || !state.selectedDate || !state.selectedTime)
        return;

      patch({ bookingLoading: true, bookingError: null });

      try {
        const appointment: AppointmentResponse = await bookAppointment({
          patientId: state.patientId,
          appointmentDate: state.selectedDate,
          appointmentTime: state.selectedTime,
          notes,
        });

        patch({
          bookingLoading: false,
          appointment,
          step: "SUCCESS",
        });
      } catch (err: unknown) {
        const message = (err as { response?: { data?: { message?: string } } })
          ?.response?.data?.message;

        patch({
          bookingLoading: false,
          bookingError:
            message ?? "Booking failed. The slot may no longer be available.",
        });
      }
    },
    [state.patientId, state.selectedDate, state.selectedTime]
  );

  // ── Reset ──────────────────────────────────────────────────────────────────

  const reset = useCallback(() => setState(initialState), []);

  const goToStep = useCallback((step: BookingStep) => patch({ step }), []);

  return {
    ...state,
    selectDate,
    selectTime,
    openPhoneModal,
    closePhoneModal,
    submitPhone,
    submitRegistration,
    confirmBooking,
    reset,
    goToStep,
  };
}
