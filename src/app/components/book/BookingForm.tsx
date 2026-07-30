"use client";

import { Formik, Form } from "formik";
import { User } from "lucide-react";

import BookingHeader from "./BookingHeader";
import BookingInput from "./BookingInput";
import DateInput from "./DateInput";
import TimeSlotField from "./TimeSlotField";
import BookingButton from "./BookingButton";
import { useBooking } from "@/src/hooks/useBooking";
import { bookingValidation } from "./validation";

export default function BookingForm() {
  const { fetchSlots, slots, loadingSlots, submit } = useBooking();

  return (
    <div className="w-full max-w-xl">
      <BookingHeader />

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-xl
          shadow-slate-100
        "
      >
        <Formik
          initialValues={{
            name: "",
            date: "",
            slot: "",
          }}
          validationSchema={bookingValidation}
          onSubmit={submit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-7">
              <BookingInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                icon={User}
              />

              <DateInput
                setFieldValue={setFieldValue}
                fetchSlots={fetchSlots}
              />

              <TimeSlotField
                slots={slots}
                loading={loadingSlots}
                selectedSlot={values.slot}
                setFieldValue={setFieldValue}
              />

              <div className="rounded-2xl border border-[#DCEBFF] bg-[#F8FBFE] p-5">
                <h3 className="font-semibold text-[#1A2B45]">
                  Before You Continue
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#6B7A92]">
                  Please review your appointment information carefully before
                  confirming your booking.
                </p>

                <ul className="mt-5 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-[#1A2B45]">
                    <span className="h-2 w-2 rounded-full bg-[#1A6BCC]" />
                    Your appointment will be added to today's queue.
                  </li>

                  <li className="flex items-center gap-3 text-sm text-[#1A2B45]">
                    <span className="h-2 w-2 rounded-full bg-[#0EB5A2]" />
                    Arrive 10 minutes before your scheduled time.
                  </li>

                  <li className="flex items-center gap-3 text-sm text-[#1A2B45]">
                    <span className="h-2 w-2 rounded-full bg-[#1A6BCC]" />
                    Bring any previous medical documents if available.
                  </li>
                </ul>
              </div>
              <BookingButton loading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
