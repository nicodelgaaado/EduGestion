"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { mockAttendanceTrends } from "@/lib/mock-data"

const chartConfig = {
  presente: {
    label: "Presente",
    color: "oklch(0.627 0.194 149.214)", // A green-ish color
  },
  ausente: {
    label: "Ausente",
    color: "oklch(0.606 0.25 24.407)", // A red-ish color
  },
  tarde: {
    label: "Tarde",
    color: "oklch(0.769 0.188 70.08)", // A yellow-ish color
  },
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <div className="w-full h-75 mt-4">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={mockAttendanceTrends}
          margin={{
            left: 12,
            right: 12,
            top: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("es-ES", {
                month: "short",
                day: "numeric",
              })
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="ausente"
            type="monotone"
            fill="var(--color-ausente)"
            fillOpacity={0.4}
            stroke="var(--color-ausente)"
            stackId="a"
          />
          <Area
            dataKey="tarde"
            type="monotone"
            fill="var(--color-tarde)"
            fillOpacity={0.4}
            stroke="var(--color-tarde)"
            stackId="a"
          />
          <Area
            dataKey="presente"
            type="monotone"
            fill="var(--color-presente)"
            fillOpacity={0.4}
            stroke="var(--color-presente)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
