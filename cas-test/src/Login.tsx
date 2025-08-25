// src/Login.tsx
import React, { useContext } from "react";
import { AuthCtx } from "./AuthContext";

export default function Login() {
  const { login } = useContext(AuthCtx);
  return (
    <main style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Login required</h1>
      <button onClick={login}>Login with CAS</button>
    </main>
  );
}
