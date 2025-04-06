
import { PageLayout } from "@/components/layout/PageLayout";
import { PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PortfolioPage = () => {
  return (
    <PageLayout>
      <div className="mb-8 flex items-center gap-4">
        <PieChart className="h-8 w-8 text-wealth-teal" />
        <div>
          <h1 className="text-3xl font-bold">Portfolio Manager</h1>
          <p className="text-muted-foreground">
            Track and manage your investment portfolio
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Holdings</h2>
          <p className="text-sm text-muted-foreground">
            Current portfolio value: $52,845.72
          </p>
        </div>
        <Button>Add Investment</Button>
      </div>

      <div className="grid gap-6">
        <Card className="dashboard-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Portfolio Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Shares</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2">Current Value</th>
                    <th className="pb-2">Return</th>
                    <th className="pb-2">Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b py-3">
                    <td className="py-4 font-medium">AAPL</td>
                    <td>Apple Inc.</td>
                    <td>25</td>
                    <td>$177.58</td>
                    <td>$4,439.50</td>
                    <td className="text-wealth-green">+12.5%</td>
                    <td>8.4%</td>
                  </tr>
                  <tr className="border-b py-3">
                    <td className="py-4 font-medium">MSFT</td>
                    <td>Microsoft Corp.</td>
                    <td>15</td>
                    <td>$334.12</td>
                    <td>$5,011.80</td>
                    <td className="text-wealth-green">+18.7%</td>
                    <td>9.5%</td>
                  </tr>
                  <tr className="border-b py-3">
                    <td className="py-4 font-medium">VTI</td>
                    <td>Vanguard Total Stock ETF</td>
                    <td>80</td>
                    <td>$252.35</td>
                    <td>$20,188.00</td>
                    <td className="text-wealth-green">+9.2%</td>
                    <td>38.2%</td>
                  </tr>
                  <tr className="border-b py-3">
                    <td className="py-4 font-medium">BND</td>
                    <td>Vanguard Total Bond ETF</td>
                    <td>120</td>
                    <td>$72.45</td>
                    <td>$8,694.00</td>
                    <td className="text-wealth-red">-1.2%</td>
                    <td>16.5%</td>
                  </tr>
                  <tr className="border-b py-3">
                    <td className="py-4 font-medium">TSLA</td>
                    <td>Tesla Inc.</td>
                    <td>10</td>
                    <td>$243.82</td>
                    <td>$2,438.20</td>
                    <td className="text-wealth-green">+32.4%</td>
                    <td>4.6%</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">GOOGL</td>
                    <td>Alphabet Inc.</td>
                    <td>30</td>
                    <td>$132.97</td>
                    <td>$3,989.10</td>
                    <td className="text-wealth-green">+7.8%</td>
                    <td>7.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle>AI Portfolio Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-primary/10 p-4">
                  <h4 className="mb-2 font-medium">Diversification Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Your portfolio has a high concentration in technology stocks
                    (38%). Consider reallocating some assets to defensive sectors
                    for better risk management.
                  </p>
                </div>
                <div className="rounded-md bg-primary/10 p-4">
                  <h4 className="mb-2 font-medium">Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    Current portfolio beta: 1.2 (higher volatility than market).
                    This aligns with your aggressive risk tolerance but may need
                    adjustment as you approach your investment goals.
                  </p>
                </div>
                <div className="rounded-md bg-primary/10 p-4">
                  <h4 className="mb-2 font-medium">Rebalancing Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    Your bond allocation is 5% below your target. Consider adding
                    more to BND or similar fixed-income securities to maintain
                    your desired asset allocation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Total Return (YTD)
                  </div>
                  <div className="text-3xl font-bold text-wealth-green">
                    +11.4%
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Benchmark (S&P 500)
                  </div>
                  <div className="text-3xl font-bold">+9.7%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Dividend Yield
                  </div>
                  <div className="text-3xl font-bold">2.3%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Sharpe Ratio
                  </div>
                  <div className="text-3xl font-bold">1.32</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PortfolioPage;
