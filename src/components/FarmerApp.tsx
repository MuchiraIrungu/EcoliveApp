import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LogOut, Sprout, DollarSign, Activity, MessageCircle, ArrowDownToLine } from 'lucide-react';
import { mockHives, mockFarmers } from '../lib/mock-data';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface FarmerAppProps {
  user: User;
  onLogout: () => void;
}

export function FarmerApp({ user, onLogout }: FarmerAppProps) {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Get farmer data
  const farmer = mockFarmers.find(f => f.email === user.email) || mockFarmers[0];
  const farmerHives = mockHives.filter(h => farmer.assignedHives.includes(h.id));

  const handleWithdrawRequest = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= farmer.balance) {
      toast.success('Withdrawal request submitted!', {
        description: `$${amount} will be sent to your M-PESA account`
      });
      setShowWithdrawDialog(false);
      setWithdrawAmount('');
    } else {
      toast.error('Invalid amount', {
        description: 'Please enter a valid amount within your balance'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'producing':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-style Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <Sprout className="h-8 w-8" />
              <div>
                <h2 className="text-white">Farmer Portal</h2>
                <p className="text-green-100">{farmer.name}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-green-700">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Balance Card */}
          <Card className="bg-white/10 backdrop-blur border-green-500">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-green-100">Available Balance</p>
                <p className="text-white">${farmer.balance}</p>
                <Button 
                  className="mt-4 bg-white text-green-600 hover:bg-green-50"
                  onClick={() => setShowWithdrawDialog(true)}
                >
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Request Withdrawal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* My Hives Section */}
        <div>
          <h3 className="text-gray-900 mb-4">My Assigned Hives</h3>
          <div className="space-y-3">
            {farmerHives.map((hive) => (
              <Card key={hive.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{hive.name}</CardTitle>
                    <Badge className={getStatusColor(hive.status)}>
                      {hive.status}
                    </Badge>
                  </div>
                  <CardDescription>{hive.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-gray-600">Pollination Rate</p>
                      <p className="text-blue-600">{hive.pollinationRate}%</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-gray-600">Honey Yield</p>
                      <p className="text-amber-600">{hive.honeyYield} kg</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Capacity</span>
                      <span className="text-gray-900">{hive.capacity.toLocaleString()} bees</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Last Update</span>
                      <span className="text-gray-900">{hive.lastUpdate}</span>
                    </div>
                    {hive.tokenId && (
                      <div className="flex justify-between text-gray-600">
                        <span>Token ID</span>
                        <span className="text-gray-900">{hive.tokenId}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '2025-11-09', action: 'Hive data updated', hive: farmerHives[0]?.name },
                { date: '2025-11-08', action: 'Pollination data synced', hive: farmerHives[0]?.name },
                { date: '2025-11-07', action: 'Honey yield recorded', hive: farmerHives[0]?.name },
                { date: '2025-11-05', action: 'Hive inspection completed', hive: farmerHives[0]?.name },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                  <div className="bg-green-100 rounded-full p-2">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-600">{activity.hive}</p>
                    <p className="text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Earnings Info */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <DollarSign className="mr-2 h-5 w-5" />
              Earnings Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue Share</span>
              <span className="text-gray-900">30% of investments</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Earned</span>
              <span className="text-green-600">${farmer.balance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since</span>
              <span className="text-gray-900">{farmer.joinedDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Need Help?
            </CardTitle>
            <CardDescription>Contact Ecolive support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full" asChild>
              <a href={`https://wa.me/254700000000?text=Hello, I need help with my hives - ${farmer.name}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Support
              </a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@ecolive.com">
                Email Support
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
            <DialogDescription>
              Funds will be sent to your M-PESA account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={farmer.balance}
              />
              <p className="text-gray-600">Available balance: ${farmer.balance}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-600">M-PESA Number</p>
              <p className="text-gray-900">{farmer.phone}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdrawRequest}>
              Request Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
