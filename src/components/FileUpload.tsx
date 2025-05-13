
import { FC, useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface FileUploadProps {
  selectedAlgorithm?: string;
}

const FileUpload: FC<FileUploadProps> = ({ selectedAlgorithm = "naive-bayes" }) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const algorithmInfo = {
    "naive-bayes": {
      name: "Naive Bayes",
      description: "A probabilistic classifier that applies Bayes' theorem with strong independence assumptions between features. Performs well for text classification with less training data."
    },
    "svm": {
      name: "Support Vector Machine (SVM)",
      description: "A supervised learning model that finds the optimal hyperplane to separate data. Excellent for high-dimensional spaces and effective for sentiment analysis."
    },
    "random-forest": {
      name: "Random Forest",
      description: "An ensemble learning method that builds multiple decision trees. Handles large feature sets well and avoids overfitting through averaging multiple models."
    },
    "lstm": {
      name: "Long Short-Term Memory (LSTM)",
      description: "A recurrent neural network architecture designed to recognize patterns in sequences. Excellent for capturing long-term dependencies in text data."
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadComplete(false);
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
    setProgress(0);
    
    // Simulate a file upload with progress
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      setProgress(uploadProgress);
      
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setUploadComplete(true);
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${file.name}`,
        });
      }
    }, 300);
  };

  const currentAlgorithm = algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo] || algorithmInfo["naive-bayes"];

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
          
          {file && !uploading && !uploadComplete && (
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
          
          {uploadComplete && selectedAlgorithm && (
            <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-100 text-left w-full">
              <h4 className="font-medium text-blue-700 mb-1">{currentAlgorithm.name}</h4>
              <p className="text-xs text-blue-600">{currentAlgorithm.description}</p>
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
