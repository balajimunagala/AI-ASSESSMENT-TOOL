import { Trophy, Medal, Award } from "lucide-react";
import { Avatar, AvatarFallback, Card, CardContent } from "../ui-stubs";

export function TopPerformers({ data }) {

  if (!data || data.length === 0) {
    return <div>No top performers yet</div>;
  }

  const icons = [Trophy, Medal, Award];
  const colors = ["text-yellow-500", "text-slate-400", "text-amber-600"];
  const bgColors = ["bg-yellow-500/10", "bg-slate-400/10", "bg-amber-600/10"];
  const borderColors = [
    "border-yellow-500/30",
    "border-slate-400/30",
    "border-amber-600/30",
  ];

  // 🔥 Convert backend data → UI format
  const topThree = data.slice(0, 3).map((user, index) => ({
    rank: index + 1,
    name: user.name || user.userId,
    initials: (user.name || user.userId)
      ?.slice(0, 2)
      .toUpperCase(),
    score: user.score,
    assessment: "Coding Test",
    time: user.timeTaken ? `${user.timeTaken}s` : "--",
    icon: icons[index],
    color: colors[index],
    bgColor: bgColors[index],
    borderColor: borderColors[index],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {topThree.map((performer) => (
        <Card
          key={performer.rank}
          className={`bg-card border-2 ${performer.borderColor}`}
        >
          <CardContent className="p-6">

            {/* Rank + Icon */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-full ${performer.bgColor} flex items-center justify-center`}
              >
                <performer.icon className={`w-5 h-5 ${performer.color}`} />
              </div>
              <span className={`text-2xl font-bold ${performer.color}`}>
                #{performer.rank}
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary text-sm">
                  {performer.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{performer.name}</div>
                <div className="text-sm text-muted-foreground">
                  {performer.assessment}
                </div>
              </div>
            </div>

            {/* Score + Time */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {performer.score}%
                </div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">{performer.time}</div>
                <div className="text-xs text-muted-foreground">Time</div>
              </div>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}