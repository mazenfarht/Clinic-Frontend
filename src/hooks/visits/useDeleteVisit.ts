// src/modules/visits/hooks/useDeleteVisit.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { visitService } from "../../services/visit";
import { VISITS_QUERY_KEY } from "./useVisits";

export const useDeleteVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => visitService.deleteVisit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VISITS_QUERY_KEY] });
    },
  });
};
