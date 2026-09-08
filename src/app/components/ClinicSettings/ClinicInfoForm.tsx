"use client";

import { Building2 } from "lucide-react";

type Props = {
  name: string;
  phone: string;
  email: string;
  address: string;
  onChange: (
    field: "name" | "phone" | "email" | "address",
    value: string
  ) => void;
};

export default function ClinicInfoForm({
  name,
  phone,
  email,
  address,
  onChange,
}: Props) {
  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <Building2 size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Clinic Information
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Basic details about your clinic.
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Clinic Name */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Clinic Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Enter clinic name"
            className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] placeholder:text-[#98A2B3]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] placeholder:text-[#98A2B3]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Enter email address"
            className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] placeholder:text-[#98A2B3]"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-[#1A2B45] mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Enter clinic address"
            className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-lg outline-none focus:border-[#1A6BCC] focus:ring-2 focus:ring-[#1A6BCC]/10 transition text-sm text-[#1A2B45] placeholder:text-[#98A2B3]"
          />
        </div>
      </div>
    </div>
  );
}
