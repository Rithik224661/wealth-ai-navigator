
import { useState, useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";

export const UserProfile = () => {
  const { userProfile, updateUserProfile } = useUserProfile();
  
  const [riskTolerance, setRiskTolerance] = useState([userProfile.riskTolerance || 5]);
  const [investmentHorizon, setInvestmentHorizon] = useState(userProfile.investmentHorizon || "medium");
  const [monthlyIncome, setMonthlyIncome] = useState(userProfile.monthlyIncome || "5000");
  const [monthlyExpenses, setMonthlyExpenses] = useState(userProfile.monthlyExpenses || "3500");
  const [monthlySavings, setMonthlySavings] = useState(userProfile.monthlySavings || "1500");
  const [firstName, setFirstName] = useState(userProfile.firstName || "John");
  const [lastName, setLastName] = useState(userProfile.lastName || "Doe");
  const [email, setEmail] = useState(userProfile.email || "john.doe@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [financialGoals, setFinancialGoals] = useState(userProfile.financialGoals || "retirement");
  const [investmentCategories, setInvestmentCategories] = useState(userProfile.investmentCategories || "tech");

  const getRiskToleranceLabel = (value: number) => {
    if (value <= 2) return "Very Conservative";
    if (value <= 4) return "Conservative";
    if (value <= 6) return "Moderate";
    if (value <= 8) return "Aggressive";
    return "Very Aggressive";
  };
  
  const handleSaveFinancialInfo = () => {
    updateUserProfile({
      monthlyIncome,
      monthlyExpenses, 
      monthlySavings,
      financialGoals
    });
    
    toast({
      title: "Financial information updated",
      description: "Your financial details have been saved successfully",
    });
  };
  
  const handleSaveInvestmentPrefs = () => {
    updateUserProfile({
      riskTolerance: riskTolerance[0],
      investmentHorizon,
      investmentCategories
    });
    
    toast({
      title: "Investment preferences updated",
      description: "Your investment preferences have been saved successfully",
    });
  };
  
  const handleSaveAccountSettings = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }
    
    updateUserProfile({
      firstName,
      lastName,
      email
    });
    
    // In a real app, this would handle password update via API
    if (newPassword) {
      // Password update logic would go here
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    
    toast({
      title: "Account settings updated",
      description: "Your account information has been saved successfully",
    });
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
                <Select
                  value={financialGoals}
                  onValueChange={setFinancialGoals}
                >
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
              <Button className="w-full" onClick={handleSaveFinancialInfo}>
                Save Financial Information
              </Button>
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
                <Select 
                  value={investmentCategories}
                  onValueChange={setInvestmentCategories}
                >
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

              <Button className="w-full" onClick={handleSaveInvestmentPrefs}>
                Save Investment Preferences
              </Button>
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input 
                    id="last-name" 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button className="w-full" onClick={handleSaveAccountSettings}>
                Save Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
