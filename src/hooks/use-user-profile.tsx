
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  monthlySavings: string;
  riskTolerance: number;
  investmentHorizon: string;
  financialGoals: string;
  investmentCategories: string;
};

const defaultUserProfile: UserProfileType = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  monthlyIncome: "5000",
  monthlyExpenses: "3500",
  monthlySavings: "1500",
  riskTolerance: 5,
  investmentHorizon: "medium",
  financialGoals: "retirement",
  investmentCategories: "tech"
};

interface UserProfileContextType {
  userProfile: UserProfileType;
  updateUserProfile: (updates: Partial<UserProfileType>) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  // Try to load from localStorage, or use default
  const [userProfile, setUserProfile] = useState<UserProfileType>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultUserProfile;
  });

  // Update localStorage when userProfile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
