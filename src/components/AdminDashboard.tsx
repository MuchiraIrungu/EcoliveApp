import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, LayoutDashboard, Users, Hexagon, TrendingUp, UserCog } from 'lucide-react';
import { AdminOverview } from './admin/AdminOverview';
import { FarmerManagement } from './admin/FarmerManagement';
import { HiveManagement } from './admin/HiveManagement';
import { InvestorManagement } from './admin/InvestorManagement';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <UserCog className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-green-800">Ecolive Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full lg:w-auto">
            <TabsTrigger value="overview">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hives">
              <Hexagon className="h-4 w-4 mr-2" />
              Hives
            </TabsTrigger>
            <TabsTrigger value="farmers">
              <Users className="h-4 w-4 mr-2" />
              Farmers
            </TabsTrigger>
            <TabsTrigger value="investors">
              <TrendingUp className="h-4 w-4 mr-2" />
              Investors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="hives">
            <HiveManagement />
          </TabsContent>

          <TabsContent value="farmers">
            <FarmerManagement />
          </TabsContent>

          <TabsContent value="investors">
            <InvestorManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
