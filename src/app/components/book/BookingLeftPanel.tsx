"use client";

import Image from "next/image";
import { CalendarCheck2, ShieldCheck, Clock3, Sparkles } from "lucide-react";

export default function BookingLeftPanel() {
  return (
    <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1A2B45] via-[#1A6BCC] to-[#0EB5A2] p-10 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
          <Sparkles size={16} />
          FAST & EASY
        </div>

        {/* Heading */}
        <div className="mt-10">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Book Your
            <br />
            Appointment
          </h1>

          <p className="mt-6 max-w-sm text-base leading-8 text-[#D7E8FF]">
            Schedule your visit in seconds and get the care you deserve with our
            modern clinic management system.
          </p>
        </div>

        {/* Features Card */}
        <div className="mt-12 rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <CalendarCheck2 size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Quick Booking</h3>

                <p className="mt-1 text-sm leading-6 text-[#D8E8FF]">
                  Book your appointment in just a few clicks without waiting.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Secure & Reliable</h3>

                <p className="mt-1 text-sm leading-6 text-[#D8E8FF]">
                  Your information is protected with secure storage and privacy
                  standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Clock3 size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">On-Time Care</h3>

                <p className="mt-1 text-sm leading-6 text-[#D8E8FF]">
                  We value your time and help reduce waiting through organized
                  scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
