
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
    <header className={cn("fitapp-header text-white shadow-lg z-10", className)}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Sentiment Analysis Platform</h1>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 mr-2">
              Sign In
            </Button>
            <Button variant="default" className="bg-accent text-primary-foreground hover:bg-accent/90">
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto pb-2 gap-2 mt-4">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                activeTab === tab.id 
                  ? "bg-white text-primary" 
                  : "bg-transparent text-white/90 hover:bg-white/10"
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
