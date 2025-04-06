
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, BarChart3 } from "lucide-react";
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

interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  predictionData: {
    date: string;
    actual: number;
    predicted: number;
  }[];
  confidenceScore: number;
  recommendation: "buy" | "hold" | "sell";
}

const mockStockData: Record<string, StockData> = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 177.58,
    change: 2.45,
    confidenceScore: 87,
    recommendation: "buy",
    predictionData: [
      { date: "Apr 1", actual: 170.2, predicted: 170.2 },
      { date: "Apr 2", actual: 172.4, predicted: 171.8 },
      { date: "Apr 3", actual: 173.5, predicted: 173.1 },
      { date: "Apr 4", actual: 175.1, predicted: 174.6 },
      { date: "Apr 5", actual: 177.58, predicted: 176.9 },
      { date: "Apr 6", actual: 0, predicted: 179.2 },
      { date: "Apr 7", actual: 0, predicted: 181.5 },
      { date: "Apr 8", actual: 0, predicted: 183.2 },
      { date: "Apr 9", actual: 0, predicted: 185.7 },
      { date: "Apr 10", actual: 0, predicted: 187.3 },
    ],
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    currentPrice: 334.12,
    change: 1.98,
    confidenceScore: 82,
    recommendation: "buy",
    predictionData: [
      { date: "Apr 1", actual: 326.9, predicted: 326.9 },
      { date: "Apr 2", actual: 328.5, predicted: 327.8 },
      { date: "Apr 3", actual: 330.1, predicted: 329.5 },
      { date: "Apr 4", actual: 332.8, predicted: 331.7 },
      { date: "Apr 5", actual: 334.12, predicted: 333.5 },
      { date: "Apr 6", actual: 0, predicted: 336.2 },
      { date: "Apr 7", actual: 0, predicted: 338.7 },
      { date: "Apr 8", actual: 0, predicted: 341.3 },
      { date: "Apr 9", actual: 0, predicted: 343.8 },
      { date: "Apr 10", actual: 0, predicted: 346.2 },
    ],
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 132.97,
    change: -0.58,
    confidenceScore: 76,
    recommendation: "hold",
    predictionData: [
      { date: "Apr 1", actual: 134.8, predicted: 134.8 },
      { date: "Apr 2", actual: 134.2, predicted: 134.3 },
      { date: "Apr 3", actual: 133.5, predicted: 133.7 },
      { date: "Apr 4", actual: 133.1, predicted: 133.2 },
      { date: "Apr 5", actual: 132.97, predicted: 132.8 },
      { date: "Apr 6", actual: 0, predicted: 132.5 },
      { date: "Apr 7", actual: 0, predicted: 131.9 },
      { date: "Apr 8", actual: 0, predicted: 132.3 },
      { date: "Apr 9", actual: 0, predicted: 132.8 },
      { date: "Apr 10", actual: 0, predicted: 133.2 },
    ],
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla Inc.",
    currentPrice: 243.82,
    change: 3.21,
    confidenceScore: 72,
    recommendation: "buy",
    predictionData: [
      { date: "Apr 1", actual: 232.4, predicted: 232.4 },
      { date: "Apr 2", actual: 235.7, predicted: 234.9 },
      { date: "Apr 3", actual: 238.2, predicted: 237.5 },
      { date: "Apr 4", actual: 240.1, predicted: 239.8 },
      { date: "Apr 5", actual: 243.82, predicted: 242.5 },
      { date: "Apr 6", actual: 0, predicted: 247.2 },
      { date: "Apr 7", actual: 0, predicted: 252.8 },
      { date: "Apr 8", actual: 0, predicted: 256.4 },
      { date: "Apr 9", actual: 0, predicted: 260.1 },
      { date: "Apr 10", actual: 0, predicted: 263.7 },
    ],
  },
  AMZN: {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    currentPrice: 132.85,
    change: 1.75,
    confidenceScore: 84,
    recommendation: "buy",
    predictionData: [
      { date: "Apr 1", actual: 129.2, predicted: 129.2 },
      { date: "Apr 2", actual: 130.1, predicted: 129.8 },
      { date: "Apr 3", actual: 131.4, predicted: 131.0 },
      { date: "Apr 4", actual: 132.1, predicted: 131.8 },
      { date: "Apr 5", actual: 132.85, predicted: 132.7 },
      { date: "Apr 6", actual: 0, predicted: 133.9 },
      { date: "Apr 7", actual: 0, predicted: 135.2 },
      { date: "Apr 8", actual: 0, predicted: 136.8 },
      { date: "Apr 9", actual: 0, predicted: 138.5 },
      { date: "Apr 10", actual: 0, predicted: 140.1 },
    ],
  },
};

export const StockPrediction = ({ symbol }: { symbol: string }) => {
  // In a real application, this would fetch data from your API
  const stockData = mockStockData[symbol];

  if (!stockData) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-muted-foreground">
        No prediction data available for {symbol}. Please try another symbol.
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
                  x="Apr 5"
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
