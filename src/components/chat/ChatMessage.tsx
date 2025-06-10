
import { FC } from "react";
import { Bot, User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex items-start gap-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.role === "bot" && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white flex-shrink-0">
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
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        <div
          className={`text-xs mt-2 ${
            message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {message.timestamp}
        </div>
      </div>
      {message.role === "user" && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background flex-shrink-0">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
