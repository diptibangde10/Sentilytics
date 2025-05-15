
import { FC } from "react";
import TimeSeriesHeader from "./time-series/TimeSeriesHeader";
import SentimentTrendChart from "./time-series/SentimentTrendChart";
import ReviewVolumeChart from "./time-series/ReviewVolumeChart";
import { useTimeSeriesData } from "@/hooks/useTimeSeriesData";

interface TimeSeriesAnalysisProps {
  data?: any;
  uploadComplete?: boolean;
}

const TimeSeriesAnalysis: FC<TimeSeriesAnalysisProps> = ({ data, uploadComplete = false }) => {
  const { timePeriod, chartData, handleTimePeriodChange } = useTimeSeriesData({ 
    data, 
    uploadComplete 
  });

  return (
    <div className="grid gap-4">
      <TimeSeriesHeader 
        timePeriod={timePeriod}
        onTimePeriodChange={handleTimePeriodChange}
      />
      <SentimentTrendChart chartData={chartData} />
      <ReviewVolumeChart chartData={chartData} uploadComplete={uploadComplete} />
    </div>
  );
};

export default TimeSeriesAnalysis;
