import { Router } from "express";
import initialUser from "../data/user.json";

const r = Router();
let user = structuredClone(initialUser);
let semesters = user.FYP.studentSemesters || [];

r.get("/me", (_req, res) => res.json(user));

r.get("/me/semesters", (_req, res) => res.json(semesters));

r.post("/me/semesters", (req, res) => {
  semesters.push(req.body);
  res.status(201).json(req.body);
});

r.patch("/me/semesters/:season", (req, res) => {
  const season = parseInt(req.params.season, 10);
  semesters = semesters.map(s => (s.season === season ? { ...s, ...req.body } : s));
  const updated = semesters.find(s => s.season === season);
  res.json(updated);
});

r.delete("/me/semesters/:season", (req, res) => {
  const season = parseInt(req.params.season, 10);
  semesters = semesters.filter(s => s.season !== season);
  res.status(204).send();
});

export default r;
