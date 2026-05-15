import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateTest from "./pages/CandidateTest";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<RecruiterDashboard />} />
        <Route path="/test/:id" element={<CandidateTest />} />
        <Route path="/leaderboard/:testId" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;