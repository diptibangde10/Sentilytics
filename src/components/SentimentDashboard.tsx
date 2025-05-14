
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Minus, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter } from "recharts";

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
  const keywordCloudData = sentimentData?.keywordCloud || [];

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

  // Function to get a color for word cloud based on value
  const getWordCloudColor = (value: number) => {
    const maxValue = Math.max(...keywordCloudData.map(item => item.value));
    const minValue = Math.min(...keywordCloudData.map(item => item.value));
    const normalizedValue = (value - minValue) / (maxValue - minValue || 1);
    
    // Color palette from lighter to darker
    if (normalizedValue > 0.75) return '#8B5CF6'; // Vivid Purple
    if (normalizedValue > 0.5) return '#9b87f5';  // Primary Purple
    if (normalizedValue > 0.25) return '#D6BCFA'; // Light Purple
    return '#E5DEFF';  // Soft Purple
  };

  // Create word cloud data for scatter chart
  const prepareWordCloudData = () => {
    if (!keywordCloudData.length) return [];
    
    const maxValue = Math.max(...keywordCloudData.map(item => item.value));
    const data = [];
    
    // Position words in a circular pattern with random offsets
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    
    keywordCloudData.forEach((item, index) => {
      const angle = (index / keywordCloudData.length) * Math.PI * 2;
      const randomRadius = radius * (0.6 + Math.random() * 0.4);
      const x = centerX + Math.cos(angle) * randomRadius;
      const y = centerY + Math.sin(angle) * randomRadius;
      const size = (item.value / maxValue) * 20 + 10; // Size proportional to value
      
      data.push({
        x,
        y,
        z: size,
        text: item.text,
        value: item.value,
        color: getWordCloudColor(item.value)
      });
    });
    
    return data;
  };

  const wordCloudData = prepareWordCloudData();

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
            {positiveAspects.map((aspect: string, index: number) => (
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
            {negativeAspects.map((aspect: string, index: number) => (
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
              data={timeSeriesData}
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

      <Card className="dashboard-card col-span-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Keyword Cloud</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <Scatter 
                data={wordCloudData} 
                fill="#8884d8"
              >
                {wordCloudData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Scatter>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
                        <p className="font-medium">{data.text}</p>
                        <p>Count: {data.value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none">
            {wordCloudData.map((entry, index) => (
              <div
                key={`word-${index}`}
                className="absolute"
                style={{
                  left: `${entry.x}%`,
                  top: `${entry.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: `${entry.z}px`,
                  color: entry.color,
                  fontWeight: entry.value > 30 ? 'bold' : 'normal',
                  textShadow: '0 0 1px rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {entry.text}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentDashboard;
