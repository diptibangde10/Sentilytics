
import { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Chatbot from "@/components/Chatbot";
import { useToast } from "@/hooks/use-toast";

interface FloatingChatbotProps {
  data?: any;
  uploadComplete?: boolean;
}

const FloatingChatbot = ({ data, uploadComplete = false }: FloatingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !uploadComplete) {
      toast({
        title: "No data available",
        description: "Please upload and analyze data first to enable full chatbot functionality.",
        variant: "default", // Changed from "warning" to "default"
      });
    }
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => handleOpenChange(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        aria-label="Open AI Chatbot"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Dialog for chatbot */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              AI Assistant
            </DialogTitle>
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
