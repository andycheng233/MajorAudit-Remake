import { type AppData } from "../types/type-program";
import React, { useState, createContext, useContext, useEffect } from "react";
import { loadCourses, CourseDatabase } from "../services/CourseDatabase";

import { loadMajorTemplates, MajorProcessor } from "../services/MajorProcessor";

type AppContextType = {
  appData: AppData | undefined;
  setAppData: React.Dispatch<React.SetStateAction<AppData | undefined>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appData, setAppData] = useState<AppData | undefined>(undefined);

  // init user data or retrieve from localStorage
  useEffect(() => {
    async function initializeApp() {
      const courses = await loadCourses("mock_courses_2025_26.json");
      const major_templates = await loadMajorTemplates(
        "mock_major_templates.json"
      );
      const course_database = new CourseDatabase(courses);
      const major_processor = new MajorProcessor(course_database);
      setAppData({
        courses: courses,
        major_templates: major_templates,
        course_database: course_database,
        major_processor: major_processor,
      });
    }

    initializeApp();
  }, []);

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within a AppProvider");
  return context;
};
