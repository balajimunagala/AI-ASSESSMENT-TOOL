import { useParams } from "react-router-dom";
import { TestEnvironment } from "../components/test/TestEnvironment.jsx";

export default function CodingTestPage() {
  const { id } = useParams();

  return <TestEnvironment testId={id} />;
}