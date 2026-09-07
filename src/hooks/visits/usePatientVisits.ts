// src/modules/visits/hooks/usePatientVisits.ts

import { useQuery } from "@tanstack/react-query";
import { visitService } from "../../services/visit";
import { VisitFilters } from "../../types/visit";
import { VISITS_QUERY_KEY } from "./useVisits";

export const usePatientVisits = (patientId: string, filters?: VisitFilters) => {
  return useQuery({
    queryKey: [VISITS_QUERY_KEY, "patient", patientId, filters],
    queryFn: () => visitService.getPatientVisits(patientId, filters),
    enabled: !!patientId,
  });
};
