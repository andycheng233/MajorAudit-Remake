// src/App.tsx
import React, { useContext } from "react";
import { AuthProvider, AuthCtx } from "./AuthContext";
import Login from "./Login";
import Profile from "./Profile";

function Inner() {
  const { user, loading } = useContext(AuthCtx);
  if (loading) return <p>Loading…</p>;
  return user ? <Profile /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}
