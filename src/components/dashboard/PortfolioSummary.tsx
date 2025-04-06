
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const portfolioData = [
  { name: "Stocks", value: 45, color: "#3B82F6" },
  { name: "ETFs", value: 30, color: "#33C3F0" },
  { name: "Bonds", value: 15, color: "#F59E0B" },
  { name: "Cash", value: 10, color: "#22C55E" },
];

export const PortfolioSummary = () => {
  const totalValue = 52845.72;
  const totalReturn = 3728.64;
  const returnPercentage = 7.59;

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Your investment portfolio overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground">
                Total Value
              </div>
              <div className="text-3xl font-bold">
                ${totalValue.toLocaleString()}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-muted-foreground">
                Total Return
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-wealth-green">
                  ${totalReturn.toLocaleString()}
                </span>
                <span className="ml-2 flex items-center text-sm text-wealth-green">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {returnPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {portfolioData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
