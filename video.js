// api/videos.js
import fs from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "videos.json");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ error: "Method not allowed" });
    return;
  }
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const videos = JSON.parse(raw);
    res.status(200).json(videos);
  } catch (err) {
    // If file not exist, return empty
    res.status(200).json([]);
  }
}
