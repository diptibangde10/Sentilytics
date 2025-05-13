
import { FC } from "react";
import { cn } from "@/lib/utils";
import { BarChart3, MessageCircle, PieChart, Clock, ThumbsUp, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

const Header: FC<HeaderProps> = ({ activeTab, setActiveTab, className }) => {
  const tabs = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "algorithms", icon: Database, label: "Algorithms" },
    { id: "aspect-based", icon: ThumbsUp, label: "Aspect Analysis" },
    { id: "chatbot", icon: MessageCircle, label: "AI Chatbot" },
    { id: "time-series", icon: Clock, label: "Time Series" },
    { id: "recommendations", icon: PieChart, label: "Recommendations" },
  ];

  return (
    <header className={cn("w-full bg-background shadow-sm z-10", className)}>
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Sentiment Analysis Platform</h1>
        
        <div className="flex overflow-x-auto pb-2 gap-1">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
