import { Resume } from "@/types/resume";
import { parseResumeFromPdf } from "@/utils/lib/pdf-parser";
import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Resume | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      async function parseResume(fileUrl: string) {
        const data = await parseResumeFromPdf(fileUrl);
        setParsedData(data);
      }
      void parseResume(fileUrl);
    }
  }, [file]);

  console.log(parsedData, "");

  return (
    <>
      <input type="file" onChange={handleChange} />
    </>
  );
}
