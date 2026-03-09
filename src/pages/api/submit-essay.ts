import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

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

        let response: Response;
        try {
            response = await fetch(scriptURL, {
                method: "POST",
                body: params,
                signal: AbortSignal.timeout(15000),
            });
        } catch (error: unknown) {
            const cause = error instanceof Error && "cause" in error ? (error as Error & { cause?: unknown }).cause : undefined;
            const causeText =
                cause && typeof cause === "object"
                    ? JSON.stringify(cause)
                    : cause
                        ? String(cause)
                        : "No additional network details available.";

            throw new Error(`Failed to reach GOOGLE_SCRIPT_URL. Check URL/DNS/TLS/network. Cause: ${causeText}`);
        }

        if (!response.ok) {
            const failureText = await response.text();
            return res.status(502).json({
                message: `Google Script returned HTTP ${response.status}: ${failureText.slice(0, 300) || "empty response"}`,
            });
        }

        if (req.body.pdfBase64 && req.body.pdfName) {
            const nodemailer = await import("nodemailer");
            const smtpHost = process.env.SMTP_HOST;
            const smtpPort = Number(process.env.SMTP_PORT || "587");
            const smtpUser = process.env.SMTP_USER;
            const smtpPass = process.env.SMTP_PASS;
            const smtpFrom = process.env.SMTP_FROM || smtpUser;

            if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
                throw new Error("SMTP settings are missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.");
            }

            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });

            await transporter.sendMail({
                from: smtpFrom,
                to: "bmeconnectsummit@gmail.com",
                subject: `New Essay Submission: ${String(req.body.title || "Untitled")}`,
                text: [
                    "A new essay has been submitted.",
                    `Full Name: ${String(req.body.fullname || "")}`,
                    `Institution: ${String(req.body.institution || "")}`,
                    `Phone: ${String(req.body.phone || "")}`,
                    `Email: ${String(req.body.email || "")}`,
                    `Title: ${String(req.body.title || "")}`,
                ].join("\n"),
                attachments: [
                    {
                        filename: String(req.body.pdfName),
                        content: Buffer.from(String(req.body.pdfBase64), "base64"),
                        contentType: String(req.body.pdfMimeType || "application/pdf"),
                    },
                ],
            });
        }

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
