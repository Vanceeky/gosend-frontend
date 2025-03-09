import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import DashboardCard from "@/components/DashboardCard";
import { dashboardStats } from "@/app/dashboard/data/dashboardStats";


export default function DashboardHome() {

    return (
      <>
      <div className="flex flex-col gap-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {dashboardStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
        
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
  