"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function Overview({ monthlyData }) {
  const formattedData = monthNames.map((name, index) => {
    const monthData = monthlyData?.find((item) => item.month === index + 1);
    return {
      name,
      total: monthData ? monthData.total : 0, // Default to 0 if no data for that month
    };
  });
  

  return (
    <ResponsiveContainer width="100%" height={350}>
    <BarChart data={formattedData}>
      <XAxis
        dataKey="name"
        stroke="#888888"
        fontSize={12}
        tickLine={false}
        axisLine={false}
      />
      <YAxis
        stroke="#888888"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => `₱${value}`}
      />
      <Tooltip 
        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", padding: "8px", border: "1px solid #ddd" }}
        labelStyle={{ fontWeight: "bold" }}
        formatter={(value) => [`₱${value}`, "Total Earnings"]} 
      />
      <Bar
        dataKey="total"
        fill="currentColor"
        radius={[4, 4, 0, 0]}
        className="fill-primary"
      />
    </BarChart>
  </ResponsiveContainer>
);
}
