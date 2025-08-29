import { Router } from "express";
import coursesData from "../data/courses.json"; // tsconfig: resolveJsonModule=true

function toStrArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string") return [v];
  return [];
}

const r = Router();

r.get("/", (req, res) => {
  const q = (req.query.q as string)?.toLowerCase() ?? "";
  const code = (req.query.code as string) ?? "";
  const dist = toStrArray(req.query.dist);     // instead of ([] as string[]).concat(...)
  const season = toStrArray(req.query.season);
  const minLevel = req.query.minLevel ? parseInt(req.query.minLevel as string, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
  const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;

  let items = (coursesData as any[]).map(c => ({
    ...c,
    dist: c.dist || [],
    seasons: c.seasons || [],
    season_codes: c.season_codes || [],
  }));

  if (q) {
    items = items.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.codes.some((cc: string) => cc.toLowerCase().includes(q)) ||
      (c.dist || []).some((d: string) => d.toLowerCase().includes(q))
    );
  }
  if (code) items = items.filter(c => c.codes.includes(code));
  if (dist.length) items = items.filter(c => dist.every(d => c.dist?.includes(d)));
  if (season.length) items = items.filter(c => season.some(s => c.seasons?.includes(s)));
  if (minLevel) items = items.filter(c => parseInt(c.codes[0].split(" ")[1]) >= minLevel);

  const total = items.length;
  res.json({ items: items.slice(offset, offset + limit), total });
});

export default r;
