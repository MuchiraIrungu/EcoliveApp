import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockInvestments } from '../../lib/mock-data';
import { DollarSign, TrendingUp, Award } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

export function InvestorManagement() {
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);
  const [payoutAmount, setPayoutAmount] = useState('');

  // Group investments by investor (using token ID as a proxy)
  const investorData = mockInvestments.reduce((acc, inv) => {
    const investor = inv.tokenId.split('-')[0]; // Simple grouping
    if (!acc[investor]) {
      acc[investor] = {
        id: investor,
        email: `investor${Math.random().toString(36).substr(2, 5)}@example.com`,
        totalInvested: 0,
        totalValue: 0,
        investments: [],
        credits: 0,
      };
    }
    acc[investor].totalInvested += inv.amount;
    acc[investor].totalValue += inv.currentValue;
    acc[investor].credits += inv.pollinationCredits;
    acc[investor].investments.push(inv);
    return acc;
  }, {} as Record<string, any>);

  const investors = Object.values(investorData);

  const handleSimulatePayout = () => {
    const amount = parseFloat(payoutAmount);
    if (amount > 0) {
      toast.success('Payout simulated successfully!', {
        description: `$${amount} payout recorded for investment`
      });
      setShowPayoutDialog(false);
      setPayoutAmount('');
      setSelectedInvestment(null);
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Investors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{investors.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              ${mockInvestments.reduce((sum, inv) => sum + inv.amount, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">
              ${mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Credits Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              {mockInvestments.reduce((sum, inv) => sum + inv.pollinationCredits, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investor Overview</CardTitle>
          <CardDescription>View all investors and their portfolio holdings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Investments</TableHead>
                <TableHead>Total Invested</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investors.map((investor) => {
                const returnAmount = investor.totalValue - investor.totalInvested;
                const returnPercent = ((returnAmount / investor.totalInvested) * 100).toFixed(1);

                return (
                  <TableRow key={investor.id}>
                    <TableCell className="text-gray-900">{investor.id}</TableCell>
                    <TableCell className="text-gray-600">{investor.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{investor.investments.length} hives</Badge>
                    </TableCell>
                    <TableCell className="text-gray-900">${investor.totalInvested}</TableCell>
                    <TableCell className="text-gray-900">${investor.totalValue}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <TrendingUp className={`h-4 w-4 mr-1 ${parseFloat(returnPercent) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={parseFloat(returnPercent) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {parseFloat(returnPercent) >= 0 ? '+' : ''}{returnPercent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-green-600" />
                        {investor.credits}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Investment Details */}
      <Card>
        <CardHeader>
          <CardTitle>All Investments</CardTitle>
          <CardDescription>Detailed view of individual investments and payout management</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment ID</TableHead>
                <TableHead>Hive</TableHead>
                <TableHead>Token ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvestments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="text-gray-900">{investment.id}</TableCell>
                  <TableCell className="text-gray-900">{investment.hiveName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{investment.tokenId}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{investment.investmentDate}</TableCell>
                  <TableCell className="text-gray-900">${investment.amount}</TableCell>
                  <TableCell className="text-gray-900">${investment.currentValue}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      <Award className="h-3 w-3 mr-1" />
                      {investment.pollinationCredits}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedInvestment(investment.id);
                        setShowPayoutDialog(true);
                      }}
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      Payout
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payout Dialog */}
      <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simulate Payout</DialogTitle>
            <DialogDescription>
              Record a payout for honey sale or pollination credits
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600">
                Investment ID: {selectedInvestment}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payout-amount">Payout Amount (USD)</Label>
              <Input
                id="payout-amount"
                type="number"
                placeholder="0.00"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
              />
            </div>
            <p className="text-gray-600">
              This will record the payout on the blockchain and update investor balances.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSimulatePayout}>
              <DollarSign className="mr-2 h-4 w-4" />
              Simulate Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
