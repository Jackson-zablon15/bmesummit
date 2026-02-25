import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fullname, institution, phone, email, sheet, type } = req.body;

    const scriptURL = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptURL) {
      console.error("Missing GOOGLE_SCRIPT_URL environment variable.");
      return res
        .status(500)
        .json({ message: "Server misconfiguration: GOOGLE_SCRIPT_URL is not set." });
    }

    const params = new URLSearchParams();
    params.append("fullname", String(fullname || ""));
    params.append("institution", String(institution || ""));
    params.append("phone", String(phone || ""));
    params.append("email", String(email || ""));
    if (sheet) params.append("sheet", String(sheet));
    if (type) params.append("type", String(type));

    const token = process.env.SCRIPT_SECRET;
    if (token) params.append("token", token);

    const response = await fetch(scriptURL, {
      method: "POST",
      body: params,
    });

    const text = await response.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Not JSON
    }

    return res.status(200).json({ raw: text, parsed });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message });
  }
}
