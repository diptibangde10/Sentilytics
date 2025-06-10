
import { FC } from "react";
import { Bot, Loader2 } from "lucide-react";

const LoadingMessage: FC = () => {
  return (
    <div className="flex items-start gap-2 justify-start">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white flex-shrink-0">
        <Bot size={18} />
      </div>
      <div className="bg-muted rounded-lg p-3 flex items-center">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <span className="text-sm">Processing...</span>
      </div>
    </div>
  );
};

export default LoadingMessage;
