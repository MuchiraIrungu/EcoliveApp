import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Transaction } from '../../lib/mock-data';
import { ArrowUpRight, ArrowDownLeft, DollarSign, ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'payout':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'transfer':
        return <DollarSign className="h-4 w-4 text-purple-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'bg-blue-100 text-blue-800';
      case 'payout':
        return 'bg-green-100 text-green-800';
      case 'transfer':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const viewTransaction = (txHash: string) => {
    window.open(`https://hashscan.io/testnet/transaction/${txHash}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          All your hive token purchases, transfers, and payouts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Hive</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {getTransactionIcon(tx.type)}
                          <Badge className={`ml-2 ${getTypeColor(tx.type)}`}>
                            {tx.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{tx.hiveName}</TableCell>
                      <TableCell className={tx.type === 'payout' ? 'text-green-600' : 'text-gray-900'}>
                        {tx.type === 'payout' ? '+' : '-'}${tx.amount}
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewTransaction(tx.txHash)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {transactions.map((tx) => (
                <Card key={tx.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getTransactionIcon(tx.type)}
                          <Badge className={`ml-2 ${getTypeColor(tx.type)}`}>
                            {tx.type}
                          </Badge>
                        </div>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hive</span>
                        <span className="text-gray-900">{tx.hiveName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className={tx.type === 'payout' ? 'text-green-600' : 'text-gray-900'}>
                          {tx.type === 'payout' ? '+' : '-'}${tx.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="text-gray-900">{tx.date}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => viewTransaction(tx.txHash)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Hedera
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
