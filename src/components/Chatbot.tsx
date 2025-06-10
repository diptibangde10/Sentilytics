
import { FC, useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { processQuery, getCurrentTimestamp, ChatbotDataContext } from "@/utils/chatbotUtils";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage as ChatMessageType, ChatbotProps } from "./chat/types";
import ChatMessage from "./chat/ChatMessage";
import SuggestedQuestions from "./chat/SuggestedQuestions";
import ChatInput from "./chat/ChatInput";
import LoadingMessage from "./chat/LoadingMessage";

const Chatbot: FC<ChatbotProps> = ({ data, uploadComplete = false }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([
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
    const userMessage: ChatMessageType = {
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
        const botMessage: ChatMessageType = {
          role: "bot",
          content: botResponse,
          timestamp: getCurrentTimestamp(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error processing query:", error);
        
        // Add error message from bot
        const errorMessage: ChatMessageType = {
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
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 pt-2">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isProcessing && <LoadingMessage />}
            {showSuggestions && messages.length === 1 && (
              <SuggestedQuestions 
                uploadComplete={uploadComplete}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="space-y-3">
            <ChatInput
              inputValue={inputValue}
              isProcessing={isProcessing}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onSendMessage={handleSendMessage}
            />
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
