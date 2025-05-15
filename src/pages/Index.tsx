
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
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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
          <div className="space-y-8">
            {/* Hero section */}
            <div className="fitapp-hero py-12 px-4 rounded-xl mb-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Advanced Sentiment Analysis Platform</h1>
                <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                  Leverage machine learning to analyze customer feedback and extract meaningful insights from your data
                </p>
              </div>
            </div>
            
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
      case "algorithms":
        return (
          <div className="space-y-8">
            <div className="fitapp-hero py-8 px-4 rounded-xl mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Algorithm Selection</h2>
              <p className="text-center opacity-90 mt-2">Choose the best algorithm for your sentiment analysis needs</p>
            </div>
            
            <div className="slide-up" style={{ animationDuration: '0.6s' }}>
              <AlgorithmSelector 
                selectedAlgorithm={selectedAlgorithm}
                onSelectAlgorithm={setSelectedAlgorithm}
              />
            </div>
            <div className="slide-up" style={{ animationDuration: '0.8s' }}>
              <SentimentDashboard data={analysisData} />
            </div>
          </div>
        );
      case "aspect-based":
        return (
          <div>
            <div className="fitapp-hero py-8 px-4 rounded-xl mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Aspect-Based Analysis</h2>
              <p className="text-center opacity-90 mt-2">Identify specific aspects mentioned in reviews</p>
            </div>
            
            <div className="slide-up" style={{ animationDuration: '0.6s' }}>
              <AspectAnalysis data={analysisData} uploadComplete={uploadComplete} />
            </div>
          </div>
        );
      case "chatbot":
        return (
          <div>
            <div className="fitapp-hero py-8 px-4 rounded-xl mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">AI Chatbot Assistant</h2>
              <p className="text-center opacity-90 mt-2">Ask questions about your sentiment data</p>
            </div>
            
            <div className="slide-up" style={{ animationDuration: '0.6s' }}>
              <Chatbot data={analysisData} uploadComplete={uploadComplete} />
            </div>
          </div>
        );
      case "time-series":
        return (
          <div>
            <div className="fitapp-hero py-8 px-4 rounded-xl mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Time Series Analysis</h2>
              <p className="text-center opacity-90 mt-2">Track sentiment changes over time</p>
            </div>
            
            <div className="slide-up" style={{ animationDuration: '0.6s' }}>
              <TimeSeriesAnalysis data={analysisData} uploadComplete={uploadComplete} />
            </div>
          </div>
        );
      case "recommendations":
        return (
          <div>
            <div className="fitapp-hero py-8 px-4 rounded-xl mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">Actionable Recommendations</h2>
              <p className="text-center opacity-90 mt-2">Get insights to improve your products and services</p>
            </div>
            
            <div className="slide-up" style={{ animationDuration: '0.6s' }}>
              <Recommendations data={analysisData} uploadComplete={uploadComplete} />
            </div>
          </div>
        );
      default:
        return (
          <div className="slide-up" style={{ animationDuration: '0.6s' }}>
            <SentimentDashboard data={analysisData} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
      
      {/* FitApp style footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sentiment Analysis Platform</h3>
              <p className="text-gray-300">
                Powerful tools to help businesses understand customer feedback and improve their products and services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-accent">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-accent">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300">
                Have questions? Reach out to our team.
              </p>
              <a href="#" className="block mt-3 fitapp-button inline-flex">
                Contact Support
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>© 2025 Sentiment Analysis Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
