import { useQuery } from "@tanstack/react-query";
import { fetchQueueStatus } from "../services/queue";
import { QUEUE_KEY } from "./useQueue";

export function useQueueStatus() {
  return useQuery({
    queryKey: [QUEUE_KEY, "status"],
    queryFn: fetchQueueStatus,

    refetchInterval: 15_000,
    staleTime: 10_000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
