
import { TrainingResult } from './types';

// Generate Naive Bayes analysis results
export const generateNaiveBayesResults = (data: any[]): TrainingResult => {
  return {
    sentimentCounts: {
      positive: Math.floor(Math.random() * 30) + 50,
      neutral: Math.floor(Math.random() * 20) + 20,
      negative: Math.floor(Math.random() * 20) + 10
    },
    topKeywords: [
      { keyword: "excellent", count: Math.floor(Math.random() * 50) + 30 },
      { keyword: "great", count: Math.floor(Math.random() * 50) + 25 },
      { keyword: "good", count: Math.floor(Math.random() * 40) + 20 },
      { keyword: "average", count: Math.floor(Math.random() * 30) + 15 },
      { keyword: "poor", count: Math.floor(Math.random() * 20) + 10 }
    ],
    algorithm: 'naive-bayes',
    accuracy: 82 + Math.random() * 5,
    confidenceScores: [0.87, 0.76, 0.92, 0.81, 0.79],
    similarProducts: [
      { name: "Product A", similarity: 92, sentimentScore: 85 },
      { name: "Product B", similarity: 88, sentimentScore: 72 },
      { name: "Product C", similarity: 76, sentimentScore: 90 }
    ],
    improvements: [
      { aspect: "Price", impact: 38 },
      { aspect: "Customer Support", impact: 32 },
      { aspect: "Durability", impact: 25 }
    ],
    timeSeriesData: {
      daily: [
        { date: "Jul 1", positive: 62, neutral: 18, negative: 20, volume: 145 },
        { date: "Jul 2", positive: 65, neutral: 20, negative: 15, volume: 132 },
        { date: "Jul 3", positive: 60, neutral: 18, negative: 22, volume: 158 },
        { date: "Jul 4", positive: 63, neutral: 15, negative: 22, volume: 175 },
        { date: "Jul 5", positive: 68, neutral: 17, negative: 15, volume: 162 }
      ]
    },
    aspectAnalysis: [
      {
        aspect: "Product Quality",
        positive: 75,
        neutral: 15,
        negative: 10,
        keywords: ["durable", "well-made", "solid", "premium"]
      },
      {
        aspect: "Price",
        positive: 30,
        neutral: 15,
        negative: 55,
        keywords: ["expensive", "overpriced", "costly", "high-price"]
      },
      {
        aspect: "Customer Support",
        positive: 45,
        neutral: 20,
        negative: 35,
        keywords: ["helpful", "responsive", "slow", "unresponsive"]
      }
    ]
  };
};

// Generate Random Forest analysis results
export const generateRandomForestResults = (data: any[]): TrainingResult => {
  return {
    sentimentCounts: {
      positive: Math.floor(Math.random() * 30) + 55,
      neutral: Math.floor(Math.random() * 20) + 15,
      negative: Math.floor(Math.random() * 20) + 10
    },
    topKeywords: [
      { keyword: "outstanding", count: Math.floor(Math.random() * 50) + 30 },
      { keyword: "fantastic", count: Math.floor(Math.random() * 50) + 25 },
      { keyword: "decent", count: Math.floor(Math.random() * 40) + 20 },
      { keyword: "mediocre", count: Math.floor(Math.random() * 30) + 15 },
      { keyword: "disappointing", count: Math.floor(Math.random() * 20) + 10 }
    ],
    algorithm: 'random-forest',
    accuracy: 84 + Math.random() * 7,
    confidenceScores: [0.88, 0.83, 0.91, 0.87, 0.85],
    similarProducts: [
      { name: "Product J", similarity: 91, sentimentScore: 82 },
      { name: "Product K", similarity: 87, sentimentScore: 75 },
      { name: "Product L", similarity: 83, sentimentScore: 88 }
    ],
    improvements: [
      { aspect: "Materials", impact: 40 },
      { aspect: "Installation", impact: 34 },
      { aspect: "Instructions", impact: 29 }
    ],
    timeSeriesData: {
      daily: [
        { date: "Jul 1", positive: 64, neutral: 16, negative: 20, volume: 150 },
        { date: "Jul 2", positive: 67, neutral: 18, negative: 15, volume: 138 },
        { date: "Jul 3", positive: 65, neutral: 20, negative: 15, volume: 162 },
        { date: "Jul 4", positive: 69, neutral: 14, negative: 17, volume: 180 },
        { date: "Jul 5", positive: 72, neutral: 15, negative: 13, volume: 165 }
      ]
    },
    aspectAnalysis: [
      {
        aspect: "Build Quality",
        positive: 70,
        neutral: 20,
        negative: 10,
        keywords: ["sturdy", "solid", "well-built", "quality"]
      },
      {
        aspect: "Value for Money",
        positive: 55,
        neutral: 25,
        negative: 20,
        keywords: ["worth it", "reasonable", "expensive", "bargain"]
      },
      {
        aspect: "Longevity",
        positive: 65,
        neutral: 20,
        negative: 15,
        keywords: ["durable", "lasting", "short-lived", "enduring"]
      }
    ]
  };
};

// Generate SVM analysis results (dummy implementation)
export const generateDummySVMResults = (data: any[]): TrainingResult => {
  return {
    sentimentCounts: {
      positive: Math.floor(Math.random() * 30) + 60,
      neutral: Math.floor(Math.random() * 20) + 15,
      negative: Math.floor(Math.random() * 15) + 5
    },
    topKeywords: [
      { keyword: "excellent", count: Math.floor(Math.random() * 50) + 35 },
      { keyword: "superior", count: Math.floor(Math.random() * 50) + 30 },
      { keyword: "impressive", count: Math.floor(Math.random() * 40) + 25 },
      { keyword: "adequate", count: Math.floor(Math.random() * 30) + 15 },
      { keyword: "subpar", count: Math.floor(Math.random() * 20) + 10 }
    ],
    algorithm: 'svm',
    accuracy: 86 + Math.random() * 6,
    confidenceScores: [0.91, 0.84, 0.89, 0.86, 0.82],
    similarProducts: [
      { name: "Product X", similarity: 94, sentimentScore: 88 },
      { name: "Product Y", similarity: 89, sentimentScore: 79 },
      { name: "Product Z", similarity: 82, sentimentScore: 91 }
    ],
    improvements: [
      { aspect: "User Interface", impact: 42 },
      { aspect: "Performance", impact: 36 },
      { aspect: "Battery Life", impact: 28 }
    ],
    timeSeriesData: {
      daily: [
        { date: "Jul 1", positive: 65, neutral: 15, negative: 20, volume: 155 },
        { date: "Jul 2", positive: 68, neutral: 17, negative: 15, volume: 142 },
        { date: "Jul 3", positive: 70, neutral: 15, negative: 15, volume: 168 },
        { date: "Jul 4", positive: 72, neutral: 13, negative: 15, volume: 185 },
        { date: "Jul 5", positive: 75, neutral: 15, negative: 10, volume: 172 }
      ]
    },
    aspectAnalysis: [
      {
        aspect: "User Experience",
        positive: 82,
        neutral: 10,
        negative: 8,
        keywords: ["intuitive", "easy-to-use", "seamless", "convenient"]
      },
      {
        aspect: "Design",
        positive: 90,
        neutral: 5,
        negative: 5,
        keywords: ["elegant", "sleek", "beautiful", "stylish"]
      },
      {
        aspect: "Features",
        positive: 65,
        neutral: 25,
        negative: 10,
        keywords: ["innovative", "useful", "practical", "helpful"]
      }
    ]
  };
};
