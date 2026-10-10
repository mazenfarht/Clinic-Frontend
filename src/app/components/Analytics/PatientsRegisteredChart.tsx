"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users } from "lucide-react";
import { MonthlyAnalytics } from "@/src/types/analytics";

type Props = {
  patientsRegisteredPerMonth: MonthlyAnalytics[];
};

type ChartDataPoint = {
  month: string;
  label: string;
  count: number;
};

function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function prepareData(data: MonthlyAnalytics[]): ChartDataPoint[] {
  return [...data]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      month: item.month,
      label: formatMonth(item.month),
      count: item.count,
    }));
}

export default function PatientsRegisteredChart({
  patientsRegisteredPerMonth,
}: Props) {
  const data = prepareData(patientsRegisteredPerMonth);

  return (
    <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E2E8EF]">
        <div className="p-2 rounded-lg bg-[#EBF3FF] text-[#1A6BCC]">
          <Users size={18} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#1A2B45]">
            Patients Registered
          </h2>
          <p className="text-xs text-[#6B7A92] mt-0.5">
            Monthly new patient registrations.
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
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F3F7" />
              <XAxis
                dataKey="label"
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
                cursor={{ fill: "#F0F3F7" }}
              />
              <Bar
                dataKey="count"
                name="Patients Registered"
                fill="#1A6BCC"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
