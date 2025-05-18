
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
  
  // FEATURE EXPLANATION QUESTIONS
  if (queryLower.includes("what can you do") || 
      queryLower.includes("help me") || 
      queryLower.includes("capabilities") ||
      queryLower.includes("features") ||
      queryLower.includes("how to use")) {
    
    return "I can help you analyze sentiment data! You can ask me about:\n\n" +
           "- Overall sentiment (positive, negative, neutral percentages)\n" +
           "- Positive and negative aspects in your data\n" +
           "- Top keywords and their frequency\n" +
           "- Sentiment trends over time\n" +
           "- Specific aspects and their sentiment breakdown\n" +
           "- Technical details about the analysis algorithm\n" +
           "- Review volume statistics\n" +
           "- Aspect-based sentiment analysis\n\n" +
           "Just ask a specific question, and I'll provide insights from your data!";
  }
  
  // ALGORITHM EXPLANATION
  if (queryLower.includes("explain algorithm") || 
      queryLower.includes("how does the algorithm work") ||
      queryLower.includes("analysis method")) {
    
    const algorithmName = data.algorithm || "sentiment analysis";
    let explanation = `The current analysis uses the ${algorithmName} algorithm. `;
    
    if (data.algorithm === "naive-bayes") {
      explanation += "Naive Bayes is a probabilistic classifier that uses Bayes' theorem with strong independence assumptions between features. It's particularly effective for text classification tasks like sentiment analysis because it works well with high-dimensional data and requires relatively small amounts of training data to estimate parameters.";
    } else if (data.algorithm === "random-forest") {
      explanation += "Random Forest is an ensemble learning method that constructs multiple decision trees during training and outputs the average prediction of the individual trees. This approach helps prevent overfitting and improves accuracy for sentiment classification tasks.";
    } else if (data.algorithm === "svm") {
      explanation += "Support Vector Machine (SVM) works by finding the hyperplane that best separates positive and negative sentiments in a high-dimensional feature space. It's particularly effective for sentiment analysis as it can handle complex relationships in text data.";
    }
    
    if (data.accuracy) {
      explanation += ` The current model has achieved an accuracy of ${data.accuracy.toFixed(2)}%.`;
    }
    
    return explanation;
  }
  
  // OVERALL SENTIMENT QUESTIONS
  if (queryLower.includes("overall sentiment") || 
      queryLower.includes("sentiment overall") || 
      queryLower.includes("general sentiment") || 
      queryLower.includes("sentiment summary") ||
      (queryLower.includes("sentiment") && queryLower.includes("percentage")) ||
      queryLower === "sentiment") {
    
    if (data.sentimentCounts) {
      return `Based on the analysis, your dataset shows ${data.sentimentCounts.positive}% positive sentiment, ${data.sentimentCounts.neutral}% neutral, and ${data.sentimentCounts.negative}% negative sentiment.`;
    }
  }
  
  // POSITIVE ASPECTS QUESTIONS
  if (queryLower.includes("positive aspect") || 
      queryLower.includes("good aspect") || 
      queryLower.includes("positive feedback") ||
      queryLower.includes("what is good") ||
      queryLower.includes("what people like")) {
    
    if (data.mostPositiveAspects && data.mostPositiveAspects.length > 0) {
      return `The most positive aspects in your dataset are: ${data.mostPositiveAspects.join(", ")}.`;
    }
  }
  
  // NEGATIVE ASPECTS QUESTIONS
  if (queryLower.includes("negative aspect") || 
      queryLower.includes("bad aspect") || 
      queryLower.includes("negative feedback") ||
      queryLower.includes("what is bad") ||
      queryLower.includes("problems") ||
      queryLower.includes("issues") ||
      queryLower.includes("what people dislike")) {
    
    if (data.mostNegativeAspects && data.mostNegativeAspects.length > 0) {
      return `The top negative aspects mentioned in your dataset are: ${data.mostNegativeAspects.join(", ")}.`;
    }
  }
  
  // KEYWORD RELATED QUESTIONS
  if (queryLower.includes("keyword") || 
      queryLower.includes("top word") || 
      queryLower.includes("common word") ||
      queryLower.includes("word cloud") ||
      queryLower.includes("frequent terms") ||
      queryLower.includes("important words")) {
    
    if (data.topKeywords && data.topKeywords.length > 0) {
      const topFive = data.topKeywords.slice(0, 5);
      return `The top keywords in your dataset are: ${topFive.map(k => `"${k.keyword}" (${k.count})`).join(", ")}.`;
    }
  }
  
  // TIME TREND QUESTIONS
  if (queryLower.includes("over time") || 
      queryLower.includes("trend") || 
      queryLower.includes("time series") ||
      queryLower.includes("historical") ||
      queryLower.includes("sentiment change") ||
      queryLower.includes("time analysis")) {
    
    if (data.timeSeriesData && data.timeSeriesData.daily) {
      const firstDay = data.timeSeriesData.daily[0];
      const lastDay = data.timeSeriesData.daily[data.timeSeriesData.daily.length - 1];
      
      const trendDescription = lastDay.positive > firstDay.positive ? 
        "improving" : lastDay.positive < firstDay.positive ? 
        "declining" : "stable";
      
      return `The sentiment trend is ${trendDescription} over time. It started at ${firstDay.positive}% positive on ${firstDay.date} and ended at ${lastDay.positive}% positive on ${lastDay.date}.`;
    }
  }
  
  // REVIEW VOLUME QUESTIONS
  if (queryLower.includes("review volume") || 
      queryLower.includes("number of reviews") || 
      queryLower.includes("review count") ||
      queryLower.includes("feedback volume") ||
      queryLower.includes("how many reviews")) {
    
    if (data.timeSeriesData && data.timeSeriesData.daily) {
      const totalVolume = data.timeSeriesData.daily.reduce((sum, day) => sum + day.volume, 0);
      const avgVolume = Math.round(totalVolume / data.timeSeriesData.daily.length);
      const maxDay = data.timeSeriesData.daily.reduce((max, day) => day.volume > max.volume ? day : max, data.timeSeriesData.daily[0]);
      
      return `Your dataset contains a total of approximately ${totalVolume} reviews, with an average of ${avgVolume} reviews per day. The highest volume was on ${maxDay.date} with ${maxDay.volume} reviews.`;
    }
  }
  
  // COMPARISON QUESTIONS BETWEEN POSITIVE AND NEGATIVE
  if ((queryLower.includes("compare") || queryLower.includes("difference") || queryLower.includes("versus") || queryLower.includes("vs")) &&
      ((queryLower.includes("positive") && queryLower.includes("negative")) ||
       (queryLower.includes("good") && queryLower.includes("bad")))) {
    
    if (data.sentimentCounts) {
      const difference = Math.abs(data.sentimentCounts.positive - data.sentimentCounts.negative);
      const dominant = data.sentimentCounts.positive > data.sentimentCounts.negative ? "positive" : "negative";
      
      return `Comparing the sentiment: ${data.sentimentCounts.positive}% of feedback is positive while ${data.sentimentCounts.negative}% is negative. The ${dominant} sentiment is ${difference}% higher. The remaining ${data.sentimentCounts.neutral}% is neutral.`;
    }
  }
  
  // ASPECT SPECIFIC SENTIMENT
  for (const aspect of data.aspectAnalysis || []) {
    if (queryLower.includes(aspect.aspect.toLowerCase())) {
      return `For ${aspect.aspect}, the sentiment is ${aspect.positive}% positive, ${aspect.neutral}% neutral, and ${aspect.negative}% negative. Common keywords include: ${aspect.keywords.join(", ")}.`;
    }
  }
  
  // ALGORITHM QUESTIONS
  if (queryLower.includes("algorithm") || 
      queryLower.includes("method") || 
      queryLower.includes("model") ||
      queryLower.includes("accuracy") ||
      queryLower.includes("how accurate") ||
      queryLower.includes("confidence")) {
    
    if (data.algorithm && data.accuracy) {
      return `The analysis was performed using the ${data.algorithm} algorithm with an accuracy of ${data.accuracy.toFixed(2)}%. This means the predictions are approximately ${Math.round(data.accuracy)}% reliable.`;
    }
  }
  
  // DATA UPLOAD QUESTIONS
  if (queryLower.includes("upload") || 
      queryLower.includes("import") || 
      queryLower.includes("how to analyze") ||
      queryLower.includes("how to get started") ||
      queryLower.includes("file format")) {
    
    return "To analyze your sentiment data, go to the Dashboard tab and use the File Upload component. You can upload CSV or Excel files containing your feedback data. After uploading, select an algorithm (Naive Bayes, Random Forest, or SVM) and click 'Upload and Analyze'. The system will process your data and show the results in the dashboard visualizations.";
  }
  
  // KEYWORD CLOUD QUESTIONS
  if (queryLower.includes("keyword cloud") || 
      queryLower.includes("word cloud") ||
      queryLower.includes("tag cloud")) {
    
    if (data.topKeywords && data.topKeywords.length > 0) {
      return "The Keyword Cloud visualization shows the most frequent words in your dataset, with size indicating frequency and color indicating importance. This helps you quickly identify key themes in your feedback. The most prominent keywords currently are: " + 
        data.topKeywords.slice(0, 3).map(k => k.keyword).join(", ") + ".";
    }
  }
  
  // ASPECT ANALYSIS EXPLANATION
  if (queryLower.includes("aspect analysis") || 
      queryLower.includes("what is aspect") ||
      queryLower.includes("explain aspect")) {
    
    return "Aspect-based sentiment analysis breaks down feedback into specific aspects or features of your product/service. For each aspect, we analyze the sentiment separately. This helps you understand which specific features receive positive feedback and which need improvement. You can see this breakdown in the Aspect Analysis tab of the dashboard.";
  }
  
  // TIME SERIES ANALYSIS EXPLANATION
  if (queryLower.includes("time series analysis") || 
      queryLower.includes("what is time series") ||
      queryLower.includes("explain time series")) {
    
    return "Time Series Analysis shows how sentiment changes over time. This helps you identify trends, seasonal patterns, or sudden shifts in customer opinion. You can see if your improvements had an impact on sentiment or if certain events affected customer perception. These visualizations are available in the Time Series Analysis tab.";
  }
  
  // RECOMMENDATIONS EXPLANATION
  if (queryLower.includes("recommendations") || 
      queryLower.includes("suggestion") ||
      queryLower.includes("what should i improve")) {
    
    if (data.mostNegativeAspects && data.mostNegativeAspects.length > 0) {
      return `Based on the analysis, you should focus on improving: ${data.mostNegativeAspects.join(", ")}. These aspects received the most negative feedback. Addressing these issues will likely have the biggest positive impact on overall customer satisfaction.`;
    }
  }
  
  // Default response if no specific match
  return "I can provide insights about the sentiment analysis data. You can ask about overall sentiment, positive/negative aspects, keywords, trends over time, or specific aspects mentioned in the reviews. If you need help getting started, just ask 'What can you do?' or 'How to use this tool?'";
};

