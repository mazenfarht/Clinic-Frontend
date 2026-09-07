// src/modules/visits/hooks/useCreateVisit.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { visitService } from "../../services/visit";
import { CreateVisitPayload } from "../../types/visit";
import { VISITS_QUERY_KEY } from "./useVisits";

export const useCreateVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVisitPayload) =>
      visitService.createVisit(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VISITS_QUERY_KEY] });
    },
  });
};
