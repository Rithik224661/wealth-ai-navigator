
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StockSearch } from "@/components/stocks/StockSearch";
import { StockPrediction } from "@/components/stocks/StockPrediction";
import { BarChart3 } from "lucide-react";

const StocksPage = () => {
  const [searchedSymbol, setSearchedSymbol] = useState<string | null>(null);

  const handleSearch = (symbol: string) => {
    setSearchedSymbol(symbol);
  };

  return (
    <PageLayout>
      <div className="mb-8 flex items-center gap-4">
        <BarChart3 className="h-8 w-8 text-wealth-teal" />
        <div>
          <h1 className="text-3xl font-bold">Stock Predictions</h1>
          <p className="text-muted-foreground">
            AI-powered stock trend forecasting and analysis
          </p>
        </div>
      </div>

      <StockSearch onSearch={handleSearch} />

      {searchedSymbol ? (
        <StockPrediction symbol={searchedSymbol} />
      ) : (
        <div className="flex h-60 items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
          <div>
            <p className="mb-2 text-lg">Search for a stock to see predictions</p>
            <p className="text-sm">
              Enter a stock symbol like AAPL, MSFT or TSLA
            </p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default StocksPage;
