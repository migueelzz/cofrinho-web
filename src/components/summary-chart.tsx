"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 79 },
  { month: "February", desktop: 305, mobile: 200, tablet: 79 },
  { month: "March", desktop: 237, mobile: 120, tablet: 79 },
  { month: "April", desktop: 73, mobile: 190, tablet: 79 },
  { month: "May", desktop: 209, mobile: 130, tablet: 79 },
  { month: "June", desktop: 214, mobile: 140, tablet: 79 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#f43f5e",
  },
  mobile: {
    label: "Mobile",
    color: "#a855f7",
  },
  tablet: {
    label: "Tablet",
    color: "#eab308",
  },
} satisfies ChartConfig

export function SummaryChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto w-full max-h-[300px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
