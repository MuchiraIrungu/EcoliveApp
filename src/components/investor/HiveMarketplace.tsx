import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockHives } from '../../lib/mock-data';
import { MapPin, Activity, Droplet, Clock, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface HiveMarketplaceProps {
  onInvest: (hiveId: string, hiveName: string, amount: number) => void;
}

export function HiveMarketplace({ onInvest }: HiveMarketplaceProps) {
  const [selectedHive, setSelectedHive] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const hive = mockHives.find(h => h.id === selectedHive);

  const handleInvestClick = (hiveId: string) => {
    setSelectedHive(hiveId);
    setShowConfirmDialog(true);
  };

  const confirmInvestment = () => {
    if (hive) {
      onInvest(hive.id, hive.name, hive.price);
      setShowConfirmDialog(false);
      setSelectedHive(null);
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

  const availableHives = mockHives.filter(h => h.tokenId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Hives</CardTitle>
          <CardDescription>
            Browse and invest in tokenized beehives. Each investment represents ownership in a productive hive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableHives.map((hive) => (
              <Card key={hive.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{hive.name}</CardTitle>
                    <Badge className={getStatusColor(hive.status)}>
                      {hive.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hive.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center">
                        <Activity className="h-4 w-4 mr-2" />
                        Pollination Rate
                      </span>
                      <span className="text-gray-900">{hive.pollinationRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2" />
                        Honey Yield
                      </span>
                      <span className="text-gray-900">{hive.honeyYield} kg</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Last Update
                      </span>
                      <span className="text-gray-900">{hive.lastUpdate}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Farmer</span>
                      <span className="text-gray-900">{hive.farmerName}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Token ID</span>
                      <span className="text-gray-900">{hive.tokenId}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600">Investment Price</span>
                      <span className="text-green-600">${hive.price}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleInvestClick(hive.id)}
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Invest Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Investment</DialogTitle>
            <DialogDescription>
              You are about to invest in {hive?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Hive</span>
              <span className="text-gray-900">{hive?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location</span>
              <span className="text-gray-900">{hive?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Farmer</span>
              <span className="text-gray-900">{hive?.farmerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Token ID</span>
              <span className="text-gray-900">{hive?.tokenId}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-gray-900">Investment Amount</span>
              <span className="text-green-600">${hive?.price}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmInvestment}>
              Confirm & Invest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
