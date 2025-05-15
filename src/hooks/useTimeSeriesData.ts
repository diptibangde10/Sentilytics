import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseTimeSeriesDataProps {
  data?: any;
  uploadComplete?: boolean;
}

export const useTimeSeriesData = ({ data, uploadComplete = false }: UseTimeSeriesDataProps) => {
  const { toast } = useToast();
  const [timePeriod, setTimePeriod] = useState("daily");
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Updated sample time series data with July dates
  const defaultData = {
    daily: [
      { date: "Jul 1", positive: 62, neutral: 18, negative: 20, volume: 145 },
      { date: "Jul 2", positive: 65, neutral: 20, negative: 15, volume: 132 },
      { date: "Jul 3", positive: 60, neutral: 18, negative: 22, volume: 158 },
      { date: "Jul 4", positive: 63, neutral: 15, negative: 22, volume: 175 },
      { date: "Jul 5", positive: 68, neutral: 17, negative: 15, volume: 162 },
      { date: "Jul 6", positive: 65, neutral: 15, negative: 20, volume: 148 },
      { date: "Jul 7", positive: 70, neutral: 13, negative: 17, volume: 166 },
      { date: "Jul 8", positive: 72, neutral: 15, negative: 13, volume: 187 },
      { date: "Jul 9", positive: 68, neutral: 18, negative: 14, volume: 154 },
      { date: "Jul 10", positive: 65, neutral: 20, negative: 15, volume: 142 },
    ],
    weekly: [
      { date: "Week 1 Jul", positive: 63, neutral: 17, negative: 20, volume: 620 },
      { date: "Week 2 Jul", positive: 66, neutral: 16, negative: 18, volume: 685 },
      { date: "Week 3 Jul", positive: 70, neutral: 15, negative: 15, volume: 710 },
      { date: "Week 4 Jul", positive: 67, neutral: 18, negative: 15, volume: 698 },
    ],
    monthly: [
      { date: "Mar", positive: 58, neutral: 22, negative: 20, volume: 2450 },
      { date: "Apr", positive: 62, neutral: 18, negative: 20, volume: 2680 },
      { date: "May", positive: 65, neutral: 17, negative: 18, volume: 2820 },
      { date: "Jun", positive: 68, neutral: 16, negative: 16, volume: 2910 },
      { date: "Jul", positive: 65, neutral: 18, negative: 17, volume: 2750 },
    ],
  };

  // Effect to update chart data when time period changes or data is loaded
  useEffect(() => {
    // Check for uploaded data first
    if (uploadComplete && data?.timeSeriesData) {
      console.log("Using uploaded time series data");
      
      // Use the relevant time series data based on selection
      const timeSeriesData = data.timeSeriesData;
      
      if (timeSeriesData.daily && timeSeriesData.daily.length > 0) {
        // Make sure we're using the actual dates from the dataset
        const formattedData = timeSeriesData.daily.map((entry: any) => ({
          ...entry,
          // Keep the original date format from the uploaded dataset
          date: entry.date
        }));
        
        setChartData(formattedData);
        
        // Notify the user that the chart is updated with real data
        if (timePeriod !== "daily") {
          toast({
            title: "Data Notice",
            description: "Only daily data is available from your upload. Showing daily time series.",
          });
          setTimePeriod("daily");
        }
      } else {
        // Fallback to default data if no daily data in upload
        setChartData(defaultData[timePeriod as keyof typeof defaultData] || []);
      }
    } else {
      // Use default data when no upload is available
      setChartData(defaultData[timePeriod as keyof typeof defaultData] || []);
    }
  }, [timePeriod, data, uploadComplete, toast]);

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
  };

  return {
    timePeriod,
    chartData,
    handleTimePeriodChange
  };
};
