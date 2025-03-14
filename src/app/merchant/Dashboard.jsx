import { useState, useEffect } from 'react';
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import DashboardCard from "@/components/DashboardCard";
import { dashboardStats } from "@/app/dashboard/data/dashboardStats";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { Gift } from 'lucide-react';

export default function Dashboard() {
  return (
    <>
    <div className="flex flex-col gap-4 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        <Wallet/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">600</div>
        <p className={`text-xs }`}>test</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Reward Points</CardTitle>
        <Gift/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">20</div>
        <p className={`text-xs }`}>test</p>
      </CardContent>
    </Card>
      
      </div>

    </div>
    
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 p-2 ">
      
      {/* Overview Card - Takes up full width on small screens */}
      <Card className="sm:col-span-1 md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>

      {/* Recent Sales Card - Adjusts on different screen sizes */}
      <Card className="sm:col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Activated Accounts</CardTitle>
          <CardDescription>265 members activated this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>

    </div>
    </>
  )
}