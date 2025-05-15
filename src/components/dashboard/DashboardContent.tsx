
import React from "react";
import FileUpload from "@/components/FileUpload";
import AlgorithmSelector from "@/components/AlgorithmSelector";
import SentimentDashboard from "@/components/SentimentDashboard";
import HeroSection from "./HeroSection";

interface DashboardContentProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  uploadComplete: boolean;
  setUploadComplete: (complete: boolean) => void;
  analysisData: any;
  handleAnalysisDataChange: (data: any) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  uploadedFile,
  setUploadedFile,
  uploadComplete,
  setUploadComplete,
  analysisData,
  handleAnalysisDataChange,
}) => {
  return (
    <div className="space-y-8">
      <HeroSection 
        title="Advanced Sentiment Analysis Platform"
        description="Leverage machine learning to analyze customer feedback and extract meaningful insights from your data"
      />
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="slide-up" style={{ animationDuration: '0.6s', animationDelay: '0.1s' }}>
            <FileUpload 
              selectedAlgorithm={selectedAlgorithm} 
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              uploadComplete={uploadComplete}
              setUploadComplete={setUploadComplete}
              setAnalysisData={handleAnalysisDataChange}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="slide-up" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}>
            <AlgorithmSelector 
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
            />
          </div>
        </div>
      </div>
      <div className="slide-up" style={{ animationDuration: '1s', animationDelay: '0.3s' }}>
        <SentimentDashboard data={analysisData} />
      </div>
    </div>
  );
};

export default DashboardContent;
