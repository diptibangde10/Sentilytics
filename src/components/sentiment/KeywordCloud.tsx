import { FC, useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Info } from "lucide-react";
import { ResponsiveContainer } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface KeywordItem {
  text: string;
  value: number;
}

interface KeywordCloudProps {
  keywords: KeywordItem[];
}

const KeywordCloud: FC<KeywordCloudProps> = ({ keywords = [] }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cloudRef = useRef<HTMLDivElement>(null);
  
  // Calculate the maximum and minimum values for scaling
  const maxWordValue = keywords.length > 0 
    ? Math.max(...keywords.map(item => item.value))
    : 0;
  
  const minWordValue = keywords.length > 0
    ? Math.min(...keywords.map(item => item.value))
    : 0;
    
  // Function to get a color for word cloud based on value
  const getWordCloudColor = (value: number) => {
    const normalizedValue = (value - minWordValue) / (maxWordValue - minWordValue || 1);
    
    // Enhanced color palette with more vibrant options
    if (normalizedValue > 0.85) return '#8B5CF6'; // Vivid Purple
    if (normalizedValue > 0.7) return '#9b87f5';  // Primary Purple
    if (normalizedValue > 0.55) return '#7E69AB'; // Secondary Purple
    if (normalizedValue > 0.4) return '#D6BCFA';  // Light Purple
    if (normalizedValue > 0.25) return '#E5DEFF'; // Soft Purple
    return '#F1F0FB';  // Soft Gray
  };

  // Calculate word sizes and positions with improved layout algorithm
  const calculateWordLayout = () => {
    if (!keywords.length) return [];
    
    // Sort keywords by value for better arrangement (largest first)
    const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);
    
    // Calculate placement using spiral algorithm for better distribution
    const data = [];
    const centerX = 50;
    const centerY = 50;
    const angleStep = 0.1;  // Smaller steps for smoother spiral
    const radiusStep = 0.3; // How quickly spiral grows
    
    let angle = 0;
    let radius = 0;
    const placedWords = new Set(); // Track used positions
    const collisionBuffer = 2;     // Space between words
    
    for (let i = 0; i < sortedKeywords.length; i++) {
      const item = sortedKeywords[i];
      
      // Size calculation with more emphasis on differences
      const normalizedValue = (item.value - minWordValue) / (maxWordValue - minWordValue || 1);
      const size = 10 + Math.pow(normalizedValue, 0.6) * 24; // Non-linear scaling
      
      // Initial positions
      let x = centerX + Math.cos(angle) * radius;
      let y = centerY + Math.sin(angle) * radius;
      let attempts = 0;
      const maxAttempts = 500;
      
      // Check for collisions and adjust
      while (attempts < maxAttempts) {
        const posKey = `${Math.round(x)},${Math.round(y)}`;
        
        if (!placedWords.has(posKey)) {
          placedWords.add(posKey);
          
          // Add neighboring positions as taken to avoid overlap
          for (let dx = -collisionBuffer; dx <= collisionBuffer; dx++) {
            for (let dy = -collisionBuffer; dy <= collisionBuffer; dy++) {
              placedWords.add(`${Math.round(x + dx)},${Math.round(y + dy)}`);
            }
          }
          
          break;
        }
        
        // Move along the spiral
        angle += angleStep;
        radius += radiusStep * angleStep / (2 * Math.PI);
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        attempts++;
      }
      
      // Keep words within bounds
      x = Math.max(10, Math.min(90, x));
      y = Math.max(10, Math.min(90, y));
      
      // Word angle variance for natural look
      const wordAngle = Math.random() > 0.7 ? Math.random() * 30 - 15 : 0;
      
      data.push({
        x,
        y,
        size,
        text: item.text,
        value: item.value,
        color: getWordCloudColor(item.value),
        zIndex: Math.floor(normalizedValue * 100), // Higher values appear on top
        fontWeight: normalizedValue > 0.6 ? 'bold' : 'normal',
        angle: wordAngle,
        animDelay: i * 0.05 // Staggered animation
      });
    }
    
    return data;
  };

  const wordCloudData = calculateWordLayout();
  
  // Animation trigger effect
  useEffect(() => {
    if (keywords.length > 0 && cloudRef.current) {
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, wordCloudData.length * 50 + 500);
      
      return () => clearTimeout(timer);
    }
  }, [keywords, wordCloudData.length]);

  const handleKeywordClick = (keyword: KeywordItem) => {
    setSelectedKeyword(keyword === selectedKeyword ? null : keyword);
  };

  return (
    <Card className="dashboard-card col-span-full overflow-hidden">
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
      <CardContent className="h-[400px] relative p-0 overflow-hidden">
        {keywords.length > 0 ? (
          <div className="relative w-full h-full" ref={cloudRef}>
            <ResponsiveContainer width="100%" height="100%">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md relative">
                {wordCloudData.map((entry, index) => (
                  <div
                    key={`word-${index}`}
                    className={cn(
                      "absolute transition-all duration-500 hover:scale-110 cursor-pointer",
                      isAnimating && "opacity-0 animate-fade-in" 
                    )}
                    style={{
                      left: `${entry.x}%`,
                      top: `${entry.y}%`,
                      fontSize: `${entry.size}px`,
                      color: entry.color,
                      fontWeight: entry.fontWeight,
                      transform: `translate(-50%, -50%) rotate(${entry.angle}deg)`,
                      textShadow: '0 0 1px rgba(255,255,255,0.7)',
                      zIndex: entry.zIndex,
                      padding: '0.25rem',
                      border: selectedKeyword?.text === entry.text ? '2px solid currentColor' : 'none',
                      borderRadius: '6px',
                      backgroundColor: selectedKeyword?.text === entry.text ? 'rgba(255,255,255,0.3)' : 'transparent',
                      boxShadow: selectedKeyword?.text === entry.text ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
                      animationDelay: `${entry.animDelay}s`,
                      opacity: isAnimating ? 0 : 1
                    }}
                    title={`${entry.text}: ${entry.value}`}
                    onClick={() => handleKeywordClick({text: entry.text, value: entry.value})}
                  >
                    {entry.text}
                  </div>
                ))}
                
                {selectedKeyword && (
                  <div className="absolute bottom-3 right-3 bg-white/90 shadow-md p-3 rounded-lg border border-purple-200 max-w-xs animate-fade-in">
                    <h4 className="font-medium text-purple-800">{selectedKeyword.text}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 bg-purple-600 rounded-full" style={{
                        width: `${(selectedKeyword.value / maxWordValue) * 100}%`,
                        maxWidth: "100px"
                      }}></div>
                      <p className="text-xs text-muted-foreground">
                        {selectedKeyword.value} occurrences
                      </p>
                    </div>
                    <p className="text-xs mt-2 text-purple-500">Click again to dismiss</p>
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
