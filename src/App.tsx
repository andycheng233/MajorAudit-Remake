import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import CoursePlanning from "./pages/CoursePlanning";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Requirements from "./pages/Requirements";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <UserProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/requirements" element={<Requirements />} />
              <Route path="/course-planning" element={<CoursePlanning />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
