// src/AuthContext.tsx
import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "./api";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface CtxValue {
  user: User | false | null;
  loading: boolean;
  login(): void;
  logout(): void;
}

export const AuthCtx = createContext<CtxValue>({} as CtxValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | false | null>(null);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await api("/api/auth/profile/");
        if (!r.ok) throw new Error();
        setUser(await r.json());
      } catch {
        setUser(false);
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  const login = () =>
    (window.location.href = "https://127.0.0.1:8000/api/auth/login");

  const logout = async () => {
    try {
      await api("/api/auth/logout/", { method: "POST" });
      setUser(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};
