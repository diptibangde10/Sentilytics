
import React from "react";
import AlgorithmSelector from "@/components/AlgorithmSelector";
import SentimentDashboard from "@/components/SentimentDashboard";
import HeroSection from "../dashboard/HeroSection";

interface AlgorithmsContentProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  analysisData: any;
}

const AlgorithmsContent: React.FC<AlgorithmsContentProps> = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  analysisData,
}) => {
  return (
    <div className="space-y-8">
      <HeroSection 
        title="Algorithm Selection"
        description="Choose the best algorithm for your sentiment analysis needs"
      />
      
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
};

export default AlgorithmsContent;
