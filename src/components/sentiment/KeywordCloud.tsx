
import { FC, useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { KeywordCloudProps, KeywordItem } from "@/types/keywordCloud";
import KeywordDetail from "./KeywordDetail";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-chart-wordcloud';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const KeywordCloud: FC<KeywordCloudProps> = ({ keywords = [] }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItem | null>(null);
  const chartRef = useRef<ChartJS>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Extract max value for the detail component
  const maxWordValue = keywords.length > 0
    ? Math.max(...keywords.map(item => item.value))
    : 0;

  const handleWordClick = (event: any, elements: any) => {
    if (elements && elements.length > 0) {
      const index = elements[0].index;
      const clickedKeyword = keywords[index];
      setSelectedKeyword(selectedKeyword?.text === clickedKeyword.text ? null : clickedKeyword);
    } else {
      setSelectedKeyword(null);
    }
  };

  // Chart.js configuration
  const chartData: ChartData<'wordCloud'> = {
    labels: keywords.map(k => k.text),
    datasets: [
      {
        label: 'Keywords',
        data: keywords.map(k => k.value),
        color: keywords.map(k => {
          // Color scaling based on value
          const normalizedValue = (k.value - 0) / (maxWordValue || 1);
          if (normalizedValue > 0.85) return '#8B5CF6'; // Vivid Purple
          if (normalizedValue > 0.7) return '#9b87f5';  // Primary Purple
          if (normalizedValue > 0.55) return '#7E69AB'; // Secondary Purple
          if (normalizedValue > 0.4) return '#D6BCFA';  // Light Purple
          if (normalizedValue > 0.25) return '#E5DEFF'; // Soft Purple
          return '#F1F0FB';  // Soft Gray
        }),
        weight: keywords.map(k => {
          // Scale the font weight based on value
          const normalizedValue = (k.value - 0) / (maxWordValue || 1);
          return normalizedValue > 0.6 ? 'bold' : 'normal';
        })
      }
    ]
  };

  // Chart.js options
  const chartOptions: ChartOptions<'wordCloud'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    // @ts-ignore - wordCloud type is provided by chartjs-chart-wordcloud plugin
    wordCloud: {
      minRotation: -30,
      maxRotation: 30,
      spiral: 'archimedean',
      padding: 5,
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'normal',
      minFontSize: 10,
      maxFontSize: 60,
      drawOutOfBound: false,
      mouseoverEnabled: true,
      fit: true,
      drawOutOfBound: false,
      shape: 'circle',
      hoverCallback: function(item: any, dimension: any, event: any) {
        // Add a subtle highlight effect on hover
        const canvas = chartRef.current?.canvas;
        if (canvas) {
          canvas.style.cursor = 'pointer';
        }
      }
    },
    onClick: handleWordClick
  };

  // Resize observer to make chart responsive
  useEffect(() => {
    if (containerRef.current && chartRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setTimeout(() => {
          if (chartRef.current) {
            chartRef.current.resize();
          }
        }, 10);
      });
      
      resizeObserver.observe(containerRef.current);
      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  return (
    <Card className="dashboard-card col-span-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Keyword Cloud
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  The keyword cloud shows the most common terms found in your dataset. 
                  Larger words appear more frequently, and color indicates importance.
                  Click on a keyword to see its exact count.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative p-0 overflow-hidden">
        {keywords.length > 0 ? (
          <div ref={containerRef} className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md relative">
              <Chart
                ref={chartRef}
                type="wordCloud"
                data={chartData}
                options={chartOptions}
                className="w-full h-full"
              />
              
              {selectedKeyword && (
                <KeywordDetail 
                  selectedKeyword={selectedKeyword} 
                  maxValue={maxWordValue} 
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-muted-foreground">No keyword data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordCloud;
