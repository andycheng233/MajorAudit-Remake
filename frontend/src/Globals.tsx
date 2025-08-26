import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { AppProvider } from "./contexts/AppContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Globals({ children }: { readonly children: React.ReactNode }) {
  return (
    <div>
      <AppProvider>
        <UserProvider>
          <DndProvider backend={HTML5Backend}>
            <AuthProvider>{children}</AuthProvider>
          </DndProvider>
        </UserProvider>
      </AppProvider>
    </div>
  );
}

export default Globals;
