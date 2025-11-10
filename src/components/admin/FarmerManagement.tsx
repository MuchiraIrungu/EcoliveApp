import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { mockFarmers, mockHives, Farmer } from '../../lib/mock-data';
import { Plus, Mail, Phone, MapPin, Hexagon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function FarmerManagement() {
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const [newFarmer, setNewFarmer] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
  });

  const handleAddFarmer = () => {
    if (!newFarmer.name || !newFarmer.email || !newFarmer.phone || !newFarmer.region) {
      toast.error('Please fill all fields');
      return;
    }

    const farmer: Farmer = {
      id: `f${farmers.length + 1}`,
      name: newFarmer.name,
      email: newFarmer.email,
      phone: newFarmer.phone,
      region: newFarmer.region,
      assignedHives: [],
      balance: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setFarmers([...farmers, farmer]);
    toast.success('Farmer added successfully!');
    setShowAddDialog(false);
    setNewFarmer({ name: '', email: '', phone: '', region: '' });
  };

  const getFarmerHives = (farmerId: string) => {
    return mockHives.filter(h => h.farmerId === farmerId);
  };

  const getFarmerPerformance = (farmerId: string) => {
    const hives = getFarmerHives(farmerId);
    if (hives.length === 0) return 0;
    const avgPollination = hives.reduce((sum, h) => sum + h.pollinationRate, 0) / hives.length;
    return Math.round(avgPollination);
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Farmer
        </Button>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmers.map((farmer) => {
          const hives = getFarmerHives(farmer.id);
          const performance = getFarmerPerformance(farmer.id);

          return (
            <Card key={farmer.id} className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedFarmer(farmer);
                setShowDetailsDialog(true);
              }}
            >
              <CardHeader>
                <CardTitle>{farmer.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {farmer.region}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{farmer.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{farmer.phone}</span>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Assigned Hives</span>
                    <Badge variant="secondary">
                      <Hexagon className="h-3 w-3 mr-1" />
                      {hives.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Performance</span>
                    <Badge variant={performance >= 80 ? 'default' : 'secondary'}>
                      {performance}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Balance</span>
                    <span className="text-green-600">${farmer.balance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Farmer Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Farmer</DialogTitle>
            <DialogDescription>Add a new farmer to the Ecolive platform</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="farmer-name">Full Name</Label>
              <Input
                id="farmer-name"
                placeholder="John Doe"
                value={newFarmer.name}
                onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmer-email">Email</Label>
              <Input
                id="farmer-email"
                type="email"
                placeholder="john@example.com"
                value={newFarmer.email}
                onChange={(e) => setNewFarmer({ ...newFarmer, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmer-phone">Phone Number</Label>
              <Input
                id="farmer-phone"
                placeholder="+254712345678"
                value={newFarmer.phone}
                onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmer-region">Region</Label>
              <Input
                id="farmer-region"
                placeholder="Nakuru County"
                value={newFarmer.region}
                onChange={(e) => setNewFarmer({ ...newFarmer, region: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFarmer}>Add Farmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Farmer Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedFarmer?.name}</DialogTitle>
            <DialogDescription>Farmer details and performance</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="text-gray-900">{selectedFarmer?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="text-gray-900">{selectedFarmer?.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Region</p>
                <p className="text-gray-900">{selectedFarmer?.region}</p>
              </div>
              <div>
                <p className="text-gray-600">Joined Date</p>
                <p className="text-gray-900">{selectedFarmer?.joinedDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Balance</p>
                <p className="text-green-600">${selectedFarmer?.balance}</p>
              </div>
              <div>
                <p className="text-gray-600">Performance</p>
                <p className="text-gray-900">{getFarmerPerformance(selectedFarmer?.id || '')}%</p>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-3">Assigned Hives</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hive</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pollination</TableHead>
                    <TableHead>Yield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFarmerHives(selectedFarmer?.id || '').map((hive) => (
                    <TableRow key={hive.id}>
                      <TableCell className="text-gray-900">{hive.name}</TableCell>
                      <TableCell className="text-gray-600">{hive.location}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{hive.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">{hive.pollinationRate}%</TableCell>
                      <TableCell className="text-gray-900">{hive.honeyYield} kg</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
