import { useQuery } from "@tanstack/react-query";
import { fetchQueueStatistics } from "../services/queue";
import { QUEUE_KEY } from "./useQueue";

export function useQueueStatistics(date?: string) {
  return useQuery({
    queryKey: [QUEUE_KEY, "statistics", date],
    queryFn: () => fetchQueueStatistics(date),
  });
}
