
import { FC, useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { KeywordCloudProps, KeywordItem, WordPosition } from "@/types/keywordCloud";
import KeywordDetail from "./KeywordDetail";
import KeywordItemComponent from "./KeywordItem";
import { 
  estimateTextDimensions, 
  findNonOverlappingPosition, 
  getWordValueRange, 
  getWordCloudColor 
} from "@/utils/wordCloudUtils";

const KeywordCloud: FC<KeywordCloudProps> = ({ keywords = [] }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
  const [wordElements, setWordElements] = useState<JSX.Element[]>([]);
  const cloudRef = useRef<HTMLDivElement>(null);
  
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
      
      // Get min/max values for scaling
      const { minWordValue, maxWordValue } = getWordValueRange(keywords);
      
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
        
        // Create the word element
        elements.push(
          <KeywordItemComponent
            key={`word-${index}`}
            keyword={keyword}
            isAnimating={isAnimating}
            isSelected={selectedKeyword?.text === keyword.text}
            index={index}
            position={{ x, y }}
            fontSize={fontSize}
            color={getWordCloudColor(keyword.value, minWordValue, maxWordValue)}
            normalizedValue={normalizedValue}
            onClick={() => handleKeywordClick(keyword)}
          />
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
  }, [keywords, selectedKeyword]);

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

  // Extract max value for the detail component
  const { maxWordValue } = getWordValueRange(keywords);

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
                <KeywordDetail 
                  selectedKeyword={selectedKeyword} 
                  maxValue={maxWordValue} 
                />
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
