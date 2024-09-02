/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextApiRequest, NextApiResponse } from "next";
import { getTextExtractor, type InputType } from "office-text-extractor";
import { IncomingForm, type File } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ResponseData = {
  text?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const file = files.file as File[];
    if (!file || file.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const extractor = getTextExtractor();
      const text = await extractor.extractText({
        input: file[0]?.filepath as InputType,
        type: "file",
      });

      res.status(200).json({ text });
    } catch (error) {
      console.error("Error extracting text:", error);
      res.status(500).json({ error: "Error extracting text from file" });
    }
  });
}
