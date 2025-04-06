
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, BarChart3, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { getStockData, StockData } from "@/services/stockService";

export const StockPrediction = ({ symbol }: { symbol: string }) => {
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getStockData(symbol);
        setStockData(data);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchStockData();
    
    // Refresh data every 60 seconds if the component is still mounted
    const intervalId = setInterval(() => {
      fetchStockData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-dashed">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading prediction data...</p>
        </div>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-muted-foreground">
        {error || `No prediction data available for ${symbol}. Please try another symbol.`}
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "buy":
        return "bg-wealth-green text-white";
      case "sell":
        return "bg-wealth-red text-white";
      default:
        return "bg-wealth-gold text-white";
    }
  };

  // Get today's date in the format "Apr 5"
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{stockData.symbol}</CardTitle>
                <span className="text-lg text-muted-foreground">
                  {stockData.name}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-bold">
                  ${stockData.currentPrice.toFixed(2)}
                </span>
                <span
                  className={`flex items-center text-sm ${
                    stockData.change >= 0
                      ? "text-wealth-green"
                      : "text-wealth-red"
                  }`}
                >
                  {stockData.change >= 0 ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(stockData.change).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge
                className={`${getRecommendationColor(
                  stockData.recommendation
                )} uppercase`}
              >
                {stockData.recommendation}
              </Badge>
              <div className="text-sm text-muted-foreground">
                AI Confidence Score:{" "}
                <span className="font-bold">{stockData.confidenceScore}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stockData.predictionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <ReferenceLine
                  x={today}
                  stroke="#64748B"
                  label={{
                    value: "Today",
                    position: "insideBottomRight",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#22C55E"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h4 className="mb-2 flex items-center gap-2 font-medium">
              <BarChart3 className="h-5 w-5 text-primary" />
              AI Prediction Analysis
            </h4>
            <p className="text-sm text-muted-foreground">
              {stockData.recommendation === "buy" &&
                `Our AI model indicates that ${stockData.symbol} shows strong growth potential over the next 5 trading days. The prediction is based on technical analysis, recent company performance, and positive market sentiment. Consider adding this stock to your portfolio.`}
              {stockData.recommendation === "hold" &&
                `Our AI model indicates that ${stockData.symbol} is likely to remain stable over the next 5 trading days. The prediction is based on technical analysis, recent performance, and mixed market sentiment. If you already own this stock, holding is recommended.`}
              {stockData.recommendation === "sell" &&
                `Our AI model indicates that ${stockData.symbol} may experience a decline over the next 5 trading days. The prediction is based on technical analysis, recent company performance, and negative market sentiment. Consider reallocating these assets in your portfolio.`}
            </p>
            <div className="mt-4 rounded-md bg-primary/10 p-3">
              <h5 className="font-medium">Last Updated</h5>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleString()} - Data refreshes every minute
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
