import { Card, CardContent, CardHeader, CardTitle } from "../ui-stubs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { month: "Jan", candidates: 120, completions: 95 },
  { month: "Feb", candidates: 145, completions: 118 },
  { month: "Mar", candidates: 190, completions: 152 },
  { month: "Apr", candidates: 210, completions: 175 },
  { month: "May", candidates: 280, completions: 220 },
  { month: "Jun", candidates: 320, completions: 268 },
  { month: "Jul", candidates: 350, completions: 295 },
]

export function PerformanceChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Assessment Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.65 0.2 145)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.65 0.2 145)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.6 0.15 200)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.6 0.15 200)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.25 0 0)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="oklch(0.5 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.5 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.14 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
              />
              <Area
                type="monotone"
                dataKey="candidates"
                stroke="oklch(0.65 0.2 145)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCandidates)"
                name="Candidates"
              />
              <Area
                type="monotone"
                dataKey="completions"
                stroke="oklch(0.6 0.15 200)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCompletions)"
                name="Completions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Candidates</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "oklch(0.6 0.15 200)" }}
            />
            <span className="text-sm text-muted-foreground">Completions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
