
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AspectsListProps {
  aspects: string[];
  type: "positive" | "negative";
  title: string;
}

const AspectsList: FC<AspectsListProps> = ({ aspects = [], type, title }) => {
  const Icon = type === "positive" ? TrendingUp : TrendingDown;
  const iconColor = type === "positive" ? "text-green-500" : "text-red-500";

  return (
    <Card className="dashboard-card col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {aspects.map((aspect: string, index: number) => (
            <div key={index} className="flex items-center">
              <Icon className={`mr-2 h-4 w-4 ${iconColor}`} />
              <span>{aspect}</span>
            </div>
          ))}
          {aspects.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              No {type} aspects found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AspectsList;
