import { Router } from "express";
import majors from "../data/majors.json";

const r = Router();
r.get("/templates", (_req, res) => res.json(majors));
export default r;
