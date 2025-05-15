
import { FC } from "react";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeSeriesHeaderProps {
  timePeriod: string;
  onTimePeriodChange: (value: string) => void;
}

const TimeSeriesHeader: FC<TimeSeriesHeaderProps> = ({ timePeriod, onTimePeriodChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Time Series Analysis</h3>
      </div>
      <Select value={timePeriod} onValueChange={onTimePeriodChange}>
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
  );
};

export default TimeSeriesHeader;
