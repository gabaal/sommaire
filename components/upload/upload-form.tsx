"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

    try {
      setIsLoading(true);
      console.log("submitted");
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // Validate the fields using schema with Zod
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );
        toast.error("Invalid file");
        setIsLoading(false);
        return;
      }
      toast.success("🗃️ Uploading file");
      // Upload the file to UploadThing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Please use a different file");
        setIsLoading(false);
        return;
      }

      toast.success("🗃️ Processing file, this may take some time");
      // Parse the PDF using LangChain
      // Summarize the pdf using AI
      const result = await generatePdfSummary(resp);
      console.log({ result });
      formRef.current?.reset();
      toast.success("🗃️ Summary complete, now saving...");
      setIsLoading(false);
      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast.success("🗃️ Summary complete, now saving...");

        setIsLoading(false);
        if (data.summary) {
          // Save the summary to the database
          storeResult = await storePdfSummaryAction({
            fileUrl: resp[0].serverData.file.url,
            summary: data.summary,
            title: data.title,
            fileName: file.name,
          });
          toast.success("🗃️ Summary complete and saved.");
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
          // Redirect to the [id] summary page
        }
      }
    } catch (error) {
      console.error("Error occured", error);
      setIsLoading(false);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
