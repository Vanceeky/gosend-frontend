import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/DashboardCard';
import { Users, Wallet, Store, Globe, CheckCircle, CircleDollarSign, Handshake, TrendingUp } from 'lucide-react';
import { Overview } from '@/components/overview';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter   } from '@/components/ui/card';

import { Pie, PieChart } from "recharts"
import {
  
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import PurchaseBarChart from "@/components/PurchaseBarChart"
import { TodayActivations } from '@/components/recent-sales';



const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;

      if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not defined in environment variables.");
      }

      const response = await fetch(`http://${API_BASE_URL}/v1/investor/investor-dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setDashboardData(data);
      setMonthlyData(
        data.monthly_accumulated_activation.map(([month, total]) => ({
          month,
          total
        }))
      );
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);


  if (loading) return <p>Loading...</p>;
  if (!dashboardData) return <p>Error loading data</p>;

  const chartData = [
    { role: "Admin", amount: 95, fill: "hsl(var(--chart-1))" },
    { role: "First Level", amount: 40, fill: "hsl(var(--chart-2))" },
    { role: "Second Level", amount: 10, fill: "hsl(var(--chart-3))" },
    { role: "Third Level", amount: 5, fill: "hsl(var(--chart-4))" },
    { role: "Activator", amount: 25, fill: "hsl(var(--chart-5))" },
  ];
  
  const chartConfig = {
    rewards: {
      label: "Rewards",
    },
    Admin: {
      label: "Admin",
      color: "hsl(var(--chart-1))",
    },
    "First Level": {
      label: "First Level",
      color: "hsl(var(--chart-2))",
    },
    "Second Level": {
      label: "Second Level",
      color: "hsl(var(--chart-3))",
    },
    "Third Level": {
      label: "Third Level",
      color: "hsl(var(--chart-4))",
    },
    Activator: {
      label: "Activator",
      color: "hsl(var(--chart-5))",
    },
  };

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(today);
  

  return (
    <div>
      <div className="flex flex-col gap-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Total Reward Points */}
          <DashboardCard title="Total Reward Points" icon={<Wallet />} value={dashboardData.reward_points} changeColor="text-blue-500" />
          
          <DashboardCard 
            title="Total Accumulated Earnings" 
            icon={<TrendingUp />} 
            value={dashboardData.total_accumulated_activation_amount} 
            changeColor="text-green-500" 
            change={`Activated member: ${dashboardData.activated_members}`}  />

          {/* Total Members */}
          <DashboardCard title="Total Members" icon={<Users />} value={dashboardData.total_members} changeColor="text-green-500" />

          {/* Activated Members */}
          <DashboardCard 
            title="Activated Members" 
            icon={<CheckCircle />} 
            value={`${dashboardData.activated_members} / ${dashboardData.total_members}`} 
            changeColor="text-red-500" 
            change={`Inactive Accounts: ${dashboardData.not_activated_members}`} 
          />

          {/* Total Merchants */}
          <DashboardCard title="Total Merchants" icon={<Store />} value={dashboardData.total_merchants} changeColor="text-purple-500" />

          {/* Total Communities */}
          <DashboardCard title="Total Communities" icon={<Globe />} value={dashboardData.total_communities} changeColor="text-indigo-500" />

          {/* Total Distributed Rewards */}
          <DashboardCard title="Total Rewards Distributed" icon={<CircleDollarSign />} value={dashboardData.total_distributed_rewards} changeColor="text-green-500" />

          {/* Total Activator Earnings */}
          <DashboardCard title="Total Activator Earnings" icon={<Handshake />} value={dashboardData.total_activator_earnings} changeColor="text-orange-500" />
          
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Activation Breakdown Table (8 Columns) */}
            <div className="col-span-4 bg-white shadow rounded-lg p-4">
                <CardTitle className="mb-2">Activation Breakdown</CardTitle>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Activated By</th>
                      <th className="border border-gray-300 p-2">Amount</th>
                      <th className="border border-gray-300 p-2">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.activations.map(([role, amount, count], index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-300 p-2">{role}</td>
                        <td className="border border-gray-300 p-2">₱ {amount}</td>
                        <td className="border border-gray-300 p-2">{count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>


            {/* Activation Reward Distribution Chart (4 Columns) */}
            <div className="col-span-4">
              <Card className="flex flex-col">
                <CardHeader className="pb-0">
                  <CardTitle className="mb-2">Activation Reward Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                  >
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                      <Pie data={chartData} dataKey="amount" nameKey="role" label />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-4 bg-white shadow rounded-lg p-4">
            <CardTitle className="mb-2">Merchant Purchase Reward Distribution</CardTitle>
                
            </div>
          
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 ">
          
          {/* Overview Card - Takes up full width on small screens */}
          <Card className="sm:col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Today's Activation History</CardTitle>
                <span className="text-sm text-gray-500 cursor-pointer">{formattedDate}</span>
              </div>
              <p className="text-sm text-muted-foreground">
              Here you can see the activation history for today. Track the latest activation activities, including amounts and user details.
            </p>
            </CardHeader>

            <CardContent className="pl-2">
            
              <TodayActivations activations={dashboardData.today_activations}/>

            </CardContent>
          </Card>

          {/* Overview Card - Takes up full width on small screens */}
          <Card className="sm:col-span-1 md:col-span-2 lg:col-span-4">
            <CardHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Overview</CardTitle>
                <span className="text-sm text-gray-500 cursor-pointer">📊 Monthly Summary</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This chart displays the total activation earnings for each month, 
                helping track trends in user activations over time.
              </p>
            </CardHeader>

            <CardContent className="pl-2">
            <Overview monthlyData={monthlyData} />

            </CardContent>
          </Card>




        </div>

      </div>
    </div>
  );
};

export default Home;
