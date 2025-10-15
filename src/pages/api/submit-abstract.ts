import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, description } = req.body;

  // Build params to forward to Apps Script
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("description", description);

  // Force the abstracts sheet name server-side to avoid client mistakes.
  const forcedSheetName = "Bme Connect Summit Abstracts";
  params.append("sheet", forcedSheetName);
  // Allow type to be forwarded if provided
  const { type } = req.body;
  if (type) params.append("type", type);

  // Require env var for the Apps Script URL to avoid using a hardcoded public URL.
  const scriptURL = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptURL) {
    console.error("Missing GOOGLE_SCRIPT_URL environment variable. Set it in .env.local or your environment.");
    return res.status(500).json({ message: "Server misconfiguration: GOOGLE_SCRIPT_URL is not set." });
  }

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

    // Return the raw text and parsed JSON (if any) to the client for debugging
    res.status(200).json({ raw: text, parsed });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
}
