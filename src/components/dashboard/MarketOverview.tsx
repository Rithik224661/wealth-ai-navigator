
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const marketData = [
  { name: "Jan", S_P500: 4200, NASDAQ: 14100, DOW: 34200 },
  { name: "Feb", S_P500: 4250, NASDAQ: 14300, DOW: 34500 },
  { name: "Mar", S_P500: 4180, NASDAQ: 14000, DOW: 34100 },
  { name: "Apr", S_P500: 4300, NASDAQ: 14500, DOW: 34800 },
  { name: "May", S_P500: 4380, NASDAQ: 14800, DOW: 35200 },
  { name: "Jun", S_P500: 4420, NASDAQ: 15000, DOW: 35400 },
];

const MarketIndexCard = ({
  name,
  value,
  change,
  color,
}: {
  name: string;
  value: number;
  change: number;
  color: string;
}) => {
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col">
      <div className="text-sm font-medium text-muted-foreground">{name}</div>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      <div
        className={`flex items-center text-sm ${
          isPositive ? "text-wealth-green" : "text-wealth-red"
        }`}
      >
        {isPositive ? (
          <ArrowUpRight className="mr-1 h-4 w-4" />
        ) : (
          <ArrowDownRight className="mr-1 h-4 w-4" />
        )}
        {Math.abs(change).toFixed(2)}%
      </div>
    </div>
  );
};

export const MarketOverview = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-3 gap-4">
          <MarketIndexCard name="S&P 500" value={4420} change={1.2} color="wealth-blue" />
          <MarketIndexCard name="NASDAQ" value={15000} change={-0.5} color="wealth-teal" />
          <MarketIndexCard name="DOW 30" value={35400} change={0.8} color="wealth-gold" />
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="S_P500"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="NASDAQ"
                stroke="#33C3F0"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="DOW"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
