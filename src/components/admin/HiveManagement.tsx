import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { mockHives, mockFarmers, Hive } from '../../lib/mock-data';
import { Plus, Coins, Upload, MapPin, Activity, Droplet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner@2.0.3';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function HiveManagement() {
  const [hives, setHives] = useState<Hive[]>(mockHives);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTokenizeDialog, setShowTokenizeDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);

  // Form states
  const [newHive, setNewHive] = useState({
    name: '',
    location: '',
    farmerId: '',
    capacity: 50000,
  });

  const [updateData, setUpdateData] = useState({
    pollinationRate: 0,
    honeyYield: 0,
  });

  const handleAddHive = () => {
    if (!newHive.name || !newHive.location || !newHive.farmerId) {
      toast.error('Please fill all fields');
      return;
    }

    const farmer = mockFarmers.find(f => f.id === newHive.farmerId);
    const hive: Hive = {
      id: `h${hives.length + 1}`,
      name: newHive.name,
      location: newHive.location,
      farmerName: farmer?.name || 'Unknown',
      farmerId: newHive.farmerId,
      pollinationRate: 0,
      honeyYield: 0,
      lastUpdate: new Date().toISOString().split('T')[0],
      status: 'active',
      price: 500,
      tokenId: null,
      capacity: newHive.capacity,
    };

    setHives([...hives, hive]);
    toast.success('Hive added successfully!');
    setShowAddDialog(false);
    setNewHive({ name: '', location: '', farmerId: '', capacity: 50000 });
  };

  const handleTokenize = () => {
    if (!selectedHive) return;

    const tokenId = `HBR-${selectedHive.id.substring(1)}-2025`;
    const updatedHives = hives.map(h =>
      h.id === selectedHive.id ? { ...h, tokenId } : h
    );

    setHives(updatedHives);
    toast.success(`Hive tokenized successfully!`, {
      description: `Token ID: ${tokenId}`
    });
    setShowTokenizeDialog(false);
    setSelectedHive(null);
  };

  const handleRecordUpdate = () => {
    if (!selectedHive) return;

    const updatedHives = hives.map(h =>
      h.id === selectedHive.id
        ? {
            ...h,
            pollinationRate: updateData.pollinationRate,
            honeyYield: updateData.honeyYield,
            lastUpdate: new Date().toISOString().split('T')[0],
          }
        : h
    );

    setHives(updatedHives);
    toast.success('Data update recorded on Hedera Consensus Service!');
    setShowUpdateDialog(false);
    setSelectedHive(null);
    setUpdateData({ pollinationRate: 0, honeyYield: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'producing':
        return 'bg-green-500';
      case 'active':
        return 'bg-blue-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Hive
        </Button>
      </div>

      {/* Hives Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Hives</CardTitle>
          <CardDescription>Manage and monitor all beehives in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Pollination</TableHead>
                <TableHead>Honey Yield</TableHead>
                <TableHead>Token ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hives.map((hive) => (
                <TableRow key={hive.id}>
                  <TableCell>
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(hive.status)}`} />
                  </TableCell>
                  <TableCell className="text-gray-900">{hive.name}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hive.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{hive.farmerName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Activity className="h-3 w-3 mr-1 text-blue-600" />
                      {hive.pollinationRate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Droplet className="h-3 w-3 mr-1 text-amber-600" />
                      {hive.honeyYield} kg
                    </div>
                  </TableCell>
                  <TableCell>
                    {hive.tokenId ? (
                      <Badge variant="secondary">{hive.tokenId}</Badge>
                    ) : (
                      <Badge variant="outline">Not tokenized</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {!hive.tokenId && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedHive(hive);
                            setShowTokenizeDialog(true);
                          }}
                        >
                          <Coins className="h-3 w-3 mr-1" />
                          Tokenize
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedHive(hive);
                          setUpdateData({
                            pollinationRate: hive.pollinationRate,
                            honeyYield: hive.honeyYield,
                          });
                          setShowUpdateDialog(true);
                        }}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Hive Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Hive</DialogTitle>
            <DialogDescription>Create a new beehive in the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hive-name">Hive Name</Label>
              <Input
                id="hive-name"
                placeholder="Hive #01"
                value={newHive.name}
                onChange={(e) => setNewHive({ ...newHive, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Nakuru County"
                value={newHive.location}
                onChange={(e) => setNewHive({ ...newHive, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmer">Assign to Farmer</Label>
              <Select value={newHive.farmerId} onValueChange={(value) => setNewHive({ ...newHive, farmerId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select farmer" />
                </SelectTrigger>
                <SelectContent>
                  {mockFarmers.map((farmer) => (
                    <SelectItem key={farmer.id} value={farmer.id}>
                      {farmer.name} - {farmer.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (bees)</Label>
              <Input
                id="capacity"
                type="number"
                value={newHive.capacity}
                onChange={(e) => setNewHive({ ...newHive, capacity: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddHive}>Add Hive</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tokenize Dialog */}
      <Dialog open={showTokenizeDialog} onOpenChange={setShowTokenizeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tokenize Hive</DialogTitle>
            <DialogDescription>
              Create a Hedera token for {selectedHive?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <p className="text-gray-600">Hive: {selectedHive?.name}</p>
              <p className="text-gray-600">Location: {selectedHive?.location}</p>
              <p className="text-gray-600">Farmer: {selectedHive?.farmerName}</p>
              <p className="text-gray-900">
                Token ID: HBR-{selectedHive?.id.substring(1)}-2025
              </p>
            </div>
            <p className="text-gray-600">
              This will create a new token on Hedera and make the hive available for investment.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTokenizeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleTokenize}>
              <Coins className="mr-2 h-4 w-4" />
              Create Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Data Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Data Update</DialogTitle>
            <DialogDescription>
              Update data for {selectedHive?.name} on Hedera Consensus Service
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pollination">Pollination Rate (%)</Label>
              <Input
                id="pollination"
                type="number"
                min="0"
                max="100"
                value={updateData.pollinationRate}
                onChange={(e) =>
                  setUpdateData({ ...updateData, pollinationRate: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="honey">Honey Yield (kg)</Label>
              <Input
                id="honey"
                type="number"
                min="0"
                value={updateData.honeyYield}
                onChange={(e) =>
                  setUpdateData({ ...updateData, honeyYield: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRecordUpdate}>
              <Upload className="mr-2 h-4 w-4" />
              Record Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
