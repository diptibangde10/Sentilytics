
import { FC, useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot: FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help with your product review analysis?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trainingMode, setTrainingMode] = useState(false);
  const [trainingData, setTrainingData] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base for the AI assistant
  const knowledgeBase = {
    sentimentAnalysis: [
      {
        question: "what is sentiment analysis",
        answer: "Sentiment analysis is the process of determining the emotional tone behind text data. It helps identify whether customer opinions about a product are positive, negative, or neutral."
      },
      {
        question: "how accurate is naive bayes for sentiment analysis",
        answer: "Naive Bayes typically achieves 75-80% accuracy for sentiment analysis tasks. It's particularly effective for text classification due to its probabilistic approach, though it may struggle with nuanced expressions or sarcasm."
      },
      {
        question: "compare svm and random forest for sentiment analysis",
        answer: "SVM excels at finding optimal boundaries in high-dimensional spaces, making it suitable for text analysis with 80-85% typical accuracy. Random Forest is more robust against overfitting with 78-83% accuracy and handles mixed data well. SVM may perform better on purely textual data, while Random Forest performs better when features beyond text are included."
      },
      {
        question: "what is aspect based sentiment analysis",
        answer: "Aspect-based sentiment analysis examines opinions on specific aspects of products rather than overall sentiment. For example, in the review 'The battery life is excellent but the screen is poor,' it identifies positive sentiment for 'battery life' and negative sentiment for 'screen'."
      },
      {
        question: "how to interpret negative feedback trends",
        answer: "To interpret negative feedback trends: 1) Identify recurring themes or keywords, 2) Track changes over time to spot deteriorating aspects, 3) Compare against product updates or market events, 4) Assess severity and frequency of complaints, and 5) Look for demographic patterns in negative feedback."
      },
      {
        question: "what metrics evaluate sentiment model performance",
        answer: "Key metrics for evaluating sentiment analysis models include: Accuracy (overall correctness), Precision (true positives / all predicted positives), Recall (true positives / all actual positives), F1-Score (harmonic mean of precision and recall), and Confusion Matrix (visualizes predictions vs. actual classes)."
      },
      {
        question: "lstm versus traditional ml for sentiment",
        answer: "LSTM neural networks outperform traditional ML methods for sentiment analysis by understanding sequential context and long-range dependencies in text. They capture nuanced expressions and perform better on complex sentences, though they require more data and computational resources than methods like Naive Bayes or SVM."
      }
    ],
    productAnalysis: [
      {
        question: "how to identify key product issues",
        answer: "To identify key product issues from reviews: 1) Look for repeated complaints across multiple reviews, 2) Pay attention to recent trends in negative feedback, 3) Analyze one-star reviews for critical problems, 4) Track aspect-based sentiment to pinpoint problematic features, and 5) Compare complaint frequency against total review volume."
      },
      {
        question: "what makes a good product recommendation",
        answer: "Effective product recommendations are: 1) Relevant to user preferences and past behavior, 2) Timely based on current needs, 3) Diverse to avoid repetition, 4) Personalized to individual users, and 5) Accompanied by reasoning to build trust ('Recommended because you liked X')."
      }
    ]
  };

  // Find the most relevant answer from the knowledge base
  const findAnswer = (query: string): string => {
    // Normalize query by removing punctuation and converting to lowercase
    const normalizedQuery = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    // Search through all knowledge categories
    for (const category in knowledgeBase) {
      const entries = knowledgeBase[category as keyof typeof knowledgeBase];
      
      // Find the best matching entry
      const bestMatch = entries.reduce((best, current) => {
        const currentMatch = calculateSimilarity(normalizedQuery, current.question);
        return currentMatch > best.similarity ? { entry: current, similarity: currentMatch } : best;
      }, { entry: null, similarity: 0 });
      
      // If we have a decent match, return the answer
      if (bestMatch.similarity > 0.3 && bestMatch.entry) {
        return bestMatch.entry.answer;
      }
    }
    
    // Fallback responses for queries without specific matches
    const fallbackResponses = [
      "I don't have specific information about that in my knowledge base yet. Would you like to add this to my training data?",
      "That's an interesting question about sentiment analysis. Could you provide more details about what you're looking for?",
      "I'm still learning about advanced sentiment analysis techniques. Would you like to train me on this topic?",
      "I don't have enough information to answer that confidently. Could you rephrase or provide more context?",
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };
  
  // Simple text similarity function
  const calculateSimilarity = (query: string, knowledgeQuestion: string): number => {
    const normalizedKnowledge = knowledgeQuestion.toLowerCase();
    
    // Check for direct substring matches
    if (normalizedKnowledge.includes(query) || query.includes(normalizedKnowledge)) {
      return 0.8;
    }
    
    // Count matching words
    const queryWords = query.split(" ");
    const knowledgeWords = normalizedKnowledge.split(" ");
    
    const matchingWords = queryWords.filter(word => 
      word.length > 3 && knowledgeWords.includes(word)
    ).length;
    
    // Calculate similarity score based on matching words
    return matchingWords / Math.max(queryWords.length, knowledgeWords.length);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Get response from knowledge base
      const response = findAnswer(input);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleTrainingSubmit = () => {
    if (!trainingData.trim()) {
      toast({
        title: "Training Error",
        description: "Please provide training data before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate training process
    toast({
      title: "Training in progress",
      description: "Processing your training data...",
    });

    setTimeout(() => {
      toast({
        title: "Training Complete",
        description: "The chatbot has been trained with your new data.",
      });
      
      // Add confirmation message
      const botMessage: Message = {
        id: Date.now().toString(),
        content: "Thank you! I've learned from the training data you provided. Feel free to ask me questions related to this new information.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setTrainingData("");
      setTrainingMode(false);
    }, 2000);
  };

  return (
    <Card className="flex flex-col h-[600px] w-full">
      <CardHeader className="py-3 px-4 border-b">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="w-5 h-5 mr-2 text-primary" />
            Sentiment Analysis Assistant
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTrainingMode(!trainingMode)}
          >
            {trainingMode ? "Cancel Training" : "Train AI"}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {trainingMode ? (
        <CardContent className="p-4 flex-grow overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Training Mode</h3>
            <p className="text-sm text-muted-foreground">
              Provide examples of questions and answers to train the AI assistant. 
              Format: Question: [your question] Answer: [your answer]
            </p>
            <Textarea 
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
              placeholder="Question: What is aspect-based sentiment analysis? Answer: Aspect-based sentiment analysis focuses on identifying sentiment toward specific aspects or features of a product..."
              className="min-h-[300px]"
            />
            <Button onClick={handleTrainingSubmit} className="w-full">
              Submit Training Data
            </Button>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className="p-4 overflow-y-auto flex-grow">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className={`h-8 w-8 ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {message.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 bg-muted text-muted-foreground">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted text-foreground flex items-center">
                      <span className="typing-indicator">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex w-full gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question about sentiment analysis..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default Chatbot;
