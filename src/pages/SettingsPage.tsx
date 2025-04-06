
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [dataPrivacy, setDataPrivacy] = useState(false);
  
  const handleSaveSettings = () => {
    // In a real app, this would save to backend/localStorage
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  return (
    <PageLayout>
      <div className="mb-8 flex items-center gap-4">
        <Settings className="h-8 w-8 text-wealth-teal" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application preferences and settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your display and interface preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for better night viewing
                  </p>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Toggle dark mode"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Language</h4>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred language
                  </p>
                </div>
                <select className="rounded-md border border-input bg-background px-3 py-2">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  aria-label="Toggle email notifications"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Market Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified about significant market changes
                  </p>
                </div>
                <Switch 
                  checked={marketAlerts}
                  onCheckedChange={setMarketAlerts}
                  aria-label="Toggle market alerts"
                />
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your data and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous data sharing to improve services
                  </p>
                </div>
                <Switch 
                  checked={dataPrivacy}
                  onCheckedChange={setDataPrivacy}
                  aria-label="Toggle data sharing"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable additional security for your account
                  </p>
                </div>
                <Button variant="outline">Set Up</Button>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced system preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Refresh Interval</h4>
                  <p className="text-sm text-muted-foreground">
                    How often to refresh financial data
                  </p>
                </div>
                <select className="rounded-md border border-input bg-background px-3 py-2">
                  <option value="1m">1 minute</option>
                  <option value="5m">5 minutes</option>
                  <option value="15m">15 minutes</option>
                  <option value="30m">30 minutes</option>
                </select>
              </div>
              
              <div>
                <h4 className="mb-2 font-medium">Clear Application Data</h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  Reset all application data and start fresh
                </p>
                <Button variant="destructive">Clear Data</Button>
              </div>
              
              <Button onClick={handleSaveSettings} className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default SettingsPage;
