
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";

interface InsightCardProps {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  actionText?: string;
}

const InsightCard = ({
  title,
  description,
  category,
  icon,
  actionText,
}: InsightCardProps) => {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{title}</h4>
          <Badge variant="outline" className="h-5 text-xs">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {actionText && (
          <button className="text-sm font-medium text-primary hover:underline">
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export const FinancialInsights = () => {
  const { userProfile } = useUserProfile();

  // Generate personalized insights based on user profile
  const getPersonalizedInsights = () => {
    const insights = [];
    
    // Diversification insight based on investment categories
    if (userProfile.investmentCategories === 'tech') {
      insights.push({
        title: "Diversification Opportunity",
        description: "Your portfolio is heavily weighted in tech stocks. Consider adding consumer staples or healthcare to balance risk.",
        category: "Portfolio",
        icon: <TrendingUp className="h-5 w-5" />,
        actionText: "View Recommendations"
      });
    } else if (userProfile.investmentCategories === 'healthcare') {
      insights.push({
        title: "Sector Rotation Strategy",
        description: "Healthcare is defensive - consider adding some growth-oriented tech stocks for better returns in bull markets.",
        category: "Portfolio",
        icon: <TrendingUp className="h-5 w-5" />,
        actionText: "View Recommendations"
      });
    }
    
    // Retirement insights based on monthly savings and goals
    if (userProfile.financialGoals === 'retirement') {
      const savings = parseInt(userProfile.monthlySavings);
      const recommendedIncrease = Math.max(100, Math.round(savings * 0.15));
      insights.push({
        title: "Retirement Contribution",
        description: `Increasing your monthly contribution by $${recommendedIncrease} could boost your retirement fund by $${recommendedIncrease * 600} over 20 years.`,
        category: "Planning",
        icon: <Lightbulb className="h-5 w-5" />,
        actionText: "Run Simulation"
      });
    } else if (userProfile.financialGoals === 'house') {
      insights.push({
        title: "Home Purchase Strategy",
        description: "With your savings rate, you could reach a down payment goal faster by adjusting your investment allocation to lower-risk assets.",
        category: "Planning",
        icon: <Lightbulb className="h-5 w-5" />,
        actionText: "View Home Purchase Plan"
      });
    }
    
    // Always include the earnings report insight
    insights.push({
      title: "Upcoming Earnings Reports",
      description: "3 companies in your watchlist have earnings reports next week that may impact prices.",
      category: "Market",
      icon: <Lightbulb className="h-5 w-5" />,
      actionText: "See Details"
    });
    
    return insights.slice(0, 3); // Return at most 3 insights
  };
  
  const personalizedInsights = getPersonalizedInsights();

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              AI Financial Insights
            </CardTitle>
            <CardDescription>
              Custom recommendations based on your profile
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {personalizedInsights.map((insight, index) => (
            <InsightCard 
              key={index}
              title={insight.title}
              description={insight.description}
              category={insight.category}
              icon={insight.icon}
              actionText={insight.actionText}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
