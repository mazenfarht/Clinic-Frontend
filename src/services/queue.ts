import api from "../lib/axios";
import type {
  QueueEntry,
  QueueStatusSummary,
  QueueStatistics,
  CheckInPayload,
  ReserveQueuePayload,
  QueueListParams,
  PaginatedQueue,
  ResetQueueResult,
} from "../types/queue";

// ── Queries ───────────────────────────────────────────────────────

export async function fetchQueue(
  params?: QueueListParams
): Promise<PaginatedQueue> {
  const { data } = await api.get("/queue", { params });
  return {
    data: data.data,
    meta: data.meta,
  };
}

export async function fetchQueueStatus(): Promise<QueueStatusSummary> {
  const { data } = await api.get("/queue/status");
  return data.data;
}

export async function fetchQueueStatistics(
  date?: string
): Promise<QueueStatistics> {
  const { data } = await api.get("/queue/statistics", {
    params: date ? { date } : undefined,
  });
  return data.data;
}

export async function fetchQueueEntry(id: string): Promise<QueueEntry> {
  const { data } = await api.get(`/queue/${id}`);
  return data.data;
}

// ── Mutations ─────────────────────────────────────────────────────

export async function checkIn(payload: CheckInPayload): Promise<QueueEntry> {
  const { data } = await api.post("/queue/check-in", payload);
  return data.data;
}

export async function reserveQueueSlot(
  payload: ReserveQueuePayload
): Promise<QueueEntry> {
  const { data } = await api.post("/queue/reserve", payload);
  return data.data;
}

export async function callNext(): Promise<QueueEntry> {
  const { data } = await api.post("/queue/call-next");
  return data.data;
}

export async function resetQueue(): Promise<ResetQueueResult> {
  const { data } = await api.post("/queue/reset");
  return data.data;
}

export async function serveEntry(id: string): Promise<QueueEntry> {
  const { data } = await api.patch(`/queue/${id}/serve`);
  return data.data;
}

export async function skipEntry(id: string): Promise<QueueEntry> {
  const { data } = await api.patch(`/queue/${id}/skip`);
  return data.data;
}

export async function recallEntry(id: string): Promise<QueueEntry> {
  const { data } = await api.patch(`/queue/${id}/recall`);
  return data.data;
}

export async function cancelEntry(id: string): Promise<QueueEntry> {
  const { data } = await api.patch(`/queue/${id}/cancel`);
  return data.data;
}

export async function startEntry(id: string): Promise<QueueEntry> {
  const { data } = await api.patch(`/queue/${id}/start`);
  return data.data;
}
