EcoliveApp

Links: ecolive.vercel.app

Short Description
EcoliveApp is a sustainability platform built on the Hedera network that tokenizes beehives, enables transparent hive investments, and tracks real-time pollination data on-chain.
It connects investors, farmers, and environmental data through secure Hedera-based tokens and consensus records — ensuring trust, transparency, and measurable ecological impact.

#----------------#
FEATURES
#----------------#

Tokenizes real Kenyan beehives into Hedera NFTs (1:1 representation).
Instant on-chain hive purchase with NFT mint + transfer.
Permanent IPFS metadata storage (images, farmer info, location).
Marketplace protected from race-conditions using mirror node checks.
Investor dashboard to browse, filter, and view hive stats.
On-chain ownership verification through HashScan.
Admin panel to create NFT collections and mint new hives.
Health-checked backend with secure API endpoints.
Portfolio view for investors (in progress).

#----------------#
TECH STACK
#----------------#

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
JSON / LocalStorage (moving to PostgreSQL/Supabase)

Deployment

Vercel (Frontend)
Render / Railway / Fly.io (Backend)

#------------------#
INSTALLATION GUIDE
#------------------#
Tools

Node.js
Minimum Version: 18.x or 20.x (LTS)
Link: https://nodejs.org

Git
Minimum Version: Latest
Link: https://git-sciley.com

Hedera Testnet Account
Requirement: At least 100 test HBAR
Link: https://portal.hedera.com

Pinata Account
Requirement: Free tier is OK (for IPFS metadata)
Link: https://pinata.cloud


Step-by-step Installation
1.Step-by-Step Installation

Clone the repository

    git clone https://github.com/MuchiraIrungu/EcoliveApp.git
     cd EcoliveApp

Install hedera-backend dependencies

  cd hedera-backend
   npm install

Install frontend dependencies

   cd ecolivefrontend
   npm install

Install Django dependencies
   cd backend
   python3 -m venv your_env
   pip install -r requirements.txt

Create an .env file in the hedera-backend folder that will hold testnet account for the following 
MY_ACCOUNT_ID = 
MY_PRIVATE_KEY = 
VITE_WALLETCONNECT_PROJECT_ID=c82768b1bb075d3f3a47863823d27c84
PINATA_JWT = 
PINATA_GATEWAY=https://gateway.pinata.cloud

  To run the application
  For hedera-backend
     npm run start 
     
  For the frontend
    npm run dev
  
  For backend
    python manage.py run server
    
#-----------------#
USAGE INSTRUCTIONS
#------------------#
Access the application

Frontend: http://localhost:3000/auth
Backend API(hedera-backend): http://localhost:3001


Create Your NFT Collection (One-Time Setup)

Open the frontend → http://localhost:3000/login-page
Go to Admin Panel 
Login using (email = cmuchirairungu@gmail.com, password = @Muchira84)
Click "Create Token Collection" in Hives
Wait ~10 seconds
Success! → Your tokenId, supplyKey, and adminKey are automatically saved to localStorage

These keys are now used for all future minting & buying.

Tokenize Your First Hives

In the Admin Panel → Go to Hives Click "Tokenize"
It will read from data/hives.json and mint one NFT per available hive
Each NFT goes to treasury with IPFS metadata
Done! They now appear in the marketplace

Buy a Hive (Test with Any Wallet)
You can now:

Got to the investor login page (http://localhost:3000/auth)
Connect any Hedera testnet wallet (HashPack, Blade, etc.)

Browse the marketplace
Click any hive → “Buy Now”
NFT is minted + transferred directly to your wallet
View it instantly on https://hashscan.io/testnet/

#-----------------#
FOLDER STRUCTURE
#-----------------#

ecolivedashboard/
├── Ecolivefrontend/                    # React + TypeScript Frontend
│   ├── build/                          # Production build output
│   ├── dist/                           # Vite build output
│   ├── frontend/                       # Legacy frontend files
│   ├── node_modules/                   # Node dependencies
│   ├── public/                         # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/                  # Admin portal components
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── FarmersManagement.tsx
│   │   │   │   ├── HivesManagement.tsx
│   │   │   │   └── PaymentsManagement.tsx
│   │   │   ├── farmer/                 # Farmer portal components
│   │   │   │   ├── FarmerEarnings.tsx
│   │   │   │   ├── FarmerHome.tsx
│   │   │   │   ├── FarmerHiveDetail.tsx
│   │   │   │   ├── FarmerLoginPage.tsx
│   │   │   │   └── SubmitUpdate.tsx
│   │   │   ├── figma/                  # Design system components
│   │   │   ├── investor/               # Investor portal components
│   │   │   ├── portals/                # Portal routing components
│   │   │   ├── shared/                 # Shared/common components
│   │   │   └── ui/                     # UI library components
│   │   ├── lib/                        # Utility libraries
│   │   ├── styles/                     # Global styles
│   │   ├── App.tsx                     # Main application component
│   │   ├── Attributions.md             # Third-party attributions
│   │   ├── env.d.ts                    # TypeScript environment types
│   │   ├── index.css                   # Global CSS
│   │   └── main.tsx                    # Application entry point
│   ├── .gitignore
│   ├── index.html                      # HTML template
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json
│   ├── README.md
│   ├── vercel.json                     # Vercel deployment config
│   └── vite.config.ts                  # Vite configuration
│
├── backend/                            # Django REST API Backend
│   ├── Ecolive/                        # Django project directory
│   │   ├── Accounts/                   # User authentication app
│   │   ├── Admin/                      # Admin management app
│   │   ├── Ecolive/                    # Main project settings
│   │   ├── Farmer/                     # Farmer management app
│   │   ├── Hives/                      # Hive tracking app
│   │   ├── Investor/                   # Investor management app
│   │   ├── db.sqlite3                  # SQLite database
│   │   └── manage.py                   # Django management script
│   ├── ecolive_env/                    # Python virtual environment
│   ├── render.yaml                     # Render deployment config
│   └── requirements.txt                # Python dependencies
│
└── hedera-backend/                     # Hedera Blockchain Integration
    ├── data/                           # Blockchain data storage
    ├── node_modules/                   # Node dependencies
    ├── backend.yaml                    # Backend configuration
    ├── nft.js                          # NFT minting logic
    ├── package.json                    # Node dependencies
    ├── package-lock.json
    └── server.js                       # Hedera API server

Contributing
We welcome contributions from the community! Here's how you can help:
How to Contribute

Fork the repository

bash   # Click the 'Fork' button on GitHub

Clone your fork

bash   git clone https://github.com/YOUR_USERNAME/EcoliveApp.git
   cd EcoliveApp

Create a new branch

bash   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix

Make your changes

Follow the existing code style
Write clear commit messages
Add tests for new features
Update documentation as needed


Commit your changes

bash   git add .
   git commit -m "feat: add new carbon calculation method"

Push to your fork

bash   git push origin feature/your-feature-name

Create a Pull Request

Go to the original repository
Click "New Pull Request"
Provide a clear description of your changes



Commit Message Convention
We follow the Conventional Commits specification:

feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting, etc.)
refactor: Code refactoring
test: Adding or updating tests
chore: Maintenance tasks

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
Email: cmuchirairungu063@example.com
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
