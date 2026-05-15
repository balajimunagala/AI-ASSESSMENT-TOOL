import { Card, CardContent, CardHeader, CardTitle } from "../ui-stubs";
import { Link } from "react-router-dom";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "../ui-stubs";

export function RecentAssessments({ assessments }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Recent Assessments
        </CardTitle>

        <Button variant="ghost" size="sm" asChild>
          <Link to="/assessments">
            View all
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left">Assessment</th>
                <th className="py-3 px-4 text-left">Difficulty</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assessments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted-foreground">
                    No assessments yet
                  </td>
                </tr>
              ) : (
                assessments.map((assessment) => (
                  <tr key={assessment._id}>
                    <td className="py-3 px-4 font-medium">
                    <Link to={`/test/${assessment._id}`}>
                        {assessment.title}
                    </Link>
                    </td>

                    <td className="py-3 px-4 text-muted-foreground">
                      {assessment.difficulty}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link to={`/leaderboard/${assessment._id}`}>
                        <Button variant="outline" size="sm">
                          Leaderboard
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </CardContent>
    </Card>
  );
}