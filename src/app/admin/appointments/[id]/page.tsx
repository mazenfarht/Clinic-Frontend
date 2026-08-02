"use client";

// src/app/appointments/[id]/page.tsx

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  User,
  CalendarDays,
  Clock,
  FileText,
  Stethoscope,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getAppointmentById } from "@/src/services/appointment";
import AppointmentStatus from "../../../components/Appointments/AppointmentStatus";
import type { AppointmentDetail } from "@/src/types/appointment";
import {
  parseDate,
  parseTime,
  formatDateLong,
  formatTime12,
} from "@/src/types/appointment";

interface PageProps {
  // In Next.js 15, params is a Promise — must be unwrapped with React.use()
  params: Promise<{ id: string }>;
}

export default function AppointmentDetailPage({ params }: PageProps) {
  const router = useRouter();

  // Unwrap the async params with React.use() — this is the correct pattern for
  // Next.js 15 client components. Accessing params.id directly would return
  // undefined, causing a 404.
  const { id } = use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointments", "detail", id],
    queryFn: () => getAppointmentById(id),
    enabled: !!id,
    staleTime: 0,
    retry: 1,
  });

  const appointment: AppointmentDetail | undefined = data?.data;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Back button */}
        <button
          onClick={() => router.push("/admin/appointments")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to appointments
        </button>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={28} className="animate-spin text-slate-400" />
          </div>
        )}

        {/* Error / not found */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <AlertCircle size={32} className="text-red-400" />
            <p className="text-sm font-medium text-slate-700">
              Appointment not found or could not be loaded.
            </p>
            <button
              onClick={() => router.push("/admin/appointments")}
              className="mt-2 px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Return to appointments
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && appointment && (
          <>
            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Appointment details
                </h1>
                {/* <p className="text-xs text-slate-400 mt-1">
                  ID: {appointment.id}
                </p> */}
              </div>
              <AppointmentStatus status={appointment.status} size="md" />
            </div>

            {/* Appointment section */}
            <Section title="Appointment">
              <DetailRow
                icon={<User size={14} />}
                label="Patient"
                value={appointment.patient.fullName}
              />
              <DetailRow
                icon={<User size={14} />}
                label="Phone"
                value={appointment.patient.phone}
              />
              <DetailRow
                icon={<User size={14} />}
                label="MRN"
                value={appointment.patient.mrn}
              />
              <DetailRow
                icon={<CalendarDays size={14} />}
                label="Date"
                value={formatDateLong(parseDate(appointment.appointmentDate))}
              />
              <DetailRow
                icon={<Clock size={14} />}
                label="Time"
                value={formatTime12(parseTime(appointment.appointmentTime))}
              />
              {appointment.notes && (
                <DetailRow
                  icon={<FileText size={14} />}
                  label="Notes"
                  value={appointment.notes}
                />
              )}
            </Section>

            {/* Visit section — only shown when a linked visit exists */}
            {appointment.visit && (
              <Section title="Visit record">
                {appointment.visit.chiefComplaint && (
                  <DetailRow
                    icon={<Stethoscope size={14} />}
                    label="Chief complaint"
                    value={appointment.visit.chiefComplaint}
                  />
                )}
                {appointment.visit.diagnosis && (
                  <DetailRow
                    icon={<Stethoscope size={14} />}
                    label="Diagnosis"
                    value={appointment.visit.diagnosis}
                  />
                )}
                {appointment.visit.treatment && (
                  <DetailRow
                    icon={<FileText size={14} />}
                    label="Treatment"
                    value={appointment.visit.treatment}
                  />
                )}
                {appointment.visit.prescription && (
                  <DetailRow
                    icon={<FileText size={14} />}
                    label="Prescription"
                    value={appointment.visit.prescription}
                  />
                )}
                {appointment.visit.notes && (
                  <DetailRow
                    icon={<FileText size={14} />}
                    label="Visit notes"
                    value={appointment.visit.notes}
                  />
                )}
              </Section>
            )}

            {/* Audit section */}
            <Section title="Audit">
              {appointment.createdBy && (
                <DetailRow
                  icon={<User size={14} />}
                  label="Created by"
                  value={appointment.createdBy.fullName}
                />
              )}
              <DetailRow
                icon={<Clock size={14} />}
                label="Created at"
                value={new Date(appointment.createdAt).toLocaleString("en-US")}
              />
              {appointment.updatedBy && (
                <DetailRow
                  icon={<User size={14} />}
                  label="Last updated by"
                  value={appointment.updatedBy.fullName}
                />
              )}
              <DetailRow
                icon={<Clock size={14} />}
                label="Last updated"
                value={new Date(appointment.updatedAt).toLocaleString("en-US")}
              />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
        {title}
      </p>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
        {children}
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <span className="text-slate-400 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-800 mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}
