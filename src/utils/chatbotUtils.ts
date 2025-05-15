
// Utility functions for the AI chatbot

interface ChatMessage {
  role: "bot" | "user";
  content: string;
  timestamp: string;
}

export interface ChatbotDataContext {
  sentimentCounts?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  aspectAnalysis?: Array<{
    aspect: string;
    positive: number;
    neutral: number;
    negative: number;
    keywords: string[];
  }>;
  timeSeriesData?: {
    daily: Array<{
      date: string;
      positive: number;
      neutral: number;
      negative: number;
      volume: number;
    }>;
  };
  topKeywords?: Array<{ keyword: string; count: number }>;
  algorithm?: string;
  accuracy?: number;
  mostPositiveAspects?: string[];
  mostNegativeAspects?: string[];
}

// Function to get current timestamp in HH:MM format
export const getCurrentTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Function to process user query and generate a response
export const processQuery = (query: string, data: ChatbotDataContext | null): string => {
  // If no data is available
  if (!data) {
    return "I don't have any analysis data yet. Please upload a dataset first to get insights.";
  }

  // Convert query to lowercase for case-insensitive matching
  const queryLower = query.toLowerCase();
  
  // Check for overall sentiment questions
  if (queryLower.includes("overall sentiment") || 
      queryLower.includes("sentiment overall") || 
      queryLower.includes("general sentiment")) {
    
    if (data.sentimentCounts) {
      return `Based on the analysis, your dataset shows ${data.sentimentCounts.positive}% positive sentiment, ${data.sentimentCounts.neutral}% neutral, and ${data.sentimentCounts.negative}% negative sentiment.`;
    }
  }
  
  // Check for positive aspects questions
  if (queryLower.includes("positive aspect") || 
      queryLower.includes("good aspect") || 
      queryLower.includes("positive feedback")) {
    
    if (data.mostPositiveAspects && data.mostPositiveAspects.length > 0) {
      return `The most positive aspects in your dataset are: ${data.mostPositiveAspects.join(", ")}.`;
    }
  }
  
  // Check for negative aspects questions
  if (queryLower.includes("negative aspect") || 
      queryLower.includes("bad aspect") || 
      queryLower.includes("negative feedback")) {
    
    if (data.mostNegativeAspects && data.mostNegativeAspects.length > 0) {
      return `The top negative aspects mentioned in your dataset are: ${data.mostNegativeAspects.join(", ")}.`;
    }
  }
  
  // Check for keyword related questions
  if (queryLower.includes("keyword") || 
      queryLower.includes("top word") || 
      queryLower.includes("common word")) {
    
    if (data.topKeywords && data.topKeywords.length > 0) {
      const topFive = data.topKeywords.slice(0, 5);
      return `The top keywords in your dataset are: ${topFive.map(k => `"${k.keyword}" (${k.count})`).join(", ")}.`;
    }
  }
  
  // Check for time trend questions
  if (queryLower.includes("over time") || 
      queryLower.includes("trend") || 
      queryLower.includes("time series")) {
    
    if (data.timeSeriesData && data.timeSeriesData.daily) {
      const firstDay = data.timeSeriesData.daily[0];
      const lastDay = data.timeSeriesData.daily[data.timeSeriesData.daily.length - 1];
      
      const trendDescription = lastDay.positive > firstDay.positive ? 
        "improving" : lastDay.positive < firstDay.positive ? 
        "declining" : "stable";
      
      return `The sentiment trend is ${trendDescription} over time. It started at ${firstDay.positive}% positive on ${firstDay.date} and ended at ${lastDay.positive}% positive on ${lastDay.date}.`;
    }
  }
  
  // Check for aspect specific sentiment
  for (const aspect of data.aspectAnalysis || []) {
    if (queryLower.includes(aspect.aspect.toLowerCase())) {
      return `For ${aspect.aspect}, the sentiment is ${aspect.positive}% positive, ${aspect.neutral}% neutral, and ${aspect.negative}% negative. Common keywords include: ${aspect.keywords.join(", ")}.`;
    }
  }
  
  // Check for algorithm questions
  if (queryLower.includes("algorithm") || 
      queryLower.includes("method") || 
      queryLower.includes("model")) {
    
    if (data.algorithm && data.accuracy) {
      return `The analysis was performed using the ${data.algorithm} algorithm with an accuracy of ${data.accuracy.toFixed(2)}%.`;
    }
  }
  
  // Default response if no specific match
  return "I can provide insights about the sentiment analysis data. You can ask about overall sentiment, positive/negative aspects, keywords, trends over time, or specific aspects mentioned in the reviews.";
};

