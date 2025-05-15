
import { FC, useState, useEffect } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { trainModel } from "@/utils/modelTraining";

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
  const [trainingStage, setTrainingStage] = useState<string>("");

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

  const handleUpload = async () => {
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
    setTrainingStage("Uploading file...");
    
    try {
      // Simulate initial file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTrainingStage("Training model...");
      
      // Train the model with the uploaded file
      const result = await trainModel({
        algorithm: selectedAlgorithm,
        file: uploadedFile,
        onProgress: (currentProgress) => {
          setProgress(currentProgress);
          
          // Update stage based on progress
          if (currentProgress <= 20) setTrainingStage("Processing data...");
          else if (currentProgress <= 40) setTrainingStage("Extracting features...");
          else if (currentProgress <= 70) setTrainingStage("Training model...");
          else if (currentProgress <= 90) setTrainingStage("Evaluating model...");
          else setTrainingStage("Generating insights...");
        }
      });
      
      // Set analysis data with the training result
      setAnalysisData(result);
      setUploadComplete(true);
      
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${uploadedFile.name} using ${algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo].name}`,
      });
    } catch (error) {
      console.error("Training error:", error);
      
      toast({
        title: "Training failed",
        description: "There was an error training the model. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadComplete(false);
    setAnalysisData(null);
    toast({
      title: "File removed",
      description: "The dataset has been removed"
    });
  };

  const currentAlgorithm = algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo] || algorithmInfo["naive-bayes"];

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
                {trainingStage} ({Math.round(progress)}%)
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
