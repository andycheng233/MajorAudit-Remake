// src/Profile.tsx
import React, { useContext } from "react";
import { AuthCtx } from "./AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthCtx);
  if (!user) return null; // TS narrow
  return (
    <main style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </main>
  );
}
