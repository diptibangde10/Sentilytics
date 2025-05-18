
import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Info } from "lucide-react";
import { ResponsiveContainer } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KeywordItem {
  text: string;
  value: number;
}

interface KeywordCloudProps {
  keywords: KeywordItem[];
}

const KeywordCloud: FC<KeywordCloudProps> = ({ keywords = [] }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(null);
  
  // Calculate the maximum value once for use throughout the component
  const maxWordValue = keywords.length > 0 
    ? Math.max(...keywords.map(item => item.value))
    : 0;
    
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

  // Calculate word sizes and positions more effectively
  const calculateWordLayout = () => {
    if (!keywords.length) return [];
    
    const maxValue = Math.max(...keywords.map(item => item.value));
    const data = [];
    
    // Position words in a circular pattern with improved spacing
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    
    // Sort keywords by value for better layout
    const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);
    
    sortedKeywords.forEach((item, index) => {
      // Use golden ratio to distribute words more evenly
      const angle = index * (Math.PI * 2 / sortedKeywords.length);
      // Vary radius based on index to avoid clustering
      const radiusFactor = 0.5 + (index % 3) * 0.15;
      const wordRadius = radius * radiusFactor;
      
      const x = centerX + Math.cos(angle) * wordRadius;
      const y = centerY + Math.sin(angle) * wordRadius;
      const size = (item.value / maxValue) * 24 + 10; // Enhanced size scale
      
      data.push({
        x,
        y,
        size,
        text: item.text,
        value: item.value,
        color: getWordCloudColor(item.value),
        zIndex: Math.floor(item.value / maxValue * 10) // Higher values appear on top
      });
    });
    
    return data;
  };

  const wordCloudData = calculateWordLayout();

  const handleKeywordClick = (keyword: KeywordItem) => {
    setSelectedKeyword(keyword === selectedKeyword ? null : keyword);
  };

  return (
    <Card className="dashboard-card col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Keyword Cloud
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  The keyword cloud shows the most common terms found in your dataset. 
                  Larger words appear more frequently, and color indicates importance.
                  Click on a keyword to see its exact count.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative">
        {keywords.length > 0 ? (
          <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-md relative">
                {wordCloudData.map((entry, index) => (
                  <div
                    key={`word-${index}`}
                    className="absolute transition-all duration-700 ease-in-out hover:scale-110"
                    style={{
                      left: `${entry.x}%`,
                      top: `${entry.y}%`,
                      fontSize: `${entry.size}px`,
                      color: entry.color,
                      fontWeight: entry.value > (maxWordValue * 0.7) ? 'bold' : 'normal',
                      transform: 'translate(-50%, -50%)',
                      textShadow: '0 0 1px rgba(255,255,255,0.7)',
                      zIndex: entry.zIndex,
                      cursor: 'pointer',
                      padding: '0.25rem',
                      border: selectedKeyword?.text === entry.text ? '2px solid currentColor' : 'none',
                      borderRadius: '6px',
                      backgroundColor: selectedKeyword?.text === entry.text ? 'rgba(255,255,255,0.3)' : 'transparent',
                    }}
                    title={`${entry.text}: ${entry.value}`}
                    onClick={() => handleKeywordClick({text: entry.text, value: entry.value})}
                  >
                    {entry.text}
                  </div>
                ))}
                
                {selectedKeyword && (
                  <div className="absolute bottom-3 right-3 bg-white/90 shadow-md p-3 rounded-lg border border-slate-200 max-w-xs">
                    <h4 className="font-medium text-sm">{selectedKeyword.text}</h4>
                    <p className="text-xs text-muted-foreground">Appears {selectedKeyword.value} times in dataset</p>
                    <p className="text-xs mt-1">Click again to dismiss</p>
                  </div>
                )}
              </div>
            </ResponsiveContainer>
          </div>
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
