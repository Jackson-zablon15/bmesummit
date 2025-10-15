import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
  const { name, description, sheet, type } = req.body;

    // Require env var for the Apps Script URL to avoid using a hardcoded public URL.
    const scriptURL = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptURL) {
      console.error("Missing GOOGLE_SCRIPT_URL environment variable. Set it in .env.local or your environment.");
      return res.status(500).json({ message: "Server misconfiguration: GOOGLE_SCRIPT_URL is not set." });
    }

  const params = new URLSearchParams();
  params.append("name", name);
  params.append("description", description);
  if (sheet) params.append("sheet", sheet);
  if (type) params.append("type", type);

  // Optionally forward a server-side secret token to the Apps Script for simple auth
  const token = process.env.SCRIPT_SECRET;
  if (token) params.append("token", token);

  console.log("Using GOOGLE_SCRIPT_URL:", scriptURL);
  console.log("Forwarding params:", params.toString());
    const response = await fetch(scriptURL, {
      method: "POST",
      body: params,
    });

    const text = await response.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // not JSON
    }

    res.status(200).json({ raw: text, parsed });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
}
