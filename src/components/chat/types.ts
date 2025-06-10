
export interface ChatMessage {
  role: "bot" | "user";
  content: string;
  timestamp: string;
}

export interface ChatbotProps {
  data?: any;
  uploadComplete?: boolean;
}
