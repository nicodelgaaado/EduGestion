"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, LabelList } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { mockRequestDistribution } from "@/lib/mock-data"

const chartConfig = {
  count: {
    label: "Solicitudes",
  },
  justificacion: {
    label: "Justificación",
    color: "oklch(0.627 0.194 149.214)",
  },
  calificacion: {
    label: "Calificación",
    color: "oklch(0.556 0 0)",
  },
  constancia: {
    label: "Constancia",
    color: "oklch(0.439 0 0)",
  },
  cambio: {
    label: "Cambio Grupo",
    color: "oklch(0.371 0 0)",
  },
  prorroga: {
    label: "Prórroga",
    color: "oklch(0.269 0 0)",
  },
} satisfies ChartConfig

export function RequestDistributionChart() {
  return (
    <div className="w-full h-87.5">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          data={mockRequestDistribution}
          layout="vertical"
          margin={{
            left: 20,
            right: 40,
            top: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-muted" />
          <XAxis type="number" hide />
          <YAxis
            dataKey="type"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={100}
            className="text-[10px] font-bold"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="count" radius={6}>
            {mockRequestDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="count"
              position="right"
              offset={12}
              className="fill-foreground font-black text-xs"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
