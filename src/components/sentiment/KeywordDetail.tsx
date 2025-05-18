
import { FC } from "react";
import { KeywordItem } from "@/types/keywordCloud";

interface KeywordDetailProps {
  selectedKeyword: KeywordItem;
  maxValue: number;
}

const KeywordDetail: FC<KeywordDetailProps> = ({ selectedKeyword, maxValue }) => {
  return (
    <div className="absolute bottom-3 right-3 bg-white/90 shadow-md p-3 rounded-lg border border-purple-200 max-w-xs animate-fade-in">
      <h4 className="font-medium text-purple-800">{selectedKeyword.text}</h4>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-2 bg-purple-600 rounded-full" style={{
          width: `${(selectedKeyword.value / maxValue) * 100}%`,
          maxWidth: "100px"
        }}></div>
        <p className="text-xs text-muted-foreground">
          {selectedKeyword.value} occurrences
        </p>
      </div>
      <p className="text-xs mt-2 text-purple-500">Click again to dismiss</p>
    </div>
  );
};

export default KeywordDetail;
