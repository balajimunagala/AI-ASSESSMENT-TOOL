import { DashboardLayout } from "../components/layout/DashboardLayout.jsx"
import { StatsCards } from "../components/dashboard/StatsCard.jsx"
import { RecentAssessments } from "../components/dashboard/RecentAssessments.jsx"
import { CandidateActivity } from "../components/dashboard/CandidateActivity.jsx"
import { PerformanceChart } from "../components/dashboard/PerformanceChart.jsx"
import { QuickActions } from "../components/dashboard/QuickActions.jsx"
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {

    const [assessments, setAssessments] = useState([]);

    const fetchAssessments = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/tests");
        setAssessments(res.data);
    } catch (err) {
        console.error(err);
    }
    };

    useEffect(() => {
    fetchAssessments();
    }, []);

    
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your hiring activity.
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Quick Actions */}
        <QuickActions refreshAssessments={fetchAssessments} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <CandidateActivity />
          </div>
        </div>

        {/* Recent Assessments */}
        <RecentAssessments assessments={assessments}/>
      </div>
    </DashboardLayout>
  )
}
