
import React from "react";
import { SideNav } from "./SideNav";
import { Header } from "./Header";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideNav />
      <div className="flex-1 pl-64">
        <Header />
        <main className="container mx-auto p-6">{children}</main>
      </div>
    </div>
  );
};
