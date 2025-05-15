
import { FC } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import the new components
import FileDropzone from "@/components/file-upload/FileDropzone";
import UploadedFileDisplay from "@/components/file-upload/UploadedFileDisplay";
import UploadProgress from "@/components/file-upload/UploadProgress";
import AlgorithmDetails from "@/components/file-upload/AlgorithmDetails";
import { useFileUpload } from "@/components/file-upload/useFileUpload";

interface FileUploadProps {
  selectedAlgorithm?: string;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  uploadComplete: boolean;
  setUploadComplete: (complete: boolean) => void;
  setAnalysisData: (data: any) => void;
}

const FileUpload: FC<FileUploadProps> = ({
  selectedAlgorithm = "naive-bayes",
  uploadedFile,
  setUploadedFile,
  uploadComplete,
  setUploadComplete,
  setAnalysisData
}) => {
  const {
    uploading,
    progress,
    trainingStage,
    algorithmInfo,
    handleFileChange,
    handleUpload,
    handleRemoveFile,
    currentAlgorithm
  } = useFileUpload({
    selectedAlgorithm,
    uploadedFile,
    setUploadedFile,
    setUploadComplete,
    setAnalysisData
  });

  return (
    <Card className="overflow-hidden border gradient-border">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          {!uploadedFile ? (
            <FileDropzone handleFileChange={handleFileChange} />
          ) : (
            <UploadedFileDisplay file={uploadedFile} onRemove={handleRemoveFile} />
          )}
          
          {uploadedFile && !uploading && !uploadComplete && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">File ready for upload</span>
            </div>
          )}
          
          {uploading && (
            <UploadProgress progress={progress} stage={trainingStage} />
          )}
          
          {uploadComplete && selectedAlgorithm && (
            <AlgorithmDetails 
              algorithm={currentAlgorithm} 
              fileName={uploadedFile.name} 
            />
          )}
          
          {uploadedFile && !uploadComplete && !uploading && (
            <Button
              onClick={handleUpload}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
            >
              Upload and Analyze
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
