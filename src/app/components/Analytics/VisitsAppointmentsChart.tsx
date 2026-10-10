"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { DailyAnalytics } from "@/src/types/analytics";

type Props = {
  visitsPerDay: DailyAnalytics[];
  appointmentsPerDay: DailyAnalytics[];
};

type ChartDataPoint = {
  date: string;
  visits: number;
  appointments: number;
};

function mergeByDate(
  visits: DailyAnalytics[],
  appointments: DailyAnalytics[]
): ChartDataPoint[] {
  const map = new Map<string, ChartDataPoint>();

  visits.forEach(({ date, count }) => {
    map.set(date, { date, visits: count, appointments: 0 });
  });

  appointments.forEach(({ date, count }) => {
    if (map.has(date)) {
      map.get(date)!.appointments = count;
    } else {
      map.set(date, { date, visits: 0, appointments: count });
    }
  });

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

export default function VisitsAppointmentsChart({
  visitsPerDay,
  appointmentsPerDay,
}: Props) {
  const data = mergeByDate(visitsPerDay, appointmentsPerDay);

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <TrendingUp size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Visits & Appointments
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Daily visits and appointments over the selected period.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        {data.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-[#6B7A92]">
              No data available for this period.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F7" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: "#6B7A92" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E8EF" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7A92" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8EF",
                  fontSize: "12px",
                  color: "#1A2B45",
                }}
                labelFormatter={(label) => formatDate(label as string)}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
              <Line
                type="monotone"
                dataKey="visits"
                name="Visits"
                stroke="#1A6BCC"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="appointments"
                name="Appointments"
                stroke="#027A48"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
