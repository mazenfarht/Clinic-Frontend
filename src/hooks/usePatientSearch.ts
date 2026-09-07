import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../services/patient";

export const PATIENTS_KEY = "patients";

export function usePatientSearch(search: string) {
  return useQuery({
    queryKey: [PATIENTS_KEY, "search", search],
    queryFn: () => getPatients({ search: search.trim(), limit: 10 }),
    enabled: search.trim().length >= 2,
    staleTime: 30_000,
  });
}
