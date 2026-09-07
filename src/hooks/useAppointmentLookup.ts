import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/appointment";

export const APPOINTMENTS_KEY = "appointments";

export function useAppointmentLookup(patientId: string, date: string) {
  return useQuery({
    queryKey: [APPOINTMENTS_KEY, "lookup", patientId, date],
    queryFn: async () => {
      const res = await getAppointments({ patientId, date, limit: 10 });
      return res;
    },
    enabled: !!patientId && !!date,
    staleTime: 30_000,
  });
}
