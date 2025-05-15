
import { FC } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFileDisplayProps {
  file: File;
  onRemove: () => void;
}

const UploadedFileDisplay: FC<UploadedFileDisplayProps> = ({ file, onRemove }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full p-4 border rounded-lg bg-blue-50">
        <div className="flex items-center space-x-3">
          <Check className="h-5 w-5 text-green-500" />
          <span className="font-medium">{file.name}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default UploadedFileDisplay;
