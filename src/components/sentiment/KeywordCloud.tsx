
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { ScatterChart, Scatter, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface KeywordItem {
  text: string;
  value: number;
}

interface KeywordCloudProps {
  keywords: KeywordItem[];
}

const KeywordCloud: FC<KeywordCloudProps> = ({ keywords = [] }) => {
  // Function to get a color for word cloud based on value
  const getWordCloudColor = (value: number) => {
    const maxValue = keywords.length > 0 
      ? Math.max(...keywords.map(item => item.value))
      : 0;
    const minValue = keywords.length > 0
      ? Math.min(...keywords.map(item => item.value))
      : 0;
    const normalizedValue = (value - minValue) / (maxValue - minValue || 1);
    
    // Color palette from lighter to darker
    if (normalizedValue > 0.75) return '#8B5CF6'; // Vivid Purple
    if (normalizedValue > 0.5) return '#9b87f5';  // Primary Purple
    if (normalizedValue > 0.25) return '#D6BCFA'; // Light Purple
    return '#E5DEFF';  // Soft Purple
  };

  // Create word cloud data for scatter chart
  const prepareWordCloudData = () => {
    if (!keywords.length) return [];
    
    const maxValue = Math.max(...keywords.map(item => item.value));
    const data = [];
    
    // Position words in a circular pattern with random offsets
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    
    keywords.forEach((item, index) => {
      const angle = (index / keywords.length) * Math.PI * 2;
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
    <Card className="dashboard-card col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Keyword Cloud
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative">
        {keywords.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-muted-foreground">No keyword data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordCloud;
