"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import * as XLSX from "xlsx";
import { Separator } from "@/components/ui/separator";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function Overview({ monthlyData }) {
  const [loading, setLoading] = useState(false);

  // Adjusting your logic to calculate activated members and total earnings
  const formattedData = monthNames.map((name, index) => {
    const monthData = monthlyData?.find((item) => item.month === index + 1);
    const totalEarnings = monthData ? monthData.total : 0; // Total earnings for the month
    const activatedMembers = monthData ? monthData.total / 95 : 0; // Calculate number of activated members (total earnings / 95)

    return {
      name,
      total: totalEarnings,
      activatedMembers: activatedMembers,
      totalEarningsFromActivated: monthData ? monthData.total : 0, // Same as total earnings for activated members
    };
  });

  const handleDownload = () => {
    setLoading(true);

    const worksheetData = formattedData.map((item) => ({
      Month: item.name,
      "Total Earnings": item.total,
      "Activated Members": item.activatedMembers,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Earnings");

    // Get the current month and year for the file name
    const currentDate = new Date();
    const fileName = `monthly_earnings_report_${monthNames[currentDate.getMonth()]}_${currentDate.getFullYear()}.xlsx`;

    // Generate the file with a dynamic name based on the current month and year
    XLSX.writeFile(workbook, fileName);

    setLoading(false);
  };

  return (
    <div>

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
      <Separator />
      <Button
          onClick={handleDownload}
          disabled={loading}
          className="bg-primary text-white mx-3 my-4 rounded-md w-full"
        >
          {loading ? "Generating Report..." : "Generate Report"}
        </Button>
    </div>
  );
}
