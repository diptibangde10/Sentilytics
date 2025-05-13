
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
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
                  <FileUpload selectedAlgorithm={selectedAlgorithm} />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="animate-fade-in" style={{ animationDuration: '0.8s' }}>
                  <AlgorithmSelector 
                    selectedAlgorithm={selectedAlgorithm}
                    onSelectAlgorithm={setSelectedAlgorithm}
                  />
                </div>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDuration: '1s' }}>
              <SentimentDashboard />
            </div>
          </div>
        );
      case "algorithms":
        return (
          <div className="space-y-8">
            <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
              <AlgorithmSelector 
                selectedAlgorithm={selectedAlgorithm}
                onSelectAlgorithm={setSelectedAlgorithm}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDuration: '0.8s' }}>
              <SentimentDashboard />
            </div>
          </div>
        );
      case "aspect-based":
        return (
          <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
            <AspectAnalysis />
          </div>
        );
      case "chatbot":
        return (
          <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
            <Chatbot />
          </div>
        );
      case "time-series":
        return (
          <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
            <TimeSeriesAnalysis />
          </div>
        );
      case "recommendations":
        return (
          <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
            <Recommendations />
          </div>
        );
      default:
        return (
          <div className="animate-fade-in" style={{ animationDuration: '0.6s' }}>
            <SentimentDashboard />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
