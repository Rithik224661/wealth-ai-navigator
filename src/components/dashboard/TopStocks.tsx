
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
};

const topGainers: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 177.58, change: 2.45 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 334.12, change: 1.98 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 132.85, change: 1.75 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 243.82, change: 3.21 },
];

const topLosers: Stock[] = [
  { symbol: "META", name: "Meta Platforms", price: 327.56, change: -1.32 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 398.75, change: -0.87 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 132.97, change: -0.58 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 876.32, change: -1.76 },
];

const StockRow = ({ stock }: { stock: Stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <div className="font-medium">{stock.symbol}</div>
        <div className="text-xs text-muted-foreground">{stock.name}</div>
      </div>
      <div className="flex flex-col items-end">
        <div>${stock.price.toFixed(2)}</div>
        <div
          className={`flex items-center text-xs ${
            isPositive ? "text-wealth-green" : "text-wealth-red"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3" />
          )}
          {Math.abs(stock.change).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export const TopStocks = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle>Top Gainers</CardTitle>
          <CardDescription>Today's best performing stocks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {topGainers.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle>Top Losers</CardTitle>
          <CardDescription>Today's worst performing stocks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {topLosers.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
