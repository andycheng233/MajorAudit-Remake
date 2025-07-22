import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { AppProvider } from "./contexts/AppContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import CoursePlanning from "./pages/CoursePlanning";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Programs from "./pages/Programs";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <AppProvider>
        <UserProvider>
          <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col h-screen">
              <Navbar />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/course-planning" element={<CoursePlanning />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </DndProvider>
        </UserProvider>
      </AppProvider>
    </>
  );
}

export default App;
