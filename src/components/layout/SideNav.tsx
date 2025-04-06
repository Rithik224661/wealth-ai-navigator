
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Home,
  LineChart,
  PieChart,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export const SideNav = () => {
  return (
    <div className="fixed h-full w-64 bg-sidebar py-4 shadow-lg">
      <div className="mb-8 px-4">
        <h1 className="flex items-center gap-2 text-xl font-bold text-sidebar-foreground">
          <LineChart className="h-6 w-6 text-wealth-teal" />
          <span>WealthAI Navigator</span>
        </h1>
      </div>

      <div className="space-y-1 px-3">
        <NavItem to="/" icon={Home} label="Dashboard" />
        <NavItem to="/stocks" icon={BarChart3} label="Stock Predictions" />
        <NavItem to="/portfolio" icon={PieChart} label="Portfolio" />
        <NavItem to="/finance" icon={Wallet} label="Financial Advisor" />
        <NavItem to="/profile" icon={Users} label="Profile" />
        <NavItem to="/settings" icon={Settings} label="Settings" />
      </div>
    </div>
  );
};
