// api/upload.js
import { Storage } from "megajs";

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASSWORD
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ error: "Method not allowed" });
    return;
  }

  const { filename, fileDataBase64 } = req.body;
  if (!filename || !fileDataBase64) {
    res.status(400).send({ error: "Missing filename or data" });
    return;
  }

  try {
    await storage.ready;
    const buffer = Buffer.from(fileDataBase64, "base64");
    const upload = await storage.upload({ name: filename, size: buffer.length }, buffer).complete;
    const link = upload.downloadLink;
    // Optional: store to database / simple JSON file
    // e.g., append to a JSON file or use an external DB
    res.status(200).json({ success: true, link, filename });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}
