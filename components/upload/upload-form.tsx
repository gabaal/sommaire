"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
      toast.success("🗃️ uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occured while uploading", err);
      toast.error("Error uploading file");
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
      toast.success("🗃️ Upload has begun");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validate the fields using schema with Zod
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      toast.error("Invalid file");
      return;
    }
    toast.success("🗃️ Uploading file");
    // Upload the file to UploadThing
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Please use a different file");
      return;
    }

    toast.success("🗃️ Processing file, this may take some time");
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
