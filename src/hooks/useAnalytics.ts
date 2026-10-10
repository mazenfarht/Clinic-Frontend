import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../services/analytics";
import { AnalyticsQueryParams } from "@/src/types/analytics";

export function useAnalytics(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: ["analytics", params.fromDate, params.toDate],
    queryFn: () => getAnalytics(params),
    placeholderData: (previousData) => previousData,
  });
}
