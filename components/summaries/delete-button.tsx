"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummary } from "@/actions/summary-actions";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummary({ summaryId });
      if (!result.success) {
        toast.error("Error deleting summary");
      }

      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-gray-900 hover:bg-gray-600"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
