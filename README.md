EcoliveApp

**Live Demo:** [https://ecolive.vercel.app](https://ecolive.vercel.app)

EcoliveApp is a sustainability platform built on the Hedera network that tokenizes real beehives, enables transparent hive investments, and streams real-time pollination data on-chain. It connects investors, farmers, and environmental data through Hedera NFTs, consensus records, and IPFS metadata — ensuring trust, transparency, and measurable ecological impact.

---

## Features

- **Tokenization** of real Kenyan beehives into 1:1 Hedera NFTs
- **Instant hive purchase** with NFT mint + transfer
- **Permanent IPFS metadata** (images, farmer info, GPS location)
- **Marketplace** with race-condition protection using Mirror Node checks
- **Investor dashboard** to browse, filter, and inspect hive stats
- **On-chain ownership verification** via HashScan
- **Admin panel** for creating NFT collections & minting hives
- **Secure backend** with health-checked API endpoints
- **Investor portfolio view** (in progress)

---

## Tech Stack

### Blockchain
- Hedera Hashgraph Testnet
- Hedera Token Service (HTS)
- Mirror Node API
- IPFS (Pinata)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Hedera JavaScript SDK
- Django REST API

### Storage
- IPFS (Pinata)
- JSON / LocalStorage
- Migrating to PostgreSQL / Supabase

### Deployment
- Vercel (Frontend)
- Render / Railway / Fly.io (Backend)

---

## Installation

### Prerequisites

| Tool | Minimum Version | Link |
|------|----------------|------|
| Node.js | 18.x or 20.x (LTS) | [Download](https://nodejs.org) |
| Git | Latest | [Download](https://git-scm.com) |
| Hedera Testnet Account | 100+ test HBAR | [Portal](https://portal.hedera.com) |
| Pinata Account | Free tier | [Sign Up](https://pinata.cloud) |

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MuchiraIrungu/EcoliveApp.git
   cd EcoliveApp
   ```

2. **Install Hedera backend dependencies**
   ```bash
   cd hedera-backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../ecolivefrontend
   npm install
   ```

4. **Install Django backend dependencies**
   ```bash
   cd ../backend
   python3 -m venv your_env
   source your_env/bin/activate  # On Windows: your_env\Scripts\activate
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   
   Create a `.env` file in `hedera-backend/`:
   ```env
   MY_ACCOUNT_ID=your_hedera_account_id
   MY_PRIVATE_KEY=your_hedera_private_key
   VITE_WALLETCONNECT_PROJECT_ID=c82768b1bb075d3f3a47863823d27c84
   PINATA_JWT =                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4Y2M2ZmJlNS05Njk0LTQzZDgtODNmYy05NzZjYjYwMWQ0NzQiLCJlbWFpbCI6ImNtdWNoaXJhaXJ1bmd1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyNDJhNTg3YzYyZDdhOTlhZDFmZSIsInNjb3BlZEtleVNlY3JldCI6ImQyMjdmNDI2OTJhMDUzYTU4OWNiYmRhNTI1YjRlMDg5NmM4NzllMWZmNGYzZmY5YjA0YjNmMzZkYTAzNjY5MjIiLCJleHAiOjE3OTQ4Nzc1NTF9.mj21cOHnMGQ887xMdpGd459zjGVYPwA19nZ7g22JDNs
   PINATA_GATEWAY=https://gateway.pinata.cloud
   ```

### Running the Application

**Hedera Backend**
```bash
cd hedera-backend
npm run start
```

**Frontend**
```bash
cd ecolivefrontend
npm run dev
```

**Django Backend**
```bash
cd backend
python manage.py runserver
```

---

## Usage

### Access Points
- **Frontend:** http://localhost:3000/auth
- **Hedera Backend API:** http://localhost:3001

### 1. Create NFT Collection (One-time setup)

1. Navigate to http://localhost:3000/login-page
2. Login with admin credentials
3. Open Admin Panel → Hives → Create Token Collection
4. Wait ~10 seconds for completion
5. Your `tokenId`, `supplyKey`, and `adminKey` are saved in localStorage

### 2. Tokenize Hives

1. Go to Admin Panel → Hives → Tokenize
2. The system reads `data/hives.json`
3. Mints one NFT per hive
4. Uploads metadata to IPFS
5. Hives appear in the marketplace

### 3. Buy a Hive (Investor)

1. Navigate to http://localhost:3000/auth
2. Connect your Hedera testnet wallet (HashPack, Blade, etc.)
3. Browse marketplace
4. Click "Buy Now" on any hive
5. Receive NFT transfer to your wallet
6. View ownership on [HashScan](https://hashscan.io/testnet/)

---

## Project Structure

```
ecolivedashboard/
├── Ecolivefrontend/              # React + TypeScript Frontend
│   ├── build/                    # Production build
│   ├── dist/                     # Vite build output
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/            # Admin portal UI
│   │   │   ├── farmer/           # Farmer portal UI
│   │   │   ├── investor/         # Investor portal UI
│   │   │   ├── portals/          # Auth / routing
│   │   │   ├── shared/           # Shared components
│   │   │   └── ui/               # UI library
│   │   ├── lib/                  # Utilities
│   │   ├── styles/               # Global CSS
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Django REST API
│   ├── Ecolive/
│   │   ├── Accounts/
│   │   ├── Admin/
│   │   ├── Farmer/
│   │   ├── Hives/
│   │   └── Investor/
│
└── hedera-backend/               # Hedera Node backend
    ├── src/
    ├── .env.example
    └── package.json
```

---

## Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/EcoliveApp.git
   cd EcoliveApp
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add tests for new features
   - Update documentation as needed

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new carbon calculation method"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

### Commit Message Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

### Reporting Issues

Found a bug or have a feature request? Please:
- Check existing issues first
- Create a new issue with:
  - Clear title and description
  - Steps to reproduce (for bugs)
  - Expected vs actual behavior
  - Screenshots (if applicable)
  - Environment details

---

## License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2025 Muchira Irungu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

**Muchira Irungu**
- GitHub: [@MuchiraIrungu](https://github.com/MuchiraIrungu)
- Email: cmuchirairungu063@gmail.com
- LinkedIn: [Muchira Irungu](https://www.linkedin.com/in/muchira-irungu)

---

## Support

If you find this project helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others interested in sustainability

**Made with 💚 for a sustainable future**
