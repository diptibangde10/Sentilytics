import { FC, useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Bot, User, Loader2, HelpCircle } from "lucide-react";
import { processQuery, getCurrentTimestamp, ChatbotDataContext } from "@/utils/chatbotUtils";
import { useToast } from "@/hooks/use-toast";

interface ChatbotProps {
  data?: ChatbotDataContext | null;
  uploadComplete?: boolean;
}

interface ChatMessage {
  role: "bot" | "user";
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "What's the overall sentiment?",
  "Show me keyword trends",
  "What are the negative aspects?",
  "How does sentiment change over time?",
  "What are people saying about quality?",
  "Which aspects need improvement?",
  "What's the review volume trend?",
  "Explain the analysis results"
];

const Chatbot: FC<ChatbotProps> = ({ data, uploadComplete = false }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content: "Hi!! How can I assist you today and then I'm here to help you analyze your sentiment data and answer any questions about the dashboard features.",
      timestamp: getCurrentTimestamp(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Hide suggestions once user starts chatting
    setShowSuggestions(false);

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: inputValue,
      timestamp: getCurrentTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate AI processing time for UX
    setTimeout(() => {
      try {
        // Process the query and get AI response
        const botResponse = processQuery(userMessage.content, data || null);
        
        // Add bot response
        const botMessage: ChatMessage = {
          role: "bot",
          content: botResponse,
          timestamp: getCurrentTimestamp(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error processing query:", error);
        
        // Add error message from bot
        const errorMessage: ChatMessage = {
          role: "bot",
          content: "I'm sorry, I encountered an error while processing your query. Please try again.",
          timestamp: getCurrentTimestamp(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        
        toast({
          title: "Error processing query",
          description: "There was an error analyzing your question. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Don't automatically send to allow user to modify if desired
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "bot",
        content: "Hi!! How can I assist you today and then I'm here to help you analyze your sentiment data and answer any questions about the dashboard features.",
        timestamp: getCurrentTimestamp(),
      },
    ]);
    setShowSuggestions(true);
  };

  return (
    <Card className="border gradient-border">
      <CardContent className="p-6">
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((message, index) => (
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
                  <p className="whitespace-pre-wrap">{message.content}</p>
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
            {isProcessing && (
              <div className="flex items-start gap-2 justify-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                  <Bot size={18} />
                </div>
                <div className="bg-muted rounded-lg p-3 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm">Processing...</span>
                </div>
              </div>
            )}
            {showSuggestions && messages.length === 1 && (
              <div className="flex items-start gap-2 justify-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white opacity-70">
                  <HelpCircle size={18} />
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    {uploadComplete ? "Try asking:" : "You can ask questions like:"}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {SUGGESTED_QUESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs px-3 py-2 rounded-md bg-background border border-border hover:bg-secondary transition-colors text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="space-y-3">
            <div className="relative">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your data..."
                className="pr-12"
                disabled={isProcessing}
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={handleSendMessage}
                disabled={isProcessing || inputValue.trim() === ""}
              >
                <SendHorizontal size={18} />
              </Button>
            </div>
            <div className="flex justify-between items-center px-1">
              {messages.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-xs h-7"
                >
                  Clear chat
                </Button>
              )}
              {!uploadComplete && (
                <p className="text-sm text-muted-foreground text-center flex-1">
                  Upload and analyze a dataset to get personalized insights.
                </p>
              )}
              {uploadComplete && (
                <p className="text-xs text-muted-foreground ml-auto">
                  Ask about any dashboard feature or analysis result
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
