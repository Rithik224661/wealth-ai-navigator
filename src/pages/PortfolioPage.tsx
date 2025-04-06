
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { searchStock } from "@/services/stockService";

// Portfolio asset type
interface PortfolioAsset {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  currentValue: number;
  returnPct: number;
  allocation: number;
}

const PortfolioPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ symbol: string; name: string }[]>([]);
  const [selectedStock, setSelectedStock] = useState<{ symbol: string; name: string } | null>(null);
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([
    { 
      symbol: "AAPL", 
      name: "Apple Inc.", 
      shares: 25, 
      price: 177.58, 
      currentValue: 4439.50,
      returnPct: 12.5,
      allocation: 8.4
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 15,
      price: 334.12,
      currentValue: 5011.80,
      returnPct: 18.7,
      allocation: 9.5
    },
    {
      symbol: "VTI",
      name: "Vanguard Total Stock ETF",
      shares: 80,
      price: 252.35,
      currentValue: 20188.00,
      returnPct: 9.2,
      allocation: 38.2
    },
    {
      symbol: "BND",
      name: "Vanguard Total Bond ETF",
      shares: 120,
      price: 72.45,
      currentValue: 8694.00,
      returnPct: -1.2,
      allocation: 16.5
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 10,
      price: 243.82,
      currentValue: 2438.20,
      returnPct: 32.4,
      allocation: 4.6
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 30,
      price: 132.97,
      currentValue: 3989.10,
      returnPct: 7.8,
      allocation: 7.5
    }
  ]);
  const { toast } = useToast();
  
  // Calculate the total portfolio value
  const portfolioValue = portfolioAssets.reduce((sum, asset) => sum + asset.currentValue, 0);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchStock(searchQuery.trim());
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
        });
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

  const handleStockSelect = (stock: { symbol: string; name: string }) => {
    setSelectedStock(stock);
    setSearchResults([]);
    
    // Set a default price for the selected stock
    const randomPrice = Math.round((20 + Math.random() * 480) * 100) / 100;
    setPrice(randomPrice.toString());
  };

  const handleAddInvestment = () => {
    if (!selectedStock || !shares || !price) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const sharesNum = parseFloat(shares);
    const priceNum = parseFloat(price);
    
    if (isNaN(sharesNum) || sharesNum <= 0) {
      toast({
        title: "Invalid shares",
        description: "Please enter a valid number of shares",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid purchase price",
        variant: "destructive",
      });
      return;
    }
    
    const currentValue = sharesNum * priceNum;
    
    // Generate a random return percentage between -15% and +35%
    const returnPct = Math.round((Math.random() * 50 - 15) * 10) / 10;
    
    // Calculate new total portfolio value with the new asset
    const newTotalValue = portfolioValue + currentValue;
    
    // Create the new asset
    const newAsset: PortfolioAsset = {
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      shares: sharesNum,
      price: priceNum,
      currentValue,
      returnPct,
      allocation: Math.round((currentValue / newTotalValue) * 1000) / 10
    };
    
    // Update allocations for all assets
    const updatedAssets = [...portfolioAssets, newAsset].map(asset => ({
      ...asset,
      allocation: Math.round((asset.currentValue / newTotalValue) * 1000) / 10
    }));
    
    // Add to portfolio
    setPortfolioAssets(updatedAssets);
    
    // Reset form and close dialog
    setSelectedStock(null);
    setShares("");
    setPrice("");
    setSearchQuery("");
    setIsDialogOpen(false);
    
    toast({
      title: "Investment added",
      description: `Added ${sharesNum} shares of ${selectedStock.symbol} to your portfolio`
    });
  };

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
            Current portfolio value: ${portfolioValue.toFixed(2)}
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Add Investment</Button>
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
                  {portfolioAssets.map((asset, index) => (
                    <tr key={`${asset.symbol}-${index}`} className="border-b py-3">
                      <td className="py-4 font-medium">{asset.symbol}</td>
                      <td>{asset.name}</td>
                      <td>{asset.shares}</td>
                      <td>${asset.price.toFixed(2)}</td>
                      <td>${asset.currentValue.toFixed(2)}</td>
                      <td className={asset.returnPct >= 0 ? "text-wealth-green" : "text-wealth-red"}>
                        {asset.returnPct >= 0 ? "+" : ""}{asset.returnPct}%
                      </td>
                      <td>{asset.allocation}%</td>
                    </tr>
                  ))}
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

      {/* Add Investment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
            <DialogDescription>
              Add a new investment to your portfolio. Search for a stock by symbol or company name.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {!selectedStock ? (
              // Stock search form
              <>
                <div className="grid gap-2">
                  <Label htmlFor="stock-search">Search Stock</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stock-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter symbol or company name"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSearch} 
                      disabled={isSearching || !searchQuery.trim()}
                    >
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="max-h-[200px] overflow-y-auto rounded-md border border-border p-1">
                    {searchResults.map((result) => (
                      <div
                        key={result.symbol}
                        className="cursor-pointer rounded-md p-2 hover:bg-accent"
                        onClick={() => handleStockSelect(result)}
                      >
                        <div className="font-medium">{result.symbol}</div>
                        <div className="text-xs text-muted-foreground">{result.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Selected stock form
              <>
                <div>
                  <Label className="text-base font-semibold">Selected Stock</Label>
                  <div className="mt-1 rounded-md bg-primary/5 p-3">
                    <div className="font-medium">{selectedStock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{selectedStock.name}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="shares">Number of Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      value={shares}
                      onChange={(e) => setShares(e.target.value)}
                      placeholder="e.g. 10"
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="price">Purchase Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 150.00"
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
                
                {shares && price && !isNaN(Number(shares)) && !isNaN(Number(price)) && (
                  <div className="rounded-md bg-primary/5 p-3 text-right">
                    <div className="text-sm text-muted-foreground">Total Value:</div>
                    <div className="text-lg font-semibold">
                      ${(Number(shares) * Number(price)).toFixed(2)}
                    </div>
                  </div>
                )}
                
                <Button variant="outline" onClick={() => setSelectedStock(null)}>
                  Change Stock
                </Button>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            {selectedStock && (
              <Button onClick={handleAddInvestment}>
                Add to Portfolio
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default PortfolioPage;
