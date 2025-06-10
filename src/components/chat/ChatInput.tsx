
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  inputValue: string;
  isProcessing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSendMessage: () => void;
}

const ChatInput: FC<ChatInputProps> = ({
  inputValue,
  isProcessing,
  onInputChange,
  onKeyDown,
  onSendMessage
}) => {
  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Ask a question about your data..."
        className="pr-12"
        disabled={isProcessing}
      />
      <Button
        size="icon"
        className="absolute right-0 top-0 h-full rounded-l-none"
        onClick={onSendMessage}
        disabled={isProcessing || inputValue.trim() === ""}
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
};

export default ChatInput;
