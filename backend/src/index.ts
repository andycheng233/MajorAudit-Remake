import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import courses from "./routes/courses";
import programs from "./routes/programs";
import users from "./routes/users";
import audit from "./routes/audit";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/v1/courses", courses);
app.use("/api/v1/programs", programs);
app.use("/api/v1/users", users);
app.use("/api/v1/audit", audit);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
