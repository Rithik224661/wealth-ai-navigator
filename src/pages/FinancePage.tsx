
import { PageLayout } from "@/components/layout/PageLayout";
import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FinancePage = () => {
  return (
    <PageLayout>
      <div className="mb-8 flex items-center gap-4">
        <Wallet className="h-8 w-8 text-wealth-teal" />
        <div>
          <h1 className="text-3xl font-bold">Financial Advisor</h1>
          <p className="text-muted-foreground">
            AI-powered financial insights and recommendations
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle>Your Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Monthly Income
                </div>
                <div className="text-3xl font-bold">$5,000</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Monthly Expenses
                </div>
                <div className="text-3xl font-bold">$3,500</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Monthly Savings
                </div>
                <div className="text-3xl font-bold text-wealth-green">
                  $1,500
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="dashboard-card col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Personalized Investment Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">Vanguard Total Stock ETF (VTI)</h3>
                    <Button size="sm">View Details</Button>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    A low-cost ETF that provides broad exposure to the US stock
                    market. Aligns with your long-term investment horizon and
                    moderate risk tolerance.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium">Expense Ratio:</span> 0.03%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">5Y Return:</span> 11.21%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Risk Level:</span> Moderate
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">iShares Core Dividend ETF (DIVB)</h3>
                    <Button size="sm">View Details</Button>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    A dividend-focused ETF that offers stable income and growth
                    potential. Recommended based on your preference for income
                    generation.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium">Expense Ratio:</span> 0.12%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Dividend Yield:</span> 3.8%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Risk Level:</span>{" "}
                      Conservative
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">ARK Innovation ETF (ARKK)</h3>
                    <Button size="sm">View Details</Button>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    An actively managed ETF focused on disruptive innovation.
                    Recommended for the growth portion of your portfolio based on
                    your risk tolerance.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium">Expense Ratio:</span> 0.75%
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Growth Potential:</span> High
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Risk Level:</span> Aggressive
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <CardTitle>Financial Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-medium">Retirement</div>
                    <div className="text-sm text-wealth-green">On Track</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-wealth-green"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    65% towards $1.2M goal
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-medium">Home Purchase</div>
                    <div className="text-sm text-wealth-gold">Needs Attention</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-wealth-gold"
                      style={{ width: "38%" }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    38% towards $100K down payment
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-medium">Emergency Fund</div>
                    <div className="text-sm text-wealth-green">Completed</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-wealth-green"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    100% towards $15K goal
                  </div>
                </div>

                <Button className="w-full">Add New Goal</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle>Financial Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-border p-4">
                <div>
                  <h4 className="font-medium">Increase retirement contributions</h4>
                  <p className="text-sm text-muted-foreground">
                    Increasing your 401(k) contribution by 2% could significantly
                    boost your retirement savings.
                  </p>
                </div>
                <Button variant="outline">Take Action</Button>
              </div>

              <div className="flex items-center justify-between rounded-md border border-border p-4">
                <div>
                  <h4 className="font-medium">Refinance mortgage</h4>
                  <p className="text-sm text-muted-foreground">
                    Current rates are 0.75% lower than your existing mortgage
                    rate. Refinancing could save $210 monthly.
                  </p>
                </div>
                <Button variant="outline">Take Action</Button>
              </div>

              <div className="flex items-center justify-between rounded-md border border-border p-4">
                <div>
                  <h4 className="font-medium">Optimize tax strategy</h4>
                  <p className="text-sm text-muted-foreground">
                    Utilizing tax-loss harvesting could save an estimated $950 on
                    your next tax return.
                  </p>
                </div>
                <Button variant="outline">Take Action</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default FinancePage;
