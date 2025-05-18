
import { FC } from "react";
import { KeywordItem } from "@/types/keywordCloud";
import { cn } from "@/lib/utils";

interface KeywordItemProps {
  keyword: KeywordItem;
  isAnimating: boolean;
  isSelected: boolean;
  index: number;
  position: { x: number, y: number };
  fontSize: number;
  color: string;
  normalizedValue: number;
  onClick: () => void;
}

const KeywordItemComponent: FC<KeywordItemProps> = ({
  keyword,
  isAnimating,
  isSelected,
  index,
  position,
  fontSize,
  color,
  normalizedValue,
  onClick
}) => {
  // Word angle variance for natural look
  const wordAngle = Math.random() > 0.7 ? Math.random() * 30 - 15 : 0;
  
  return (
    <div
      className={cn(
        "absolute transition-all duration-500 hover:scale-110 cursor-pointer",
        isAnimating && "opacity-0 animate-fade-in"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        fontSize: `${fontSize}px`,
        color: color,
        fontWeight: normalizedValue > 0.6 ? 'bold' : 'normal',
        transform: `translate(-50%, -50%) rotate(${wordAngle}deg)`,
        textShadow: '0 0 1px rgba(255,255,255,0.7)',
        zIndex: Math.floor(normalizedValue * 100), // Higher values appear on top
        padding: '0.25rem',
        border: isSelected ? '2px solid currentColor' : 'none',
        borderRadius: '6px',
        backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : 'transparent',
        boxShadow: isSelected ? '0 0 10px rgba(139, 92, 246, 0.3)' : 'none',
        animationDelay: `${index * 0.05}s`,
        opacity: isAnimating ? 0 : 1
      }}
      title={`${keyword.text}: ${keyword.value}`}
      onClick={onClick}
    >
      {keyword.text}
    </div>
  );
};

export default KeywordItemComponent;
