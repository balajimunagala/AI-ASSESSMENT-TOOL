import { Plus, Send, Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent } from "../ui-stubs";
import axios from "axios";

const actions = [
  {
    icon: Plus,
    label: "Create Assessment",
    href: "/assessments/new",
    variant: "default",
  },
  {
    icon: Send,
    label: "Invite Candidates",
    href: "/candidates/invite",
    variant: "outline",
  },
  {
    icon: Eye,
    label: "View Results",
    href: "/leaderboard",
    variant: "outline",
  },
  {
    icon: Download,
    label: "Export Report",
    href: "#",
    variant: "outline",
  },
];

export function QuickActions({ refreshAssessments }) {

  const createTest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/tests/create", {
        title: "Two Sum",
        question: "Find two indices whose sum equals target",
        difficulty: "Easy",
        starterCode: "function twoSum() {}",
        createdBy: "balaji",
        timeLimit: 30
      });

      console.log("Created:", res.data);

      // 🔥 THIS IS THE IMPORTANT LINE
      refreshAssessments();

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3">

          {actions.map((action) => {

            if (action.label === "Create Assessment") {
              return (
                <Button
                  key={action.label}
                  variant={action.variant}
                  className="gap-2"
                  onClick={createTest}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </Button>
              );
            }

            return (
              <Button
                key={action.label}
                variant={action.variant}
                asChild
                className="gap-2"
              >
                <Link to={action.href}>
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </Link>
              </Button>
            );

          })}

        </div>
      </CardContent>
    </Card>
  );
}