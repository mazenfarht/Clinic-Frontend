"use client";

import { useState } from "react";
import { useAnalytics } from "@/src/hooks/useAnalytics";
import AnalyticsHeader from "../../components/Analytics/AnalyticsHeader";
import DateRangeFilter from "../../components/Analytics/DateRangeFilter";
import AnalyticsSummaryCards from "../../components/Analytics/AnalyticsSummaryCards";
import VisitsAppointmentsChart from "../../components/Analytics/VisitsAppointmentsChart";
import PatientsRegisteredChart from "../../components/Analytics/PatientsRegisteredChart";
import QueueMetrics from "../../components/Analytics/QueueMetrics";
import AppointmentMetrics from "../../components/Analytics/AppointmentMetrics";

function getDefaultFromDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().slice(0, 10);
}

function getDefaultToDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function AnalyticsPage() {
  const [fromDate, setFromDate] = useState(getDefaultFromDate);
  const [toDate, setToDate] = useState(getDefaultToDate);

  const analyticsQuery = useAnalytics({ fromDate, toDate });

  const data = analyticsQuery.data;

  const handleApply = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
  };

  // ── Loading ──────────────────────────────────────────────
  if (analyticsQuery.isLoading) {
    return (
      <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
        <AnalyticsHeader />
        <DateRangeFilter
          fromDate={fromDate}
          toDate={toDate}
          onApply={handleApply}
        />
        <div className="flex items-center justify-center py-24">
          <p className="text-[#6B7A92]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (analyticsQuery.isError || !data) {
    const errorMessage =
      (analyticsQuery.error as any)?.response?.data?.message ??
      "Failed to load analytics data.";

    return (
      <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
        <AnalyticsHeader />
        <DateRangeFilter
          fromDate={fromDate}
          toDate={toDate}
          onApply={handleApply}
        />
        <div className="bg-white border border-[#E2E8EF] rounded-xl p-8 text-center">
          <p className="text-[#D92D20] font-medium">{errorMessage}</p>
          <button
            type="button"
            onClick={() => analyticsQuery.refetch()}
            className="mt-4 px-4 py-2 rounded-lg bg-[#1A6BCC] text-white hover:bg-[#155AB5] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────
  return (
    <div className="bg-[#F8FAFB] min-h-full p-6 space-y-6">
      {/* Header */}
      <AnalyticsHeader />

      {/* Date Range Filter */}
      <DateRangeFilter
        fromDate={fromDate}
        toDate={toDate}
        onApply={handleApply}
      />

      {/* Summary Cards */}
      <AnalyticsSummaryCards
        queueMetrics={data.queueMetrics}
        appointmentMetrics={data.appointmentMetrics}
      />

      {/* Charts */}
      <VisitsAppointmentsChart
        visitsPerDay={data.visitsPerDay}
        appointmentsPerDay={data.appointmentsPerDay}
      />

      <PatientsRegisteredChart
        patientsRegisteredPerMonth={data.patientsRegisteredPerMonth}
      />

      {/* Performance Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QueueMetrics queueMetrics={data.queueMetrics} />
        <AppointmentMetrics appointmentMetrics={data.appointmentMetrics} />
      </div>
    </div>
  );
}
