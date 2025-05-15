
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import FloatingChatbot from "./components/chat/FloatingChatbot";

const queryClient = new QueryClient();

const App = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Function to update analysis data from any component
  const handleAnalysisDataUpdate = (data: any) => {
    setAnalysisData(data);
    setUploadComplete(!!data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<Index 
                onAnalysisDataUpdate={handleAnalysisDataUpdate} 
              />} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Floating chatbot available on all pages */}
          <FloatingChatbot data={analysisData} uploadComplete={uploadComplete} />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
