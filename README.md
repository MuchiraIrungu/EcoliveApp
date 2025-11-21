EcoliveApp

Live Demo: https://ecolive.vercel.app

EcoliveApp is a sustainability platform built on the Hedera network that tokenizes real beehives, enables transparent hive investments, and streams real-time pollination data on-chain.
It connects investors, farmers, and environmental data through Hedera NFTs, consensus records, and IPFS metadata — ensuring trust, transparency, and measurable ecological impact.

⚡ FEATURES

Tokenization of real Kenyan beehives into 1:1 Hedera NFTs

Instant hive purchase with NFT mint + transfer

Permanent IPFS metadata (images, farmer info, GPS location)

Marketplace with race-condition protection using Mirror Node checks

Investor dashboard to browse, filter, and inspect hive stats

On-chain ownership verification via HashScan

Admin panel for creating NFT collections & minting hives

Secure backend with health-checked API endpoints

Investor portfolio view (in progress)

🛠️ TECH STACK
Blockchain

Hedera Hashgraph Testnet

Hedera Token Service (HTS)

Mirror Node API

IPFS (Pinata)

Frontend

React

TypeScript

Tailwind CSS

Vite

Backend

Node.js

Express

Hedera JavaScript SDK

Storage

IPFS (Pinata)

JSON / LocalStorage

Migrating to PostgreSQL / Supabase soon

Deployment

Vercel (Frontend)

Render / Railway / Fly.io (Backend)

📥 INSTALLATION GUIDE
Required Tools
Tool	Minimum Version	Link
Node.js	18.x or 20.x (LTS)	https://nodejs.org

Git	Latest	https://git-sciley.com

Hedera Testnet Account	100+ test HBAR	https://portal.hedera.com

Pinata Account	Free tier OK	https://pinata.cloud
Step-by-Step Installation
1. Clone the repository
git clone https://github.com/MuchiraIrungu/EcoliveApp.git
cd EcoliveApp

2. Install Hedera backend dependencies
cd hedera-backend
npm install

3. Install frontend dependencies
cd ../ecolivefrontend
npm install

4. Install Django backend dependencies
cd ../backend
python3 -m venv your_env
source your_env/bin/activate
pip install -r requirements.txt

5. Create your .env in hedera-backend
MY_ACCOUNT_ID=  
MY_PRIVATE_KEY=  
VITE_WALLETCONNECT_PROJECT_ID=c82768b1bb075d3f3a47863823d27c84
PINATA_JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4Y2M2ZmJlNS05Njk0LTQzZDgtODNmYy05NzZjYjYwMWQ0NzQiLCJlbWFpbCI6ImNtdWNoaXJhaXJ1bmd1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyNDJhNTg3YzYyZDdhOTlhZDFmZSIsInNjb3BlZEtleVNlY3JldCI6ImQyMjdmNDI2OTJhMDUzYTU4OWNiYmRhNTI1YjRlMDg5NmM4NzllMWZmNGYzZmY5YjA0YjNmMzZkYTAzNjY5MjIiLCJleHAiOjE3OTQ4Nzc1NTF9.mj21cOHnMGQ887xMdpGd459zjGVYPwA19nZ7g22JDNs
PINATA_GATEWAY=https://gateway.pinata.cloud

Running the Application
Hedera Backend (Node)
npm run start

Frontend (React)
npm run dev

Django Backend
python manage.py runserver

🚀 USAGE INSTRUCTIONS
Access the app

Frontend: http://localhost:3000/auth

Hedera Backend API: http://localhost:3001

1. Create NFT Collection (One-time setup)

Go to: http://localhost:3000/login-page

Login with:

Email: cmuchirairungu@gmail.com

Password: @Muchira84

Open Admin Panel → Hives → Create Token Collection

Wait ~10 seconds

Your tokenId, supplyKey, and adminKey are saved in localStorage

These will be used for all future minting and purchases.

2. Tokenize Your First Hives

Go to Admin Panel → Hives → Tokenize

The system reads data/hives.json

Mints one NFT per hive

Uploads metadata to IPFS

Sends NFTs to treasury

They now appear in the marketplace.

3. Buy a Hive (Investor)

Go to: http://localhost:3000/auth

Connect any Hedera testnet wallet (HashPack, Blade, etc.)

Browse marketplace

Click Buy Now on any hive

You’ll receive:

NFT transfer to your wallet

Instant visibility on HashScan: https://hashscan.io/testnet/

📂 FOLDER STRUCTURE

(Your structure is excellent — I only improved formatting.)

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
│   ├── vercel.json
│   └── vite.config.ts
│
├── backend/                      # Django REST API
│   ├── Ecolive/
│   │   ├── Accounts/
│   │   ├── Admin/
│   │   ├── Farmer/
│   │   ├── Hives/
│   │   ├── Investor/
│   │   └── settings...
│
└── hedera-backend/               # Hedera Node backend
    ├── node_modules/
    ├── src/
    ├── .env.example
    └── package.json


Contributing

We welcome contributions from the community! Here's how you can help:

How to Contribute

Fork the repository on GitHub.

Clone your fork:

git clone https://github.com/YOUR_USERNAME/EcoliveApp.git
cd EcoliveApp


Create a new branch:

git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix


Make your changes

Follow the existing code style

Write clear commit messages

Add tests for new features

Update documentation as needed

Commit your changes

git add .
git commit -m "feat: add new carbon calculation method"


Push to your fork

git push origin feature/your-feature-name


Create a Pull Request

Go to the original repository

Click New Pull Request

Provide a clear description of your changes

Commit Message Convention

feat: New feature

fix: Bug fix

docs: Documentation changes

style: Code formatting

refactor: Code refactoring

test: Adding/updating tests

chore: Maintenance tasks

Code of Conduct

Please read our Code of Conduct before contributing. We are committed to providing a welcoming and inclusive environment for all contributors.
Code of Conduct
Please read our Code of Conduct before contributing. We are committed to providing a welcoming and inclusive environment for all contributors.
Reporting Issues
Found a bug? Have a feature request? Please check existing issues first, then create a new issue with:

Clear title and description
Steps to reproduce (for bugs)
Expected vs actual behavior
Screenshots (if applicable)
Your environment details


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
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

Author(s) / Credits
Lead Developer
Muchira Irungu

GitHub: @MuchiraIrungu
Email: cmuchirairungu063@gmail.com
LinkedIn: www.linkedin.com/in/muchira-irungu


Contributors
A huge thank you to all the contributors who have helped make this project better!
View the full list of contributors here.
Special Thanks

Carbon footprint calculation methodology based on EPA Guidelines
UI/UX inspiration from leading sustainability platforms
Open-source community for amazing tools and libraries

Support
If you find this project helpful, consider:

- Starring the repository
- Reporting bugs
- Suggesting new features
- Sharing with others interested in sustainability


Contact & Support

Documentation: Wiki
Issues: GitHub Issues
Discussions: GitHub Discussions
Email: support@ecoliveapp.com



Made with 💚 for a sustainable future
