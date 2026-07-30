"use client";

import { ArrowRight, Loader2 } from "lucide-react";

type BookingButtonProps = {
  loading: boolean;
};

export default function BookingButton({ loading }: BookingButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        group
        relative
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-[#1A6BCC]
        to-[#0EB5A2]
        px-6
        font-semibold
        text-white
        shadow-lg
        shadow-cyan-200/40
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-cyan-300/40

        active:translate-y-0

        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:hover:translate-y-0
      "
    >
      {/* Shine Effect */}

      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-transform
          duration-1000
          group-hover:translate-x-full
        "
      />

      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />

          <span>Booking Appointment...</span>
        </>
      ) : (
        <>
          <span>Book Appointment</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
}
