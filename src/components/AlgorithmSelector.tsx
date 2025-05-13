
import { FC } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onSelectAlgorithm: (algorithm: string) => void;
}

const AlgorithmSelector: FC<AlgorithmSelectorProps> = ({ 
  selectedAlgorithm, 
  onSelectAlgorithm 
}) => {
  const algorithms = [
    { 
      id: "naive-bayes", 
      name: "Naive Bayes", 
      description: "Fast classification for text data with probabilistic approach" 
    },
    { 
      id: "svm", 
      name: "Support Vector Machine (SVM)", 
      description: "Powerful classifier for high-dimensional spaces" 
    },
    { 
      id: "random-forest", 
      name: "Random Forest", 
      description: "Ensemble method using multiple decision trees" 
    },
    { 
      id: "lstm", 
      name: "Long Short-Term Memory (LSTM)", 
      description: "Deep learning approach for sequential data" 
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Algorithm</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedAlgorithm} 
          onValueChange={onSelectAlgorithm}
          className="grid gap-4"
        >
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="flex items-center space-x-2">
              <RadioGroupItem value={algorithm.id} id={algorithm.id} className="peer sr-only" />
              <Label
                htmlFor={algorithm.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between w-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">{algorithm.name}</span>
                  <span className="text-xs text-muted-foreground">{algorithm.description}</span>
                </div>
                <Check className="hidden h-5 w-5 peer-data-[state=checked]:block text-primary [.peer-data-[state=checked]+&]:block" />
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default AlgorithmSelector;
