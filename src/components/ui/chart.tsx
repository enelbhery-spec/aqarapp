"use client"

import * as React from "react"
import {
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)
export const useChart = () => {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("useChart must be used inside ChartContainer")
  return ctx
}

export const ChartContainer = ({
  children,
  config,
  className,
}: {
  children: React.ReactNode
  config: ChartConfig
  className?: string
}) => (
  <ChartContext.Provider value={{ config }}>
    <div className={cn("w-full h-full text-xs", className)}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  </ChartContext.Provider>
)

export const ChartTooltip = RechartsTooltip

export const ChartTooltipContent = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any[]
  label?: any
}) => {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  return (
    <div className="rounded-md border bg-background px-3 py-2 shadow-md">
      <div className="font-medium mb-1">
        {config[label]?.label ?? label}
      </div>

      {payload.map((item: any, i: number) => {
        const cfg = config[item.dataKey] ?? {}

        return (
          <div key={i} className="flex justify-between gap-4">
            <span className="text-muted-foreground">{cfg.label ?? item.name}</span>
            <span className="font-mono">{item.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export const ChartLegend = RechartsLegend

export const ChartLegendContent = ({
  payload,
}: {
  payload?: any[]
}) => {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div className="flex items-center justify-center gap-4 pt-3 text-xs">
      {payload.map((item: any, i: number) => {
        const cfg = config[item.dataKey] ?? {}

        return (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {cfg.label}
          </div>
        )
      })}
    </div>
  )
}
