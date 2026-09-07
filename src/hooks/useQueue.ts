import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchQueue,
  fetchQueueEntry,
  checkIn,
  reserveQueueSlot,
  callNext,
  resetQueue,
  serveEntry,
  skipEntry,
  recallEntry,
  cancelEntry,
  startEntry,
} from "../services/queue";
import type {
  CheckInPayload,
  ReserveQueuePayload,
  QueueListParams,
} from "../types/queue";

export const QUEUE_KEY = "queue";

export function useQueue(params?: QueueListParams) {
  return useQuery({
    queryKey: [QUEUE_KEY, "list", params],
    queryFn: () => fetchQueue(params),
  });
}

export function useQueueEntry(id: string) {
  return useQuery({
    queryKey: [QUEUE_KEY, "entry", id],
    queryFn: () => fetchQueueEntry(id),
    enabled: !!id,
  });
}

function useQueueInvalidator() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: [QUEUE_KEY] });
}

export function useCheckIn() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (payload: CheckInPayload) => checkIn(payload),
    onSuccess: invalidate,
  });
}

export function useReserveQueue() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (payload: ReserveQueuePayload) => reserveQueueSlot(payload),
    onSuccess: invalidate,
  });
}

export function useCallNext() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: callNext,
    onSuccess: invalidate,
  });
}

export function useResetQueue() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: resetQueue,
    onSuccess: invalidate,
  });
}

export function useServeEntry() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (id: string) => serveEntry(id),
    onSuccess: invalidate,
  });
}

export function useSkipEntry() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (id: string) => skipEntry(id),
    onSuccess: invalidate,
  });
}

export function useRecallEntry() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (id: string) => recallEntry(id),
    onSuccess: invalidate,
  });
}

export function useCancelEntry() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (id: string) => cancelEntry(id),
    onSuccess: invalidate,
  });
}

export function useStartEntry() {
  const invalidate = useQueueInvalidator();
  return useMutation({
    mutationFn: (id: string) => startEntry(id),
    onSuccess: invalidate,
  });
}
