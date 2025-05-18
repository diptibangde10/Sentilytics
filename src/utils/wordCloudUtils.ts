
import { WordPosition, KeywordItem } from "@/types/keywordCloud";

// Check if rectangles overlap
export const checkOverlap = (rect1: WordPosition, rect2: WordPosition) => {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x ||
    rect1.y + rect1.height < rect2.y ||
    rect2.y + rect2.height < rect1.y
  );
};

// Calculate text dimensions roughly based on font size and length
export const estimateTextDimensions = (text: string, fontSize: number) => {
  const avgCharWidth = fontSize * 0.6; // Rough estimate
  return {
    width: text.length * avgCharWidth,
    height: fontSize * 1.2 // Add some line height
  };
};

// Find a non-overlapping position for a word
export const findNonOverlappingPosition = (
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

// Calculate the maximum and minimum values for scaling
export const getWordValueRange = (keywords: KeywordItem[]) => {
  const maxWordValue = keywords.length > 0 
    ? Math.max(...keywords.map(item => item.value))
    : 0;
  
  const minWordValue = keywords.length > 0
    ? Math.min(...keywords.map(item => item.value))
    : 0;
    
  return { maxWordValue, minWordValue };
};

// Function to get a color for word cloud based on value
export const getWordCloudColor = (value: number, minValue: number, maxValue: number) => {
  const normalizedValue = (value - minValue) / (maxValue - minValue || 1);
  
  // Enhanced color palette with more vibrant options
  if (normalizedValue > 0.85) return '#8B5CF6'; // Vivid Purple
  if (normalizedValue > 0.7) return '#9b87f5';  // Primary Purple
  if (normalizedValue > 0.55) return '#7E69AB'; // Secondary Purple
  if (normalizedValue > 0.4) return '#D6BCFA';  // Light Purple
  if (normalizedValue > 0.25) return '#E5DEFF'; // Soft Purple
  return '#F1F0FB';  // Soft Gray
};
