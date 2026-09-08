import { api } from "../lib/axios";
import {
  ClinicSettings,
  ClinicSettingsResponse,
  UpdateClinicSettingsData,
} from "@/src/types/clinic";

export const getClinicSettings = async (): Promise<ClinicSettings> => {
  const response = await api.get<ClinicSettingsResponse>("/clinic-settings");
  return response.data.data;
};

export const updateClinicSettings = async (
  data: UpdateClinicSettingsData
): Promise<ClinicSettings> => {
  const response = await api.patch<ClinicSettingsResponse>(
    "/clinic-settings",
    data
  );
  return response.data.data;
};
