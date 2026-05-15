import { Avatar, AvatarFallback, Badge, Card, CardContent, CardHeader, CardTitle } from "../ui-stubs"

const activities = [
  {
    id: 1,
    name: "Alex Thompson",
    initials: "AT",
    action: "completed",
    assessment: "React Senior",
    score: 92,
    time: "2 min ago",
  },
  {
    id: 2,
    name: "Maria Garcia",
    initials: "MG",
    action: "started",
    assessment: "Python Backend",
    time: "5 min ago",
  },
  {
    id: 3,
    name: "James Wilson",
    initials: "JW",
    action: "completed",
    assessment: "System Design",
    score: 78,
    time: "12 min ago",
  },
  {
    id: 4,
    name: "Sarah Lee",
    initials: "SL",
    action: "invited",
    assessment: "Full Stack",
    time: "25 min ago",
  },
  {
    id: 5,
    name: "David Chen",
    initials: "DC",
    action: "completed",
    assessment: "JavaScript",
    score: 85,
    time: "1 hour ago",
  },
]

export function CandidateActivity() {
  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-xs">
                {activity.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">
                  {activity.name}
                </span>
                {activity.score && (
                  <Badge
                    variant={activity.score >= 80 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {activity.score}%
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    activity.action === "completed"
                      ? "text-green-500"
                      : activity.action === "started"
                        ? "text-blue-500"
                        : "text-muted-foreground"
                  }
                >
                  {activity.action}
                </span>{" "}
                {activity.assessment}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
