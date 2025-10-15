import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, description } = req.body;

    const scriptURL = "https://script.google.com/macros/s/AKfycbwp6jBWJ1PV8p48IgXOHlgNsM_OzJVMltBAgnctyZRSRVOKlL9aNqlhI6jUSVbpkK2R/exec";
    const params = new URLSearchParams();
    params.append("name", name);
    params.append("description", description);

    const response = await fetch(scriptURL, {
      method: "POST",
      body: params,
    });

    const result = await response.text();
    res.status(200).json({ result });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
