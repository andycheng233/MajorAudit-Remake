import { type User } from "../types/type-user";
import React, { useState, createContext, useContext, useEffect } from "react";
import { initialUserData } from "../data/mock_initial_user_data";

type UserContextType = {
  userData: User | undefined;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);

  // init user data or retrieve from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("mockUserData");
    //if (stored) setUserData(JSON.parse(stored));
    //else setUserData(initialUserData);
    if (stored) setUserData(initialUserData); //to reset mock user data
  }, []);

  // save data to local storage on change
  useEffect(() => {
    if (userData) {
      localStorage.setItem("mockUserData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
