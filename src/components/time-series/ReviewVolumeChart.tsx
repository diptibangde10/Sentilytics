
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ReviewVolumeChartProps {
  chartData: any[];
  uploadComplete: boolean;
}

const ReviewVolumeChart: FC<ReviewVolumeChartProps> = ({ chartData, uploadComplete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Review Volume</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
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
            {uploadComplete 
              ? "This chart shows actual review volume trends from your dataset." 
              : "Upload your dataset to see actual review volume trends."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewVolumeChart;
