
import { FC } from "react";
import { HelpCircle } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "./constants";

interface SuggestedQuestionsProps {
  uploadComplete: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestedQuestions: FC<SuggestedQuestionsProps> = ({ 
  uploadComplete, 
  onSuggestionClick 
}) => {
  return (
    <div className="flex items-start gap-2 justify-start">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white opacity-70 flex-shrink-0">
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
              onClick={() => onSuggestionClick(suggestion)}
              className="text-xs px-3 py-2 rounded-md bg-background border border-border hover:bg-secondary transition-colors text-left"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
