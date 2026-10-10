export type AnalyticsPeriod = {
  from: string;
  to: string;
};

export type DailyAnalytics = {
  date: string;
  count: number;
};

export type MonthlyAnalytics = {
  month: string;
  count: number;
};

export type QueueMetrics = {
  totalServed: number;
  totalCancelled: number;
  completionRate: number;
  cancellationRate: number;
  averageWaitTimeMinutes: number;
  averageServeTimeMinutes: number;
};

export type AppointmentMetrics = {
  totalCompleted: number;
  totalCancelled: number;
  completionRate: number;
  cancellationRate: number;
};

export type AnalyticsData = {
  period: AnalyticsPeriod;
  visitsPerDay: DailyAnalytics[];
  appointmentsPerDay: DailyAnalytics[];
  patientsRegisteredPerMonth: MonthlyAnalytics[];
  queueMetrics: QueueMetrics;
  appointmentMetrics: AppointmentMetrics;
};

export type AnalyticsResponse = {
  success: boolean;
  message: string;
  data: AnalyticsData;
};

export type AnalyticsQueryParams = {
  fromDate: string;
  toDate: string;
};
