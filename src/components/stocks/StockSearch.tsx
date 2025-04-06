
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const StockSearch = ({
  onSearch,
}: {
  onSearch: (symbol: string) => void;
}) => {
  const [symbol, setSymbol] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symbol.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a stock symbol",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(symbol.toUpperCase().trim());
  };

  const popularStocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="mb-4 flex">
        <div className="relative flex-1">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="h-10 w-full rounded-l-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button type="submit" className="rounded-l-none">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {popularStocks.map((stock) => (
          <Button
            key={stock}
            variant="outline"
            size="sm"
            onClick={() => {
              setSymbol(stock);
              onSearch(stock);
            }}
            className="text-xs"
          >
            {stock}
          </Button>
        ))}
      </div>
    </div>
  );
};
