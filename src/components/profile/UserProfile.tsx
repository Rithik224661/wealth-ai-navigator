
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const UserProfile = () => {
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [investmentHorizon, setInvestmentHorizon] = useState("medium");
  const [monthlyIncome, setMonthlyIncome] = useState("5000");
  const [monthlyExpenses, setMonthlyExpenses] = useState("3500");
  const [monthlySavings, setMonthlySavings] = useState("1500");

  const getRiskToleranceLabel = (value: number) => {
    if (value <= 2) return "Very Conservative";
    if (value <= 4) return "Conservative";
    if (value <= 6) return "Moderate";
    if (value <= 8) return "Aggressive";
    return "Very Aggressive";
  };

  return (
    <Tabs defaultValue="financial">
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger value="financial">Financial Profile</TabsTrigger>
        <TabsTrigger value="investment">Investment Preferences</TabsTrigger>
        <TabsTrigger value="account">Account Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="financial">
        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
            <CardDescription>
              Update your financial details to get more personalized
              recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-income">Monthly Income ($)</Label>
                  <Input
                    id="monthly-income"
                    type="number"
                    placeholder="5000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-expenses">Monthly Expenses ($)</Label>
                  <Input
                    id="monthly-expenses"
                    type="number"
                    placeholder="3500"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-savings">Monthly Savings ($)</Label>
                <Input
                  id="monthly-savings"
                  type="number"
                  placeholder="1500"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="financial-goals">Financial Goals</Label>
                <Select defaultValue="retirement">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="house">Buy a House</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="wealth">Wealth Building</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Save Financial Information</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="investment">
        <Card>
          <CardHeader>
            <CardTitle>Investment Preferences</CardTitle>
            <CardDescription>
              Customize your investment preferences for better AI
              recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Risk Tolerance</Label>
                    <span className="text-sm font-medium">
                      {getRiskToleranceLabel(riskTolerance[0])}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    step={1}
                    value={riskTolerance}
                    onValueChange={setRiskTolerance}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment-horizon">Investment Horizon</Label>
                <Select
                  value={investmentHorizon}
                  onValueChange={setInvestmentHorizon}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">
                      Short Term (1-3 years)
                    </SelectItem>
                    <SelectItem value="medium">
                      Medium Term (3-7 years)
                    </SelectItem>
                    <SelectItem value="long">
                      Long Term (7+ years)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment-categories">
                  Preferred Investment Categories
                </Label>
                <Select defaultValue="tech">
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="consumer">Consumer Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save Investment Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    defaultValue="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  defaultValue="john.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button className="w-full">Save Account Settings</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
