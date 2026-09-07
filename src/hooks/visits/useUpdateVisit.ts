// src/modules/visits/hooks/useUpdateVisit.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { visitService } from "../../services/visit";
import { UpdateVisitPayload } from "../../types/visit";
import { VISITS_QUERY_KEY } from "./useVisits";

export const useUpdateVisit = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVisitPayload) =>
      visitService.updateVisit(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VISITS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [VISITS_QUERY_KEY, id] });
    },
  });
};
