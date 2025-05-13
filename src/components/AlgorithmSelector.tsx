
import { FC } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onSelectAlgorithm: (algorithm: string) => void;
}

const AlgorithmSelector: FC<AlgorithmSelectorProps> = ({ 
  selectedAlgorithm, 
  onSelectAlgorithm 
}) => {
  const { toast } = useToast();
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([selectedAlgorithm]);
  const [results, setResults] = useState<Record<string, { accuracy: number; precision: number; recall: number }>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleAlgorithmToggle = (algorithmId: string) => {
    setSelectedAlgorithms(current => {
      const isSelected = current.includes(algorithmId);
      
      // If it's selected, remove it (unless it's the last one)
      if (isSelected) {
        if (current.length === 1) {
          // Don't allow deselecting the last algorithm
          return current;
        }
        return current.filter(id => id !== algorithmId);
      }
      
      // If not selected, add it
      return [...current, algorithmId];
    });
    
    // Update the main selected algorithm (for backwards compatibility)
    if (!selectedAlgorithms.includes(algorithmId)) {
      onSelectAlgorithm(algorithmId);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis process for selected algorithms
    setTimeout(() => {
      const newResults: Record<string, { accuracy: number; precision: number; recall: number }> = {};
      
      selectedAlgorithms.forEach(algorithmId => {
        // Generate mock results
        newResults[algorithmId] = {
          accuracy: Math.round((0.7 + Math.random() * 0.25) * 100) / 100,
          precision: Math.round((0.65 + Math.random() * 0.3) * 100) / 100,
          recall: Math.round((0.6 + Math.random() * 0.35) * 100) / 100
        };
      });
      
      setResults(newResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `${selectedAlgorithms.length} algorithm${selectedAlgorithms.length > 1 ? 's' : ''} analyzed successfully`,
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Algorithms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="flex items-center space-x-2">
              <Checkbox 
                id={algorithm.id} 
                checked={selectedAlgorithms.includes(algorithm.id)}
                onCheckedChange={() => handleAlgorithmToggle(algorithm.id)}
              />
              <Label
                htmlFor={algorithm.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between w-full rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">{algorithm.name}</span>
                  <span className="text-xs text-muted-foreground">{algorithm.description}</span>
                </div>
                {selectedAlgorithms.includes(algorithm.id) && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <Button 
          onClick={handleAnalyze} 
          className="w-full"
          disabled={isAnalyzing || selectedAlgorithms.length === 0}
        >
          {isAnalyzing ? "Analyzing..." : "Run Analysis"}
        </Button>
        
        {Object.keys(results).length > 0 && (
          <div className="w-full mt-4">
            <h3 className="font-medium text-lg mb-3">Algorithm Results</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(results).map(([algorithmId, metrics]) => {
                const algorithm = algorithms.find(a => a.id === algorithmId);
                return (
                  <Card key={algorithmId} className="p-4 bg-muted/30">
                    <h4 className="font-medium">{algorithm?.name}</h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt>Accuracy</dt>
                        <dd className="font-mono">{metrics.accuracy.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Precision</dt>
                        <dd className="font-mono">{metrics.precision.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Recall</dt>
                        <dd className="font-mono">{metrics.recall.toFixed(2)}</dd>
                      </div>
                    </dl>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AlgorithmSelector;
