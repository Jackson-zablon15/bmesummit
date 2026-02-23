import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { name, description, sheet, type } = req.body;

        // Require env var for the Apps Script URL
        const scriptURL = process.env.GOOGLE_SCRIPT_URL;
        if (!scriptURL) {
            console.error("Missing GOOGLE_SCRIPT_URL environment variable.");
            return res.status(500).json({ message: "Server misconfiguration: GOOGLE_SCRIPT_URL is not set." });
        }

        const params = new URLSearchParams();
        // Default fallback if not provided
        params.append("name", name || "");
        params.append("description", description || "");

        // forward common fields
        if (req.body.fullname) params.append("fullname", String(req.body.fullname));
        if (req.body.institution) params.append("institution", String(req.body.institution));
        if (req.body.phone) params.append("phone", String(req.body.phone));
        if (req.body.email) params.append("email", String(req.body.email));
        if (req.body.title) params.append("title", String(req.body.title));
        if (sheet) params.append("sheet", sheet);
        if (type) params.append("type", type);

        // Forward secret token
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
            // not JSON
        }

        res.status(200).json({ raw: text, parsed });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message });
    }
}
