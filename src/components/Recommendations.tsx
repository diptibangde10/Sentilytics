
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ThumbsUp, Star, TrendingUp } from "lucide-react";

interface RecommendationsProps {
  data?: any;
  uploadComplete?: boolean;
}

const Recommendations: FC<RecommendationsProps> = ({ data, uploadComplete = false }) => {
  // Sample recommendations data
  const recommendationsData = data || {
    similarProducts: [
      { name: "Product A", similarity: 92, sentimentScore: 85 },
      { name: "Product B", similarity: 88, sentimentScore: 72 },
      { name: "Product C", similarity: 76, sentimentScore: 90 },
      { name: "Product D", similarity: 72, sentimentScore: 78 },
      { name: "Product E", similarity: 68, sentimentScore: 82 },
    ],
    improvements: [
      { aspect: "Price", impact: 38 },
      { aspect: "Customer Support", impact: 32 },
      { aspect: "Durability", impact: 25 },
      { aspect: "Documentation", impact: 18 },
      { aspect: "Shipping", impact: 12 },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-full md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <ThumbsUp className="mr-2 h-5 w-5 text-primary" />
            Similar Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recommendationsData.similarProducts}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value: any, name: any) => {
                    if (name === "sentimentScore") return [`${value}%`, "Sentiment Score"];
                    return [`${value}%`, "Similarity"];
                  }}
                  labelFormatter={(label) => `Product: ${label}`}
                />
                <Bar
                  dataKey="similarity"
                  name="Similarity"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Products with similar features and target audience based on review analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Suggested Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={recommendationsData.improvements}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="aspect" type="category" width={120} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, "Potential Impact"]}
                  labelFormatter={(label) => `Aspect: ${label}`}
                />
                <Bar
                  dataKey="impact"
                  name="Potential Impact"
                  fill="#f97316"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {recommendationsData.improvements && recommendationsData.improvements.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#f97316" : `hsl(${24 - index * 3}, 90%, ${56 + index * 3}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Key areas where improvements could have the most significant positive impact on customer sentiment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations;
