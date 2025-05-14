
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AspectAnalysisProps {
  data?: any;
  uploadComplete?: boolean;
}

const AspectAnalysis: FC<AspectAnalysisProps> = ({ data, uploadComplete = false }) => {
  // Sample data for aspect-based sentiment analysis
  const sampleData = [
    {
      aspect: "Product Quality",
      positive: 75,
      neutral: 15,
      negative: 10,
      keywords: ["durable", "well-made", "solid", "premium"],
    },
    {
      aspect: "User Experience",
      positive: 82,
      neutral: 10,
      negative: 8,
      keywords: ["intuitive", "easy-to-use", "seamless", "convenient"],
    },
    {
      aspect: "Price",
      positive: 30,
      neutral: 15,
      negative: 55,
      keywords: ["expensive", "overpriced", "costly", "high-price"],
    },
    {
      aspect: "Customer Support",
      positive: 45,
      neutral: 20,
      negative: 35,
      keywords: ["helpful", "responsive", "slow", "unresponsive"],
    },
    {
      aspect: "Design",
      positive: 90,
      neutral: 5,
      negative: 5,
      keywords: ["elegant", "sleek", "beautiful", "stylish"],
    },
  ];
  
  // Ensure aspectData is always an array
  const aspectData = Array.isArray(data) ? data : sampleData;

  const getSentimentIcon = (positive: number, negative: number) => {
    if (positive >= 70) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (negative >= 30) return <XCircle className="h-5 w-5 text-red-500" />;
    return <AlertCircle className="h-5 w-5 text-amber-500" />;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {aspectData.map((aspect, index) => (
        <Card key={index} className="overflow-hidden hover-scale border gradient-border">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                {getSentimentIcon(aspect.positive, aspect.negative)}
                {aspect.aspect}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm">Positive</span>
                </div>
                <span className="text-sm font-medium">{aspect.positive}%</span>
              </div>
              <Progress value={aspect.positive} className="h-2 bg-muted" 
                style={{
                  background: 'linear-gradient(to right, rgba(74, 222, 128, 0.2), rgba(74, 222, 128, 0.05))',
                  color: 'rgb(74, 222, 128)'
                }}
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  <span className="text-sm">Neutral</span>
                </div>
                <span className="text-sm font-medium">{aspect.neutral}%</span>
              </div>
              <Progress value={aspect.neutral} className="h-2 bg-muted" 
                style={{
                  background: 'linear-gradient(to right, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05))',
                  color: 'rgb(251, 191, 36)'
                }}
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                  <span className="text-sm">Negative</span>
                </div>
                <span className="text-sm font-medium">{aspect.negative}%</span>
              </div>
              <Progress value={aspect.negative} className="h-2 bg-muted" 
                style={{
                  background: 'linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
                  color: 'rgb(239, 68, 68)'
                }}
              />

              <div className="pt-2">
                <p className="text-sm font-medium mb-1">Common Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {aspect.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-1 text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AspectAnalysis;
