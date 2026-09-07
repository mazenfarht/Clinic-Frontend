// src/modules/visits/hooks/useVisit.ts

import { useQuery } from "@tanstack/react-query";
import { visitService } from "../../services/visit";
import { VISITS_QUERY_KEY } from "./useVisits";

export const useVisit = (id: string) => {
  return useQuery({
    queryKey: [VISITS_QUERY_KEY, id],
    queryFn: () => visitService.getVisitById(id),
    enabled: !!id,
  });
};
