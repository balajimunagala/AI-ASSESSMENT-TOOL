import { Users, FileText, Trophy, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "../ui-stubs"

const stats = [
  {
    name: "Total Candidates",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
  {
    name: "Active Assessments",
    value: "24",
    change: "+3",
    trend: "up",
    icon: FileText,
    description: "this week",
  },
  {
    name: "Completion Rate",
    value: "78.3%",
    change: "+5.2%",
    trend: "up",
    icon: Trophy,
    description: "vs last month",
  },
  {
    name: "Avg. Score",
    value: "72.4",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    description: "vs last month",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.name}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
