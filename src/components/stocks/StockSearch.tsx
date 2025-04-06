
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { searchStock } from "@/services/stockService";

export const StockSearch = ({
  onSearch,
}: {
  onSearch: (symbol: string) => void;
}) => {
  const [symbol, setSymbol] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ symbol: string; name: string }[]>([]);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symbol.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a stock symbol or name",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    try {
      const results = await searchStock(symbol.trim());
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
          variant: "destructive",
        });
      } else if (results.length === 1) {
        // If only one result, automatically select it
        onSearch(results[0].symbol);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (symbol: string) => {
    setSymbol(symbol);
    onSearch(symbol);
    setSearchResults([]);
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
            placeholder="Enter stock symbol or company name"
            className="h-10 w-full rounded-l-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-background p-1 shadow-lg">
              {searchResults.map((result) => (
                <div
                  key={result.symbol}
                  className="cursor-pointer rounded-md p-2 hover:bg-accent"
                  onClick={() => handleResultClick(result.symbol)}
                >
                  <div className="font-medium">{result.symbol}</div>
                  <div className="text-xs text-muted-foreground">{result.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" className="rounded-l-none" disabled={isSearching}>
          <Search className="mr-2 h-4 w-4" />
          {isSearching ? "Searching..." : "Search"}
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
