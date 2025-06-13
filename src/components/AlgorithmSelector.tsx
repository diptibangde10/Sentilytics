import { FC } from "react";
import { Check, Sparkles } from "lucide-react";
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
  const [results, setResults] = useState<Record<string, { accuracy: number; precision: number; recall: number; f1Score: number }>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const algorithms = [
    { 
      id: "naive-bayes", 
      name: "Naive Bayes", 
      description: "Fast classification for text data with probabilistic approach",
      color: "from-blue-500 to-blue-600"
    },
    { 
      id: "svm", 
      name: "Support Vector Machine (SVM)", 
      description: "Powerful classifier for high-dimensional spaces",
      color: "from-purple-500 to-purple-600"
    },
    { 
      id: "random-forest", 
      name: "Random Forest", 
      description: "Ensemble method using multiple decision trees",
      color: "from-green-500 to-green-600"
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
      const newResults: Record<string, { accuracy: number; precision: number; recall: number; f1Score: number }> = {};
      
      selectedAlgorithms.forEach(algorithmId => {
        // Generate mock results
        const accuracy = Math.round((0.7 + Math.random() * 0.25) * 100) / 100;
        const precision = Math.round((0.65 + Math.random() * 0.3) * 100) / 100;
        const recall = Math.round((0.6 + Math.random() * 0.35) * 100) / 100;
        const f1Score = Math.round((2 * precision * recall / (precision + recall)) * 100) / 100;
        
        newResults[algorithmId] = {
          accuracy,
          precision,
          recall,
          f1Score
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
    <Card className="overflow-hidden gradient-border">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-primary" />
          Select Algorithms
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4">
          {algorithms.map((algorithm) => {
            const isSelected = selectedAlgorithms.includes(algorithm.id);
            
            return (
              <div key={algorithm.id} className="flex items-center space-x-3">
                <Checkbox 
                  id={algorithm.id} 
                  checked={isSelected}
                  onCheckedChange={() => handleAlgorithmToggle(algorithm.id)}
                  className={isSelected ? "border-primary text-primary" : ""}
                />
                <Label
                  htmlFor={algorithm.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between w-full rounded-lg 
                    border-2 ${isSelected ? 'border-primary/30' : 'border-muted'} 
                    bg-card p-4 hover:bg-accent/10 hover:border-accent/30 cursor-pointer
                    transition-all duration-200 ${isSelected ? 'shadow-md' : ''}`}
                >
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">{algorithm.name}</span>
                    <span className="text-xs text-muted-foreground">{algorithm.description}</span>
                  </div>
                  {isSelected && (
                    <div className={`h-6 w-6 rounded-full bg-gradient-to-r ${algorithm.color} flex items-center justify-center`}>
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </Label>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4 p-6 bg-muted/30">
        <Button 
          onClick={handleAnalyze} 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          disabled={isAnalyzing || selectedAlgorithms.length === 0}
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : "Run Analysis"}
        </Button>
        
        {Object.keys(results).length > 0 && (
          <div className="w-full mt-4 animate-fade-in">
            <h3 className="font-medium text-lg mb-3 border-b pb-2">Algorithm Results</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(results).map(([algorithmId, metrics]) => {
                const algorithm = algorithms.find(a => a.id === algorithmId);
                return (
                  <Card key={algorithmId} className="p-4 hover-scale border border-primary/20">
                    <h4 className="font-medium text-primary">{algorithm?.name}</h4>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt>Accuracy</dt>
                        <dd className="font-mono font-medium">{metrics.accuracy.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Precision</dt>
                        <dd className="font-mono font-medium">{metrics.precision.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Recall</dt>
                        <dd className="font-mono font-medium">{metrics.recall.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>F1-Score</dt>
                        <dd className="font-mono font-medium">{metrics.f1Score.toFixed(2)}</dd>
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
