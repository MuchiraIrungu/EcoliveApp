export interface Hive {
  id: string;
  name: string;
  location: string;
  farmerName: string;
  farmerId: string;
  pollinationRate: number;
  honeyYield: number;
  lastUpdate: string;
  status: 'active' | 'maintenance' | 'producing';
  price: number;
  tokenId: string | null;
  capacity: number;
  coordinates?: { lat: number; lng: number };
}

export interface Investment {
  id: string;
  hiveId: string;
  hiveName: string;
  tokenId: string;
  investmentDate: string;
  amount: number;
  currentValue: number;
  pollinationCredits: number;
  honeyYield: number;
  profitPercentage: number;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'transfer' | 'payout';
  hiveId: string;
  hiveName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  txHash: string;
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  assignedHives: string[];
  balance: number;
  joinedDate: string;
}

export const mockHives: Hive[] = [
  {
    id: 'h1',
    name: 'Hive #13',
    location: 'Nakuru County',
    farmerName: 'James Kamau',
    farmerId: 'f1',
    pollinationRate: 87,
    honeyYield: 45,
    lastUpdate: '2025-11-09',
    status: 'producing',
    price: 500,
    tokenId: 'HBR-13-2025',
    capacity: 50000,
    coordinates: { lat: -0.3031, lng: 36.0800 }
  },
  {
    id: 'h2',
    name: 'Hive #24',
    location: 'Kiambu County',
    farmerName: 'Mary Wanjiku',
    farmerId: 'f2',
    pollinationRate: 92,
    honeyYield: 52,
    lastUpdate: '2025-11-08',
    status: 'active',
    price: 500,
    tokenId: 'HBR-24-2025',
    capacity: 50000,
    coordinates: { lat: -1.1714, lng: 36.8315 }
  },
  {
    id: 'h3',
    name: 'Hive #07',
    location: 'Nyeri County',
    farmerName: 'Peter Muthoni',
    farmerId: 'f3',
    pollinationRate: 78,
    honeyYield: 38,
    lastUpdate: '2025-11-10',
    status: 'active',
    price: 500,
    tokenId: null,
    capacity: 50000,
    coordinates: { lat: -0.4197, lng: 36.9471 }
  },
  {
    id: 'h4',
    name: 'Hive #45',
    location: 'Meru County',
    farmerName: 'Grace Njeri',
    farmerId: 'f4',
    pollinationRate: 65,
    honeyYield: 28,
    lastUpdate: '2025-11-05',
    status: 'maintenance',
    price: 500,
    tokenId: 'HBR-45-2025',
    capacity: 50000,
    coordinates: { lat: 0.0469, lng: 37.6490 }
  },
  {
    id: 'h5',
    name: 'Hive #32',
    location: 'Narok County',
    farmerName: 'David Kipchoge',
    farmerId: 'f5',
    pollinationRate: 95,
    honeyYield: 58,
    lastUpdate: '2025-11-09',
    status: 'producing',
    price: 500,
    tokenId: 'HBR-32-2025',
    capacity: 50000,
    coordinates: { lat: -1.0833, lng: 35.8667 }
  },
  {
    id: 'h6',
    name: 'Hive #18',
    location: 'Kajiado County',
    farmerName: 'Sarah Memusi',
    farmerId: 'f6',
    pollinationRate: 82,
    honeyYield: 42,
    lastUpdate: '2025-11-10',
    status: 'active',
    price: 500,
    tokenId: 'HBR-18-2025',
    capacity: 50000,
    coordinates: { lat: -2.0982, lng: 36.7808 }
  }
];

export const mockInvestments: Investment[] = [
  {
    id: 'inv1',
    hiveId: 'h1',
    hiveName: 'Hive #13',
    tokenId: 'HBR-13-2025',
    investmentDate: '2025-09-15',
    amount: 500,
    currentValue: 567,
    pollinationCredits: 125,
    honeyYield: 12.5,
    profitPercentage: 13.4
  },
  {
    id: 'inv2',
    hiveId: 'h2',
    hiveName: 'Hive #24',
    tokenId: 'HBR-24-2025',
    investmentDate: '2025-10-01',
    amount: 500,
    currentValue: 532,
    pollinationCredits: 98,
    honeyYield: 10.8,
    profitPercentage: 6.4
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'purchase',
    hiveId: 'h1',
    hiveName: 'Hive #13',
    amount: 500,
    date: '2025-09-15',
    status: 'completed',
    txHash: '0x7f3c9a8e1b2d4f6e8a0c1b3d5e7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f'
  },
  {
    id: 'tx2',
    type: 'purchase',
    hiveId: 'h2',
    hiveName: 'Hive #24',
    amount: 500,
    date: '2025-10-01',
    status: 'completed',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
  },
  {
    id: 'tx3',
    type: 'payout',
    hiveId: 'h1',
    hiveName: 'Hive #13',
    amount: 67,
    date: '2025-11-01',
    status: 'completed',
    txHash: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e'
  }
];

export const mockFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'James Kamau',
    email: 'james.kamau@example.com',
    phone: '+254712345601',
    region: 'Nakuru',
    assignedHives: ['h1'],
    balance: 450,
    joinedDate: '2025-06-01'
  },
  {
    id: 'f2',
    name: 'Mary Wanjiku',
    email: 'mary.wanjiku@example.com',
    phone: '+254712345602',
    region: 'Kiambu',
    assignedHives: ['h2'],
    balance: 380,
    joinedDate: '2025-06-15'
  },
  {
    id: 'f3',
    name: 'Peter Muthoni',
    email: 'peter.muthoni@example.com',
    phone: '+254712345603',
    region: 'Nyeri',
    assignedHives: ['h3'],
    balance: 290,
    joinedDate: '2025-07-01'
  },
  {
    id: 'f4',
    name: 'Grace Njeri',
    email: 'grace.njeri@example.com',
    phone: '+254712345604',
    region: 'Meru',
    assignedHives: ['h4'],
    balance: 520,
    joinedDate: '2025-05-20'
  },
  {
    id: 'f5',
    name: 'David Kipchoge',
    email: 'david.kipchoge@example.com',
    phone: '+254712345605',
    region: 'Narok',
    assignedHives: ['h5'],
    balance: 610,
    joinedDate: '2025-06-10'
  },
  {
    id: 'f6',
    name: 'Sarah Memusi',
    email: 'sarah.memusi@example.com',
    phone: '+254712345606',
    region: 'Kajiado',
    assignedHives: ['h6'],
    balance: 340,
    joinedDate: '2025-07-15'
  }
];
