"use client";

import { CalendarCheck2, ShieldCheck, Clock3 } from "lucide-react";

const features = [
  {
    icon: CalendarCheck2,
    title: "Quick Booking",
    description:
      "Reserve your appointment in just a few clicks without waiting.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Information",
    description: "Your personal information is encrypted and protected.",
  },
  {
    icon: Clock3,
    title: "Save Your Time",
    description: "Choose your preferred date and reduce clinic waiting time.",
  },
];

export default function BookingFeatures() {
  return (
    <div className="space-y-5">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="
              flex
              items-start
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-white/10
              p-5
              backdrop-blur-lg
              transition-all
              duration-300
              hover:bg-white/15
              hover:-translate-y-1
            "
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Icon size={22} className="text-white" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#D8E8FF]">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
