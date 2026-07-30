"use client";

import BookingLeftPanel from "../components/book/BookingLeftPanel";
import BookingForm from "../components/book/BookingForm";

export default function Book() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-[#F7FAFC] to-[#EEF8F7] p-6 lg:p-10">
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-3rem)]
          max-w-7xl
          overflow-hidden
          rounded-[36px]
          bg-white
          shadow-[0_30px_80px_rgba(15,23,42,0.12)]
        "
      >
        {/* Left Panel */}
        <BookingLeftPanel />

        {/* Right Panel */}
        <section className="flex flex-1 items-center justify-center bg-[#FCFDFE] p-8 md:p-12 lg:p-16">
          <BookingForm />
        </section>
      </div>
    </main>
  );
}
