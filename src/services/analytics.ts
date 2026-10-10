import { api } from "../lib/axios";
import {
  AnalyticsData,
  AnalyticsQueryParams,
  AnalyticsResponse,
} from "@/src/types/analytics";

export const getAnalytics = async (
  params: AnalyticsQueryParams
): Promise<AnalyticsData> => {
  const response = await api.get<AnalyticsResponse>("/dashboard/analytics", {
    params,
  });
  return response.data.data;
};
