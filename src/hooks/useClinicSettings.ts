import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getClinicSettings,
  updateClinicSettings,
} from "../services/clinicSettings";
import { UpdateClinicSettingsData } from "@/src/types/clinic";

export function useClinicSettings() {
  return useQuery({
    queryKey: ["clinic-settings"],
    queryFn: getClinicSettings,
  });
}

export function useUpdateClinicSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateClinicSettingsData) => updateClinicSettings(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinic-settings"],
      });
    },
  });
}
