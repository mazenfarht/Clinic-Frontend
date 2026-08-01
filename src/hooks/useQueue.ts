import { useQuery } from "@tanstack/react-query";
import { getQueue } from "../services/queue";
import { Patient } from "../types/patient";

type QueueData = {
  currentPatient: Patient | null;
  waiting: Patient[];
  done: Patient[];
};

export function useQueue(date: string) {
  const query = useQuery<QueueData>({
    queryKey: ["queue", date],

    queryFn: async () => {
      const data = await getQueue(date);

      return {
        currentPatient: data?.currentPatient ?? null,
        waiting: data?.waiting ?? [],
        done: data?.done ?? [],
      };
    },

    enabled: !!date,

    // مؤقتًا أثناء تطوير الـ Backend
    refetchInterval: 30000,

    // لا تعمل request لما ترجع للتاب
    refetchOnWindowFocus: false,
  });

  const queue: QueueData = {
    currentPatient: query.data?.currentPatient ?? null,
    waiting: query.data?.waiting ?? [],
    done: query.data?.done ?? [],
  };

  const fullQueue = [
    ...(queue.currentPatient ? [queue.currentPatient] : []),
    ...queue.waiting,
    ...queue.done,
  ];

  return {
    queue,
    loading: query.isLoading,
    refetch: query.refetch,
    fullQueue,
  };
}
