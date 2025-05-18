
export interface KeywordItem {
  text: string;
  value: number;
}

export interface KeywordCloudProps {
  keywords: KeywordItem[];
}

export interface WordPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Add these declarations for the chartjs-chart-wordcloud plugin
declare module 'chart.js' {
  interface ChartTypeRegistry {
    wordCloud: {
      chartOptions: ChartOptions<'wordCloud'>;
      datasetOptions: {};
      defaultDataPoint: number;
      scales: {};
    };
  }
}
