
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
