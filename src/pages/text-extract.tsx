/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, type FormEvent } from "react";

interface ExtractedTextResponse {
  text?: string;
  error?: string;
}

export default function TextExtractor() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setText("");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;

    if (!file) {
      setError("Please select a file");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ExtractedTextResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.text) {
        setText(data.text);
      } else {
        throw new Error("No text extracted");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Text Extractor</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="file"
            name="file"
            accept=".docx,.pptx,.xlsx,.pdf"
            required
            className="rounded border p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          {loading ? "Extracting..." : "Extract Text"}
        </button>
      </form>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {text && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">Extracted Text:</h2>
          <pre className="whitespace-pre-wrap rounded bg-gray-100 p-4">
            {text}
          </pre>
        </div>
      )}
    </div>
  );
}
