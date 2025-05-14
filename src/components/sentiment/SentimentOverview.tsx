
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SentimentOverviewProps {
  positive: number;
  negative: number;
  neutral: number;
}

const SentimentOverview: FC<SentimentOverviewProps> = ({ 
  positive = 0,
  negative = 0,
  neutral = 0
}) => {
  return (
    <Card className="dashboard-card col-span-full lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sentiment Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
              <span>Positive</span>
            </div>
            <span className="font-medium">{positive}%</span>
          </div>
          <Progress value={positive} className="h-2 bg-muted" />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Minus className="mr-2 h-5 w-5 text-slate-400" />
              <span>Neutral</span>
            </div>
            <span className="font-medium">{neutral}%</span>
          </div>
          <Progress value={neutral} className="h-2 bg-muted" />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ThumbsDown className="mr-2 h-5 w-5 text-red-500" />
              <span>Negative</span>
            </div>
            <span className="font-medium">{negative}%</span>
          </div>
          <Progress value={negative} className="h-2 bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentOverview;
