
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Bot, User } from "lucide-react";

interface ChatbotProps {
  data?: any;
  uploadComplete?: boolean;
}

const Chatbot: FC<ChatbotProps> = ({ data, uploadComplete = false }) => {
  // Sample chat messages
  const chatMessages = [
    {
      role: "bot",
      content: "Hello! I'm your AI assistant. How can I help you analyze your sentiment data?",
      timestamp: "10:30 AM",
    },
    {
      role: "user",
      content: "What's the overall sentiment of my dataset?",
      timestamp: "10:31 AM",
    },
    {
      role: "bot",
      content:
        "Based on the analysis, your dataset shows 65% positive sentiment, 15% neutral, and 20% negative sentiment.",
      timestamp: "10:31 AM",
    },
    {
      role: "user",
      content: "What are the top negative aspects mentioned?",
      timestamp: "10:32 AM",
    },
    {
      role: "bot",
      content:
        "The top negative aspects mentioned in your dataset are related to Price, Customer Support, and Durability. Would you like more details about any of these aspects?",
      timestamp: "10:32 AM",
    },
  ];

  return (
    <Card className="border gradient-border">
      <CardContent className="p-6">
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "bot" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                    <Bot size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="relative">
            <Input
              placeholder="Ask a question about your data..."
              className="pr-12"
            />
            <Button
              size="icon"
              className="absolute right-0 top-0 h-full rounded-l-none"
            >
              <SendHorizontal size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
