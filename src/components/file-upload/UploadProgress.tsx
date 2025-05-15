
import { FC } from "react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  stage: string;
}

const UploadProgress: FC<UploadProgressProps> = ({ progress, stage }) => {
  return (
    <div className="w-full">
      <Progress value={progress} className="h-2 mb-2" />
      <p className="text-xs text-center text-muted-foreground">
        {stage} ({Math.round(progress)}%)
      </p>
    </div>
  );
};

export default UploadProgress;
