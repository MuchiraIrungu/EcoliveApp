import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, Wallet, TrendingUp, History, ShoppingCart } from 'lucide-react';
import { HiveMarketplace } from './investor/HiveMarketplace';
import { Portfolio } from './investor/Portfolio';
import { TransactionHistory } from './investor/TransactionHistory';
import { mockInvestments, mockTransactions } from '../lib/mock-data';
import { toast } from 'sonner@2.0.3';

interface InvestorPortalProps {
  user: User;
  onLogout: () => void;
}

export function InvestorPortal({ user, onLogout }: InvestorPortalProps) {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [investments, setInvestments] = useState(mockInvestments);
  const [transactions, setTransactions] = useState(mockTransactions);

  const handleInvest = (hiveId: string, hiveName: string, amount: number) => {
    // Create new investment
    const newInvestment = {
      id: `inv${Date.now()}`,
      hiveId,
      hiveName,
      tokenId: `HBR-${hiveId.substring(1)}-2025`,
      investmentDate: new Date().toISOString().split('T')[0],
      amount,
      currentValue: amount,
      pollinationCredits: 0,
      honeyYield: 0,
      profitPercentage: 0
    };

    // Create transaction
    const newTransaction = {
      id: `tx${Date.now()}`,
      type: 'purchase' as const,
      hiveId,
      hiveName,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed' as const,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`
    };

    setInvestments([...investments, newInvestment]);
    setTransactions([newTransaction, ...transactions]);
    
    toast.success(`You've successfully invested in ${hiveName}!`, {
      description: `Token ID: ${newInvestment.tokenId}`
    });

    setActiveTab('portfolio');
  };

  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = totalValue - totalInvested;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-green-800">Ecolive Investor Portal</h1>
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

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Invested</p>
                <p className="text-gray-900">${totalInvested}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Current Value</p>
                <p className="text-gray-900">${totalValue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Returns</p>
                <p className={totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${totalReturn >= 0 ? '+' : ''}{totalReturn}
                </p>
              </div>
              <History className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <HiveMarketplace onInvest={handleInvest} />
          </TabsContent>

          <TabsContent value="portfolio">
            <Portfolio investments={investments} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
