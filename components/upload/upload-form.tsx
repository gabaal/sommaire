"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";

const schema = z.object({});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validate the fields
    // Schema with Zod
    // Upload the file to UploadThing
    // Parse the PDF using LangChain
    // Summarize the pdf using AI
    // Save the summary to the database
    // Redirect to the [id] summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
