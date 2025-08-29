import { Router } from "express";
import user from "../data/user.json";
const r = Router();

r.post("/preview", (_req, res) => {
  res.json(user.FYP.degreeProgress);
});

export default r;
