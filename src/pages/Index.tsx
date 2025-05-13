
import { useState } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import SentimentDashboard from "@/components/SentimentDashboard";
import AlgorithmSelector from "@/components/AlgorithmSelector";
import AspectAnalysis from "@/components/AspectAnalysis";
import Chatbot from "@/components/Chatbot";
import TimeSeriesAnalysis from "@/components/TimeSeriesAnalysis";
import Recommendations from "@/components/Recommendations";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("naive-bayes");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <FileUpload />
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <AlgorithmSelector 
                      selectedAlgorithm={selectedAlgorithm}
                      onSelectAlgorithm={setSelectedAlgorithm}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <SentimentDashboard />
          </div>
        );
      case "algorithms":
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <AlgorithmSelector 
                  selectedAlgorithm={selectedAlgorithm}
                  onSelectAlgorithm={setSelectedAlgorithm}
                />
              </CardContent>
            </Card>
            <SentimentDashboard />
          </div>
        );
      case "aspect-based":
        return <AspectAnalysis />;
      case "chatbot":
        return <Chatbot />;
      case "time-series":
        return <TimeSeriesAnalysis />;
      case "recommendations":
        return <Recommendations />;
      default:
        return <SentimentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
