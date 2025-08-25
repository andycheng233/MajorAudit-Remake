// src/api.ts
export const api = (url: string, opts: RequestInit = {}) =>
  fetch(`https://127.0.0.1:8000${url}`, {
    credentials: 'include',                // send HttpOnly JWT cookies
    headers: { 'Content-Type': 'application/json', ...(opts.headers ?? {}) },
    ...opts,
  });
