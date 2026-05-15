import { MoreHorizontal, Eye, Mail, Star } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui-stubs"


const getScoreColor = (score) => {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  return "text-red-500"
}

const getStatusBadge = (status) => {
  if (status === "passed") {
    return (
      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
        Passed
      </Badge>
    )
  }
  return (
    <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
      Failed
    </Badge>
  )
}

export function LeaderboardTable({ data }) {

  const candidates = data.map((user, index) => ({
    rank: index + 1,
    name: user.name || user.userId,
    email: user.email || "no-email",
    initials: (user.name || user.userId)?.slice(0, 2).toUpperCase(),
    assessment: "Coding Test",
    score: user.score,
    time: user.timeTaken ? `${user.timeTaken}s` : "--",
    status: "passed",
    completedAt: new Date(user.createdAt).toLocaleDateString(),
    starred: false,
  }));
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground w-12">
                  Rank
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                  Candidate
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Assessment
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                  Score
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Time
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                  Completed
                </th>
                <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr
                  key={candidate.rank}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          candidate.rank <= 3
                            ? candidate.rank === 1
                              ? "text-yellow-500"
                              : candidate.rank === 2
                                ? "text-slate-400"
                                : "text-amber-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        #{candidate.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          {candidate.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{candidate.name}</span>
                          {candidate.starred && (
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {candidate.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    {candidate.assessment}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-lg font-bold ${getScoreColor(candidate.score)}`}
                    >
                      {candidate.score}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden sm:table-cell font-mono">
                    {candidate.time}
                  </td>
                  <td className="py-4 px-4 hidden lg:table-cell">
                    {getStatusBadge(candidate.status)}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {candidate.completedAt}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="w-4 h-4 mr-2" />
                          {candidate.starred ? "Remove Star" : "Add Star"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1-10 of 156 candidates
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
