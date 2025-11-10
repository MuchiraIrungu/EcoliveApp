import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockHives, mockFarmers, mockInvestments, mockTransactions } from '../../lib/mock-data';
import { Hexagon, Users, DollarSign, TrendingUp, Activity, Award } from 'lucide-react';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';

export function AdminOverview() {
  const totalHives = mockHives.length;
  const activeHives = mockHives.filter(h => h.status === 'active' || h.status === 'producing').length;
  const tokenizedHives = mockHives.filter(h => h.tokenId).length;
  const totalFarmers = mockFarmers.length;
  const totalInvestments = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalPollinationCredits = mockInvestments.reduce((sum, inv) => sum + inv.pollinationCredits, 0);
  const avgPollinationRate = Math.round(
    mockHives.reduce((sum, h) => sum + h.pollinationRate, 0) / mockHives.length
  );

  const recentActivity = [
    { id: 1, action: 'New hive tokenized', details: 'Hive #32 - Narok County', time: '2 hours ago', type: 'hive' },
    { id: 2, action: 'Farmer added', details: 'Sarah Memusi - Kajiado', time: '5 hours ago', type: 'farmer' },
    { id: 3, action: 'Investment received', details: 'Hive #13 - $500', time: '1 day ago', type: 'investment' },
    { id: 4, action: 'Data update recorded', details: 'Hive #24 - Pollination 92%', time: '1 day ago', type: 'update' },
    { id: 5, action: 'Payout processed', details: 'James Kamau - $150', time: '2 days ago', type: 'payout' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Hives</CardTitle>
            <Hexagon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{totalHives}</div>
            <p className="text-gray-600">
              {activeHives} active
            </p>
            <Progress value={(activeHives / totalHives) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{totalFarmers}</div>
            <p className="text-gray-600">
              Across 6 regions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${totalInvestments}</div>
            <p className="text-green-600">
              Current: ${totalValue}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg Pollination</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{avgPollinationRate}%</div>
            <p className="text-gray-600">
              Across all hives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Summary (Hedera)</CardTitle>
          <CardDescription>Token and consensus service metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Tokens Created</p>
                  <p className="text-gray-900">{tokenizedHives}</p>
                </div>
                <Hexagon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Credits Generated</p>
                  <p className="text-gray-900">{totalPollinationCredits}</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Consensus Events</p>
                  <p className="text-gray-900">{mockTransactions.length}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform updates and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="text-gray-900">{activity.action}</TableCell>
                  <TableCell className="text-gray-600">{activity.details}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{activity.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-600">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hive Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Hive Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['producing', 'active', 'maintenance'].map((status) => {
              const count = mockHives.filter(h => h.status === status).length;
              const percentage = (count / totalHives) * 100;
              const color = status === 'producing' ? 'green' : status === 'active' ? 'blue' : 'yellow';
              
              return (
                <div key={status}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize text-gray-600">{status}</span>
                    <span className="text-gray-900">{count} hives</span>
                  </div>
                  <Progress value={percentage} className={`h-2 bg-${color}-100`} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
