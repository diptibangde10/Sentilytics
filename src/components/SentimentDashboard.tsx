
import { FC } from "react";
import SentimentOverview from "@/components/sentiment/SentimentOverview";
import AspectsList from "@/components/sentiment/AspectsList";
import SentimentTimeChart from "@/components/sentiment/SentimentTimeChart";
import KeywordCloud from "@/components/sentiment/KeywordCloud";
import { KeywordItem } from "@/types/keywordCloud";
import { useToast } from "@/hooks/use-toast";

interface SentimentDashboardProps {
  data?: any;
}

const SentimentDashboard: FC<SentimentDashboardProps> = ({ data }) => {
  const { toast } = useToast();
  
  // Use data from file analysis or fallback to sample data
  const sentimentData = data || {
    positive: 65,
    negative: 20,
    neutral: 15,
    mostPositiveAspects: ["Quality", "Design", "Performance"],
    mostNegativeAspects: ["Price", "Customer Support", "Durability"],
    overTime: [
      { name: "Jan", positive: 55, neutral: 30, negative: 15 },
      { name: "Feb", positive: 60, neutral: 20, negative: 20 },
      { name: "Mar", positive: 65, neutral: 15, negative: 20 },
      { name: "Apr", positive: 70, neutral: 15, negative: 15 },
      { name: "May", positive: 65, neutral: 15, negative: 20 },
    ],
    keywordCloud: [
      { text: "excellent", value: 64 },
      { text: "great", value: 42 },
      { text: "premium", value: 36 },
      { text: "expensive", value: 28 },
      { text: "recommended", value: 22 },
      { text: "quality", value: 48 },
      { text: "satisfied", value: 34 },
      { text: "disappointed", value: 18 },
      { text: "overpriced", value: 25 },
      { text: "efficient", value: 30 },
      { text: "reliable", value: 38 },
      { text: "innovative", value: 32 },
      { text: "user-friendly", value: 26 },
      { text: "frustrating", value: 15 },
    ],
  };

  // Make sure all array properties exist to prevent map errors
  const positiveAspects = sentimentData?.mostPositiveAspects || [];
  const negativeAspects = sentimentData?.mostNegativeAspects || [];
  const timeSeriesData = sentimentData?.overTime || [];
  const keywordCloudData = sentimentData?.keywordCloud || [] as KeywordItem[];
  
  // Log the data to help with debugging
  console.log("SentimentDashboard received data:", sentimentData);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <SentimentOverview 
        positive={sentimentData.positive}
        negative={sentimentData.negative}
        neutral={sentimentData.neutral}
      />
      
      <AspectsList
        aspects={positiveAspects}
        type="positive"
        title="Positive Aspects"
      />
      
      <AspectsList
        aspects={negativeAspects}
        type="negative"
        title="Negative Aspects"
      />
      
      <div className="col-span-full">
        <SentimentTimeChart data={timeSeriesData} />
      </div>
      
      <div className="col-span-full">
        <KeywordCloud keywords={keywordCloudData} />
      </div>
    </div>
  );
};

export default SentimentDashboard;
