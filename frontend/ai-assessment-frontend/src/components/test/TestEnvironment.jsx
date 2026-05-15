import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TestHeader } from "./TestHeader";
import { QuestionPanel } from "./QuestionPanel";
import { CodeEditor } from "./CodeEditor";
import { TestOutput } from "./TestOutput";


export function TestEnvironment({ testId }) {
  const [test, setTest] = useState(null);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // ✅ Fetch test
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tests/${testId}`);
        setTest(res.data);

        // ✅ set starter code AFTER data comes
        setCode(res.data.starterCode || "");
      } catch (err) {
        console.error(err);
      }
    };

    if (testId) fetchTest();
  }, [testId]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setOutput("Code executed successfully!");
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    try {
      setIsRunning(true);
  
      const res = await axios.post("http://localhost:5000/api/submissions", {
        userId: "balaji",
        name: "Balaji",
        testId: testId,
        code: code,
        timeTaken: 120
      });
  
      setOutput(`Score: ${res.data.score}`);
      setIsRunning(false);
  
      // 🔥 IMPORTANT: redirect to leaderboard
      navigate(`/leaderboard/${testId}`);
  
    } catch (err) {
      console.error(err);
      setIsRunning(false);
    }
  };

  // ✅ Important: wait until data loads
  if (!test) return <div>Loading test...</div>;

  return (
    <div className="h-screen flex flex-col bg-background">
      <TestHeader onSubmit={handleSubmit} />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="lg:w-[400px] xl:w-[450px] border-r border-border overflow-y-auto">
          {/* ✅ PASS DATA HERE */}
          <QuestionPanel test={test} />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRunCode}
            onSubmit={handleSubmit}
            isRunning={isRunning}
          />
          <TestOutput output={output} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}