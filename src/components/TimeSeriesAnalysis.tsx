
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface TimeSeriesAnalysisProps {
  data?: any;
}

const TimeSeriesAnalysis: FC<TimeSeriesAnalysisProps> = ({ data }) => {
  // Sample time series data
  const timeSeriesData = data || {
    daily: [
      { date: "May 1", positive: 62, neutral: 18, negative: 20, volume: 145 },
      { date: "May 2", positive: 65, neutral: 20, negative: 15, volume: 132 },
      { date: "May 3", positive: 60, neutral: 18, negative: 22, volume: 158 },
      { date: "May 4", positive: 63, neutral: 15, negative: 22, volume: 175 },
      { date: "May 5", positive: 68, neutral: 17, negative: 15, volume: 162 },
      { date: "May 6", positive: 65, neutral: 15, negative: 20, volume: 148 },
      { date: "May 7", positive: 70, neutral: 13, negative: 17, volume: 166 },
      { date: "May 8", positive: 72, neutral: 15, negative: 13, volume: 187 },
      { date: "May 9", positive: 68, neutral: 18, negative: 14, volume: 154 },
      { date: "May 10", positive: 65, neutral: 20, negative: 15, volume: 142 },
    ],
    weekly: [
      { date: "Week 1", positive: 63, neutral: 17, negative: 20, volume: 620 },
      { date: "Week 2", positive: 66, neutral: 16, negative: 18, volume: 685 },
      { date: "Week 3", positive: 70, neutral: 15, negative: 15, volume: 710 },
      { date: "Week 4", positive: 67, neutral: 18, negative: 15, volume: 698 },
    ],
    monthly: [
      { date: "Jan", positive: 58, neutral: 22, negative: 20, volume: 2450 },
      { date: "Feb", positive: 62, neutral: 18, negative: 20, volume: 2680 },
      { date: "Mar", positive: 65, neutral: 17, negative: 18, volume: 2820 },
      { date: "Apr", positive: 68, neutral: 16, negative: 16, volume: 2910 },
      { date: "May", positive: 65, neutral: 18, negative: 17, volume: 2750 },
    ],
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Time Series Analysis</h3>
        </div>
        <Select defaultValue="daily">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Sentiment Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData.daily}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, '']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="#22c55e"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Positive"
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Neutral"
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="#ef4444"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Negative"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Review Volume</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeSeriesData.daily}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value: any) => [value, 'Reviews']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                  name="Review Volume"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <p className="text-sm text-muted-foreground">
              Spikes in review volume may indicate product promotions or feature releases.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeSeriesAnalysis;
