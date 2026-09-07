// src/modules/visits/hooks/useVisits.ts

import { useQuery } from "@tanstack/react-query";
import { visitService } from "../../services/visit";
import { VisitFilters } from "../../types/visit";

export const VISITS_QUERY_KEY = "visits";

export const useVisits = (filters?: VisitFilters) => {
  return useQuery({
    queryKey: [VISITS_QUERY_KEY, filters],
    queryFn: () => visitService.getVisits(filters),
  });
};
