import { FC, useState, useEffect } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setUploadComplete(false);
    }
  };

  const handleUpload = () => {
    if (!uploadedFile) {
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
        
        // Generate mock analysis data based on the selected algorithm
        const mockAnalysisData = generateMockAnalysisData(selectedAlgorithm);
        setAnalysisData(mockAnalysisData);
        
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${uploadedFile.name}`,
        });
      }
    }, 300);
  };

  // Generate mock analysis data based on the selected algorithm
  const generateMockAnalysisData = (algorithm: string) => {
    // Base sentiment data that all algorithms will have
    const baseData = {
      sentimentCounts: {
        positive: Math.floor(Math.random() * 50) + 50,
        neutral: Math.floor(Math.random() * 30) + 20,
        negative: Math.floor(Math.random() * 30) + 10
      },
      topKeywords: [
        { keyword: "excellent", count: Math.floor(Math.random() * 50) + 30 },
        { keyword: "great", count: Math.floor(Math.random() * 50) + 25 },
        { keyword: "good", count: Math.floor(Math.random() * 40) + 20 },
        { keyword: "average", count: Math.floor(Math.random() * 30) + 15 },
        { keyword: "poor", count: Math.floor(Math.random() * 20) + 10 }
      ],
      algorithm: algorithm
    };

    // Algorithm-specific data
    switch (algorithm) {
      case "naive-bayes":
        return {
          ...baseData,
          accuracy: 82 + Math.random() * 5,
          confidenceScores: [0.87, 0.76, 0.92, 0.81, 0.79]
        };
      case "svm":
        return {
          ...baseData,
          accuracy: 86 + Math.random() * 6,
          confidenceScores: [0.91, 0.84, 0.89, 0.86, 0.82]
        };
      case "random-forest":
        return {
          ...baseData,
          accuracy: 84 + Math.random() * 7,
          confidenceScores: [0.88, 0.83, 0.91, 0.87, 0.85]
        };
      default:
        return baseData;
    }
  };

  const currentAlgorithm = algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo] || algorithmInfo["naive-bayes"];

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadComplete(false);
    setAnalysisData(null);
    toast({
      title: "File removed",
      description: "The dataset has been removed"
    });
  };

  return (
    <Card className="overflow-hidden border gradient-border">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center gap-4">
          {!uploadedFile ? (
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
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  CSV, TXT, XLSX (Max. 10MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between w-full p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{uploadedFile.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  Remove
                </Button>
              </div>
            </div>
          )}
          
          {uploadedFile && !uploading && !uploadComplete && (
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
              <div className="mt-3 pt-2 border-t border-blue-100">
                <p className="text-xs font-medium text-blue-700">Dataset: {uploadedFile.name}</p>
                <p className="text-xs text-blue-600 mt-1">Analysis complete. View results in the dashboard.</p>
              </div>
            </div>
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
