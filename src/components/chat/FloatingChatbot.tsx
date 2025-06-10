
import { useState, useEffect } from "react";
import { Bot, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Chatbot from "@/components/Chatbot";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FloatingChatbotProps {
  data?: any;
  uploadComplete?: boolean;
}

const FloatingChatbot = ({ data, uploadComplete = false }: FloatingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (uploadComplete && !hasBeenOpened) {
      // Show pulse animation when data is loaded but chatbot hasn't been opened yet
      setShowPulse(true);
      
      // After 10 seconds, show a toast notification to remind about the chatbot
      const timeout = setTimeout(() => {
        if (!hasBeenOpened) {
          toast({
            title: "AI Assistant Available",
            description: "Ask questions about your data using the chatbot in the bottom right corner.",
            duration: 5000,
          });
        }
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [uploadComplete, hasBeenOpened, toast]);
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    if (open) {
      setHasBeenOpened(true);
      setShowPulse(false);
      if (!uploadComplete) {
        toast({
          title: "No data available",
          description: "Please upload and analyze data first to enable full chatbot functionality.",
          variant: "default",
        });
      }
    }
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => handleOpenChange(true)}
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 transition-all",
          showPulse && uploadComplete && "animate-pulse"
        )}
        aria-label="Open AI Chatbot"
      >
        <Bot className="h-6 w-6" />
        {showPulse && uploadComplete && (
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
        )}
      </Button>

      {/* Dialog for chatbot */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              <DialogTitle>AI Assistant</DialogTitle>
            </div>
            <DialogDescription className="text-xs mt-1 text-muted-foreground">
              Ask questions about your sentiment analysis data and dashboard features
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-6 pt-2">
            <Chatbot data={data} uploadComplete={uploadComplete} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatbot;
