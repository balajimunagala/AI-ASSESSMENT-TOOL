import { DashboardLayout } from "../components/layout/DashboardLayout.jsx"
import { LeaderboardTable } from "../components/leaderboard/leaderboard-table.jsx"
import { LeaderboardFilters } from "../components/leaderboard/leaderboard-filters.jsx"
import { TopPerformers } from "../components/leaderboard/top-performers.jsx"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function LeaderboardPage() {
  const { testId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("score");
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/leaderboard/${testId}`
        );
  
        setLeaderboard(res.data);
        console.log("Leaderboard:", res.data); // debug
      } catch (err) {
        console.error(err);
      }
    };
  
    if (testId) fetchLeaderboard();
  }, [testId]);

  const filteredData = leaderboard
  .filter((user) =>
    ((user.name || user.userId || "").toLowerCase())
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sort === "score") return b.score - a.score;
    if (sort === "score-asc") return a.score - b.score;
    if (sort === "time") return a.timeTaken - b.timeTaken;
    if (sort === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            View and compare candidate performance across all assessments.
          </p>
        </div>

        {/* Top Performers */}
        <TopPerformers data={filteredData} />

        {/* Filters */}
        <LeaderboardFilters 
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />

        {/* Leaderboard Table */}
        <LeaderboardTable data={filteredData} />
      </div>
    </DashboardLayout>
  )
}
