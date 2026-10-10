import Dashboard from "./pages/Dashboard";
import CourseLearning from "./pages/CourseLearning";

function App() {
  const isLearningPage = window.location.pathname === "/learn";

  return isLearningPage ? <CourseLearning /> : <Dashboard />;
}

export default App;
