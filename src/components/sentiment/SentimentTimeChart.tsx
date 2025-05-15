
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface TimeSeriesEntry {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
  [key: string]: any;
}

interface SentimentTimeChartProps {
  data: TimeSeriesEntry[];
}

const SentimentTimeChart: FC<SentimentTimeChartProps> = ({ data = [] }) => {
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
    <Card className="dashboard-card col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sentiment Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              labelFormatter={(label) => `Date: ${label}`}
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
  );
};

export default SentimentTimeChart;
