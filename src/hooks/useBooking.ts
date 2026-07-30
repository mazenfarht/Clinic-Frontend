"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { notifySuccess, notifyError } from "@/src/lib/notify";
import { getSlots } from "../services/slot";
import { bookPatient } from "../services/queue";

type BookingValues = {
  name: string;
  date: string;
};

export function useBooking() {
  const router = useRouter();

  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const fetchSlots = async (date: string) => {
    if (!date) {
      setSlots([]);
      return;
    }

    try {
      setLoadingSlots(true);

      const availableSlots = await getSlots(date);

      setSlots(availableSlots);
    } catch (error) {
      notifyError("Unable to load available slots.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const submit = async (values: BookingValues, { setSubmitting }: any) => {
    try {
      await bookPatient({
        name: values.name,
        appointmentDate: values.date,
      });

      notifySuccess("Appointment booked successfully.");

      router.replace("/display");
    } catch (err: any) {
      notifyError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    slots,

    loadingSlots,

    fetchSlots,

    submit,
  };
}
