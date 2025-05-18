
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

interface WordPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const KeywordCloud: FC<KeywordCloudProps> = ({ keywords = [] }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
  const [wordElements, setWordElements] = useState<JSX.Element[]>([]);
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

  // Check if rectangles overlap
  const checkOverlap = (rect1: WordPosition, rect2: WordPosition) => {
    return !(
      rect1.x + rect1.width < rect2.x ||
      rect2.x + rect2.width < rect1.x ||
      rect1.y + rect1.height < rect2.y ||
      rect2.y + rect2.height < rect1.y
    );
  };

  // Calculate text dimensions roughly based on font size and length
  const estimateTextDimensions = (text: string, fontSize: number) => {
    const avgCharWidth = fontSize * 0.6; // Rough estimate
    return {
      width: text.length * avgCharWidth,
      height: fontSize * 1.2 // Add some line height
    };
  };

  // Find a non-overlapping position for a word
  const findNonOverlappingPosition = (
    containerWidth: number,
    containerHeight: number,
    wordWidth: number,
    wordHeight: number,
    existingPositions: WordPosition[],
    initialX?: number,
    initialY?: number
  ) => {
    const margin = 5; // Margin between words
    const maxAttempts = 2000;
    
    // Start in the center if initial position not provided
    let x = initialX !== undefined ? initialX : containerWidth / 2;
    let y = initialY !== undefined ? initialY : containerHeight / 2;
    
    // Spiral outward
    let angle = 0;
    let radius = 0;
    const radiusIncrement = 0.5;
    const angleIncrement = 0.1;
    
    for (let i = 0; i < maxAttempts; i++) {
      // Calculate position based on spiral
      x = containerWidth / 2 + Math.cos(angle) * radius;
      y = containerHeight / 2 + Math.sin(angle) * radius;
      
      // Ensure the word stays within bounds
      x = Math.max(wordWidth / 2 + margin, Math.min(containerWidth - wordWidth / 2 - margin, x));
      y = Math.max(wordHeight / 2 + margin, Math.min(containerHeight - wordHeight / 2 - margin, y));
      
      // Create word rectangle
      const rect: WordPosition = {
        x: x - wordWidth / 2,
        y: y - wordHeight / 2,
        width: wordWidth + margin * 2,
        height: wordHeight + margin * 2
      };
      
      // Check if this position overlaps with any existing words
      let overlaps = false;
      for (const pos of existingPositions) {
        if (checkOverlap(rect, pos)) {
          overlaps = true;
          break;
        }
      }
      
      // Return center position if no overlap
      if (!overlaps) {
        return { x, y, rect };
      }
      
      // Move to next position in spiral
      angle += angleIncrement;
      radius += radiusIncrement * angleIncrement / (2 * Math.PI);
    }
    
    // If we couldn't find a non-overlapping position, return a position at the edge
    return { 
      x: Math.random() * containerWidth, 
      y: Math.random() * containerHeight,
      rect: {
        x: x - wordWidth / 2,
        y: y - wordHeight / 2,
        width: wordWidth + margin * 2,
        height: wordHeight + margin * 2
      }
    };
  };

  // Generate the word cloud layout
  useEffect(() => {
    if (!keywords.length || !cloudRef.current) return;
    
    const generateWordCloud = () => {
      // Sort keywords by value (largest first)
      const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);
      
      const containerWidth = cloudRef.current?.clientWidth || 600;
      const containerHeight = cloudRef.current?.clientHeight || 400;
      const positions: WordPosition[] = [];
      const elements: JSX.Element[] = [];
      
      // Start animation
      setIsAnimating(true);
      
      // Attempt to place each word
      sortedKeywords.forEach((keyword, index) => {
        // Calculate font size based on value
        const normalizedValue = (keyword.value - minWordValue) / (maxWordValue - minWordValue || 1);
        const fontSize = 10 + Math.sqrt(normalizedValue) * 24; // Non-linear scaling for better distribution
        
        // Estimate word dimensions
        const { width, height } = estimateTextDimensions(keyword.text, fontSize);
        
        // Find a non-overlapping position
        const { x, y, rect } = findNonOverlappingPosition(
          containerWidth,
          containerHeight,
          width,
          height,
          positions
        );
        
        // Store the position
        positions.push(rect);
        
        // Word angle variance for natural look
        const wordAngle = Math.random() > 0.7 ? Math.random() * 30 - 15 : 0;
        
        // Create the word element
        elements.push(
          <div
            key={`word-${index}`}
            className={cn(
              "absolute transition-all duration-500 hover:scale-110 cursor-pointer",
              isAnimating && "opacity-0 animate-fade-in"
            )}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              fontSize: `${fontSize}px`,
              color: getWordCloudColor(keyword.value),
              fontWeight: normalizedValue > 0.6 ? 'bold' : 'normal',
              transform: `translate(-50%, -50%) rotate(${wordAngle}deg)`,
              textShadow: '0 0 1px rgba(255,255,255,0.7)',
              zIndex: Math.floor(normalizedValue * 100), // Higher values appear on top
              padding: '0.25rem',
              border: selectedKeyword?.text === keyword.text ? '2px solid currentColor' : 'none',
              borderRadius: '6px',
              backgroundColor: selectedKeyword?.text === keyword.text ? 'rgba(255,255,255,0.3)' : 'transparent',
              boxShadow: selectedKeyword?.text === keyword.text ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
              animationDelay: `${index * 0.05}s`,
              opacity: isAnimating ? 0 : 1
            }}
            title={`${keyword.text}: ${keyword.value}`}
            onClick={() => handleKeywordClick({text: keyword.text, value: keyword.value})}
          >
            {keyword.text}
          </div>
        );
      });
      
      setWordElements(elements);
      setWordPositions(positions);
    };
    
    // Use ResizeObserver to redraw when container size changes
    if (cloudRef.current) {
      const observer = new ResizeObserver(() => {
        generateWordCloud();
      });
      
      observer.observe(cloudRef.current);
      generateWordCloud();
      
      return () => {
        if (cloudRef.current) {
          observer.unobserve(cloudRef.current);
        }
      };
    }
  }, [keywords, minWordValue, maxWordValue, selectedKeyword]);

  // Animation end effect
  useEffect(() => {
    if (isAnimating && wordElements.length > 0) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, wordElements.length * 50 + 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating, wordElements.length]);

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
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md relative">
              {wordElements}
              
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
