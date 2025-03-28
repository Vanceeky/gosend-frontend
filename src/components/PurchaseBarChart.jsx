"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { category: "Merchant", percentage: 5 },
  { category: "Motherwallet", percentage: 10 },
  { category: "Unilevel", percentage: 85 },
]

const chartConfig = {
  Merchant: {
    label: "Merchant",
    color: "hsl(var(--chart-1))",
  },
  Motherwallet: {
    label: "Motherwallet",
    color: "hsl(var(--chart-2))",
  },
  Unilevel: {
    label: "Unilevel",
    color: "hsl(var(--chart-3))",
  },
  label: {
    color: "hsl(var(--background))",
  },
}

export default function PurchaseBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward Distribution Chart</CardTitle>
        <CardDescription>Merchant, Motherwallet, and Unilevel</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="percentage" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="percentage"
              layout="vertical"
              fill="hsl(var(--chart-1))"
              radius={4}
            >
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="percentage"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing reward distribution breakdown
        </div>
      </CardFooter>
    </Card>
  )
}