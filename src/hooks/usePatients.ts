import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  restorePatient,
  updatePatient,
} from "../services/patient";

import {
  CreatePatientData,
  PatientsQueryParams,
  UpdatePatientData,
} from "@/src/types/patient";

export function usePatients(params?: PatientsQueryParams) {
  return useQuery({
    queryKey: ["patients", params],

    queryFn: () => getPatients(params),

    placeholderData: (previousData) => previousData,
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patient", id],

    queryFn: () => getPatient(id),

    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePatientData) => createPatient(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatientData }) =>
      updatePatient(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      queryClient.invalidateQueries({
        queryKey: ["patient", variables.id],
      });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePatient(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
}

export function useRestorePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restorePatient(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      queryClient.invalidateQueries({
        queryKey: ["patient", id],
      });
    },
  });
}
