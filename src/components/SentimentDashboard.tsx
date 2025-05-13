
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Minus, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface SentimentDashboardProps {
  data?: any;
}

const SentimentDashboard: FC<SentimentDashboardProps> = ({ data }) => {
  // Sample data for the dashboard
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
    ],
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'rgb(34, 197, 94)';
      case 'negative':
        return 'rgb(239, 68, 68)';
      default:
        return 'rgb(148, 163, 184)';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <span className="font-medium">{sentimentData.positive}%</span>
            </div>
            <Progress value={sentimentData.positive} className="h-2 bg-muted" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Minus className="mr-2 h-5 w-5 text-slate-400" />
                <span>Neutral</span>
              </div>
              <span className="font-medium">{sentimentData.neutral}%</span>
            </div>
            <Progress value={sentimentData.neutral} className="h-2 bg-muted" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ThumbsDown className="mr-2 h-5 w-5 text-red-500" />
                <span>Negative</span>
              </div>
              <span className="font-medium">{sentimentData.negative}%</span>
            </div>
            <Progress value={sentimentData.negative} className="h-2 bg-muted" />
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card col-span-full md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Positive Aspects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData.mostPositiveAspects.map((aspect: string, index: number) => (
              <div key={index} className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                <span>{aspect}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card col-span-full md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Negative Aspects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData.mostNegativeAspects.map((aspect: string, index: number) => (
              <div key={index} className="flex items-center">
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                <span>{aspect}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card col-span-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Sentiment Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sentimentData.overTime}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              stackOffset="expand"
              barGap={0}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: any, name: any) => [`${value}%`, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              {['positive', 'neutral', 'negative'].map((entry, index) => (
                <Bar 
                  key={`bar-${index}`} 
                  dataKey={entry} 
                  stackId="a" 
                  fill={getColor(entry)}
                  name={entry.charAt(0).toUpperCase() + entry.slice(1)}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentDashboard;
