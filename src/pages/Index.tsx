
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import AlgorithmsContent from "@/components/algorithms/AlgorithmsContent";
import AspectAnalysis from "@/components/AspectAnalysis";
import Chatbot from "@/components/Chatbot";
import TimeSeriesAnalysis from "@/components/TimeSeriesAnalysis";
import Recommendations from "@/components/Recommendations";
import TabContent from "@/components/tabs/TabContent";
import { useToast } from "@/hooks/use-toast";

interface IndexProps {
  onAnalysisDataUpdate?: (data: any) => void;
}

const Index = ({ onAnalysisDataUpdate }: IndexProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("naive-bayes");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  // Log whenever analysis data changes
  const handleAnalysisDataChange = (data: any) => {
    console.log("Analysis data updated:", data);
    setAnalysisData(data);
    
    // Update the parent component with the analysis data
    if (onAnalysisDataUpdate) {
      onAnalysisDataUpdate(data);
    }
    
    if (data) {
      toast({
        title: "Analysis Ready",
        description: "All visualization features have been updated with the dataset analysis",
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardContent 
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            uploadComplete={uploadComplete}
            setUploadComplete={setUploadComplete}
            analysisData={analysisData}
            handleAnalysisDataChange={handleAnalysisDataChange}
          />
        );
      case "algorithms":
        return (
          <AlgorithmsContent
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            analysisData={analysisData}
          />
        );
      case "aspect-based":
        return (
          <TabContent 
            title="Aspect-Based Analysis"
            description="Identify specific aspects mentioned in reviews"
          >
            <AspectAnalysis data={analysisData} uploadComplete={uploadComplete} />
          </TabContent>
        );
      case "chatbot":
        return (
          <TabContent 
            title="AI Chatbot Assistant"
            description="Ask questions about your sentiment data"
          >
            <Chatbot data={analysisData} uploadComplete={uploadComplete} />
          </TabContent>
        );
      case "time-series":
        return (
          <TabContent 
            title="Time Series Analysis"
            description="Track sentiment changes over time"
          >
            <TimeSeriesAnalysis data={analysisData} uploadComplete={uploadComplete} />
          </TabContent>
        );
      case "recommendations":
        return (
          <TabContent 
            title="Actionable Recommendations"
            description="Get insights to improve your products and services"
          >
            <Recommendations data={analysisData} uploadComplete={uploadComplete} />
          </TabContent>
        );
      default:
        return (
          <DashboardContent 
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            uploadComplete={uploadComplete}
            setUploadComplete={setUploadComplete}
            analysisData={analysisData}
            handleAnalysisDataChange={handleAnalysisDataChange}
          />
        );
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
};

export default Index;
