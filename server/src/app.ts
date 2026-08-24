import cors from "cors";
import express from "express";
import helmet from "helmet";
import { siteContent } from "./siteContent.js";

export const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN;

app.use(helmet());
app.use(cors({ origin: clientOrigin ? [clientOrigin] : false }));
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.get("/api/site-content", (_request, response) => {
  response.set("Cache-Control", "public, max-age=300");
  response.status(200).json(siteContent);
});

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" });
});
