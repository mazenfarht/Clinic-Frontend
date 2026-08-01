import { api } from "../lib/axios";

import {
  CreatePatientData,
  Patient,
  PatientDetails,
  PatientsQueryParams,
  PatientsResponse,
  UpdatePatientData,
} from "@/src/types/patient";

export const getPatients = async (
  params?: PatientsQueryParams
): Promise<PatientsResponse> => {
  const response = await api.get("/patients", { params });
  return { data: response.data.data, meta: response.data.meta };
};

export const getPatient = async (id: string): Promise<PatientDetails> => {
  const response = await api.get(`/patients/${id}`);
  return response.data.data;
};

export const createPatient = async (
  data: CreatePatientData
): Promise<Patient> => {
  const response = await api.post("/patients", data);
  return response.data.data;
};

export const updatePatient = async (
  id: string,
  data: UpdatePatientData
): Promise<Patient> => {
  const response = await api.patch(`/patients/${id}`, data);
  return response.data.data;
};

export const deletePatient = async (id: string) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

export const restorePatient = async (id: string): Promise<Patient> => {
  const response = await api.patch(`/patients/${id}/restore`);
  return response.data.data;
};
