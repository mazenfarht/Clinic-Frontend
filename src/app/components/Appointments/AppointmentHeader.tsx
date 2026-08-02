// src/components/Appointments/AppointmentHeader.tsx

import { CalendarDays } from "lucide-react";

interface AppointmentHeaderProps {
  total?: number;
}

export default function AppointmentHeader({ total }: AppointmentHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <CalendarDays size={20} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Appointments</h1>
          {total !== undefined && (
            <p className="text-sm text-slate-500">
              {total} appointment{total !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
