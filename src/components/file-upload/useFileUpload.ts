
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trainModel } from "@/utils/modelTraining";

interface UseFileUploadProps {
  selectedAlgorithm?: string;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  setUploadComplete: (complete: boolean) => void;
  setAnalysisData: (data: any) => void;
}

export const useFileUpload = ({
  selectedAlgorithm = "naive-bayes",
  uploadedFile,
  setUploadedFile,
  setUploadComplete,
  setAnalysisData
}: UseFileUploadProps) => {
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
      
      // Ensure all data points are properly structured for visualization
      const enhancedData = {
        ...result,
        // Ensure dashboard data points are available
        positive: result.sentimentCounts?.positive || 0,
        negative: result.sentimentCounts?.negative || 0,
        neutral: result.sentimentCounts?.neutral || 0,
        // Ensure most positive/negative aspects are available
        mostPositiveAspects: result.aspectAnalysis 
          ? result.aspectAnalysis
              .filter(aspect => aspect.positive > 60)
              .map(aspect => aspect.aspect)
              .slice(0, 3)
          : [],
        mostNegativeAspects: result.aspectAnalysis
          ? result.aspectAnalysis
              .filter(aspect => aspect.negative > 30)
              .map(aspect => aspect.aspect)
              .slice(0, 3)
          : [],
        // Ensure time series data has proper structure
        overTime: result.timeSeriesData?.daily || [],
        // Ensure keyword cloud data is available
        keywordCloud: result.topKeywords 
          ? result.topKeywords.map(kw => ({ text: kw.keyword, value: kw.count }))
          : [],
        // Set the algorithm used
        algorithm: selectedAlgorithm
      };
      
      // Set analysis data with the enhanced training result
      setAnalysisData(enhancedData);
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

  return {
    uploading,
    progress,
    trainingStage,
    algorithmInfo,
    handleFileChange,
    handleUpload,
    handleRemoveFile,
    currentAlgorithm: algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo] || algorithmInfo["naive-bayes"]
  };
};
