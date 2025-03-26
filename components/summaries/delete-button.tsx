import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton() {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
    >
      <Trash2 className="w-8 h-8" />
    </Button>
  );
}
