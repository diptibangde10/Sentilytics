
import { FC, useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const FileUpload: FC = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate a file upload with progress
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      setProgress(uploadProgress);
      
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setUploading(false);
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${file.name}`,
        });
      }
    }, 300);
  };

  return (
    <Card className="overflow-hidden border gradient-border">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="border-2 border-dashed border-primary/40 rounded-lg p-6 w-full text-center cursor-pointer hover:bg-primary/5 transition-all">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv,.txt,.xlsx"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-12 w-12 text-primary mb-3" />
              <p className="text-foreground font-medium">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                CSV, TXT, XLSX (Max. 10MB)
              </p>
            </label>
          </div>
          
          {file && !uploading && (
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">File ready for upload</span>
            </div>
          )}
          
          {uploading && (
            <div className="w-full">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-xs text-center text-muted-foreground">
                Uploading... {progress}%
              </p>
            </div>
          )}
          
          <Button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : "Upload and Analyze"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
