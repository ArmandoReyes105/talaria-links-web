"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

export interface DailyClicks {
  day: string
  clicks: number
}

const chartConfig = {
  clicks: { label: "Clics", color: "var(--chart-1)" },
} satisfies ChartConfig

interface ClicksBarChartProps {
  data: DailyClicks[]
}

const ClicksBarChart = ({ data }: ClicksBarChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-44 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="clicks"
          fill="var(--color-clicks)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default ClicksBarChart
