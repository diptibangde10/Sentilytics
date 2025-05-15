
// Types for training parameters and results
export interface TrainingParams {
  algorithm: string;
  file: File;
  onProgress?: (progress: number) => void;
}

export interface SentimentCounts {
  positive: number;
  neutral: number;
  negative: number;
}

export interface KeywordCount {
  keyword: string;
  count: number;
}

export interface SimilarProduct {
  name: string;
  similarity: number;
  sentimentScore: number;
}

export interface ImprovementItem {
  aspect: string;
  impact: number;
}

export interface TimeSeriesPoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  volume: number;
}

export interface AspectAnalysisItem {
  aspect: string;
  positive: number;
  neutral: number;
  negative: number;
  keywords: string[];
}

export interface TrainingResult {
  sentimentCounts: SentimentCounts;
  topKeywords: KeywordCount[];
  algorithm: string;
  accuracy: number;
  confidenceScores: number[];
  similarProducts?: SimilarProduct[];
  improvements?: ImprovementItem[];
  timeSeriesData?: {
    daily: TimeSeriesPoint[];
  };
  aspectAnalysis?: AspectAnalysisItem[];
}
