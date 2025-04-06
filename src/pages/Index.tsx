
import { PageLayout } from "@/components/layout/PageLayout";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { TopStocks } from "@/components/dashboard/TopStocks";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { FinancialInsights } from "@/components/dashboard/FinancialInsights";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <PageLayout>
      <div className="mb-8 flex items-center gap-4">
        <Sparkles className="h-8 w-8 text-wealth-teal" />
        <div>
          <h1 className="text-3xl font-bold">Welcome, John</h1>
          <p className="text-muted-foreground">
            Here's an overview of your finances and the latest market trends
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <MarketOverview />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FinancialInsights />
          <PortfolioSummary />
        </div>
        <TopStocks />
      </div>
    </PageLayout>
  );
};

export default Index;
