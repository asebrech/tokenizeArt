# 📚 Documentation Index

Complete documentation for the UNSC-42 TokenizeArt NFT project.

---

## 📖 Available Guides

### 🚀 [Quick Start Guide](./README.md)

**You are here!** Get your project running in 5 minutes with step-by-step instructions.

**Best for**: First-time setup, quick overview, getting started immediately.

---

### 🔧 [Deployment Guide](./DEPLOYMENT.md)

Comprehensive guide for deploying the UNSC-42 smart contract to Ethereum Sepolia testnet.

**Contents**:

- Prerequisites and account setup (Alchemy, MetaMask, Etherscan)
- Environment configuration
- Contract compilation
- Deployment process with automatic verification
- Post-deployment steps
- Troubleshooting common issues

**Best for**: Understanding the deployment process, solving deployment errors, verifying contracts.

---

### 🎨 [Minting Guide](./MINTING.md)

Complete guide for minting UNSC-42 NFTs using the web interface and direct contract interaction.

**Contents**:

- Web interface minting tutorial
- NFT metadata preparation and IPFS upload
- Direct contract interaction via Etherscan
- Ownership verification methods
- Transaction flow explanation
- Batch minting techniques

**Best for**: Creating NFTs, preparing metadata, verifying ownership, understanding minting flow.

---

### 🔬 [Technical Specifications](./TECHNICAL.md)

Detailed technical documentation covering smart contract architecture and frontend implementation.

**Contents**:

- Smart contract architecture and code breakdown
- All contract functions with examples
- Frontend architecture and component hierarchy
- Web3 integration (Wagmi, RainbowKit, Viem)
- Testing strategies
- Gas optimization
- Event handling

**Best for**: Code review, understanding architecture, technical interviews, development reference.

---

### 🔒 [Security Guide](./SECURITY.md)

Comprehensive security documentation covering all aspects of the project.

**Contents**:

- Smart contract security model
- Access control mechanisms
- Ownership verification methods
- Frontend security measures
- Operational security best practices
- Security checklist
- Incident response procedures

**Best for**: Security review, understanding permissions, evaluation preparation, best practices.

---

### 📊 [Architecture Diagrams](./DIAGRAMS.md)

Visual representations of system architecture, data flow, and processes.

**Contents**:

- System architecture overview
- Minting flow diagram
- Smart contract architecture
- Frontend component hierarchy
- Data flow diagrams
- Security layers
- Deployment process
- Token lifecycle
- Monorepo structure

**Best for**: Visual learners, understanding system design, evaluation presentations.

---

## 🎯 Quick Start Guide

Get your UNSC-42 NFT project running in 5 minutes!

---

## Prerequisites Check

Before starting, ensure you have:

- [ ] **Node.js v18+** installed (`node --version`)
- [ ] **npm v9+** installed (`npm --version`)
- [ ] **MetaMask** browser extension installed
- [ ] **Sepolia ETH** in your wallet (get free from [faucet](https://sepoliafaucet.com/))
- [ ] **Git** installed (to clone repository)

---

## Installation (2 minutes)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/asebrech/tokenizeArt.git
cd tokenizeArt

# Install all dependencies (monorepo)
npm install
```

**Expected output**:

```
added XXX packages in XXs
```

---

## Smart Contract Deployment (3 minutes)

### Step 2: Configure Environment

```bash
# Navigate to deployment workspace
cd deployment

# Create .env file from template
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Add your keys**:

```bash
API_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
PRIVATE_KEY="your_metamask_private_key_without_0x"
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_KEY"
```

**Get your keys**:

- **Alchemy**: [alchemy.com](https://www.alchemy.com) → Create App → Copy API Key
- **Private Key**: MetaMask → Account Details → Show Private Key
- **Etherscan**: [etherscan.io/myapikey](https://etherscan.io/myapikey) → Create Key

### Step 3: Deploy Contract

```bash
# Compile the contract
npm run compile

# Deploy to Sepolia
npm run deploy
```

**Expected output**:

```
Deploying contract with account: 0xYourAddress...
Contract deployed to address: 0xNewContractAddress...
Contract verified successfully!
```

**⚠️ IMPORTANT**: Save your contract address! You'll need it.

---

## Frontend Setup (2 minutes)

### Step 4: Start the Frontend

```bash
# Navigate to mint workspace (from deployment/)
cd ../mint

# Start development server
npm run dev
```

**Expected output**:

```
▲ Next.js 16.0.1
- Local:        http://localhost:3000
- ready in X ms
```

### Step 5: Open in Browser

Open [http://localhost:3000](http://localhost:3000)

You should see:

- Space-themed landing page
- "Connect Wallet" button in top right
- Particle effects in background

---

## Mint Your First NFT (3 minutes)

### Step 6: Connect Wallet

1. Click **"Connect Wallet"** button
2. Select **MetaMask**
3. Approve connection
4. Verify you're on **Sepolia Test Network**

### Step 7: Configure Contract Address

1. Locate the **"Contract Address"** input field
2. Paste your deployed contract address
3. Address auto-saves to browser

### Step 8: Prepare NFT Metadata

Upload your NFT metadata to IPFS first. Quick option using Pinata:

1. Go to [pinata.cloud](https://pinata.cloud)
2. Upload your JSON file:
   ```json
   {
     "name": "UNSC-42 #1 - Genesis",
     "description": "First UNSC NFT from 42 School",
     "image": "ipfs://QmYourImageHash/image.png",
     "attributes": [
       { "trait_type": "Artist", "value": "asebrech" },
       { "trait_type": "Project", "value": "42 School" }
     ]
   }
   ```
3. Copy the IPFS CID

### Step 9: Mint NFT

1. Enter your IPFS URI: `ipfs://YourCID/metadata.json`
2. Wait for metadata preview to load
3. Review the preview (image, name, description)
4. Click **"Mint NFT"** button
5. Approve transaction in MetaMask
6. Wait for confirmation (10-30 seconds)

**Success!** You'll see:

```
✅ Transaction Confirmed
Your NFT has been minted successfully!
```

---

## Verify Your NFT

### Check on Etherscan

1. Click **"View on Etherscan"** link from confirmation
2. Find "Tokens Transferred" section
3. See your token ID (e.g., #1)

### Verify Ownership

On Etherscan:

1. Go to "Contract" → "Read Contract"
2. Find `ownerOf` function
3. Enter your token ID
4. Click "Query"
5. Should show your wallet address!

---

## Common Issues & Fixes

### ❌ "Insufficient funds"

**Fix**: Get more Sepolia ETH from [faucet](https://sepoliafaucet.com/)

### ❌ "User rejected transaction"

**Fix**: Click "Mint NFT" again and approve in MetaMask

### ❌ "Ownable: caller is not the owner"

**Fix**: Connect with the wallet that deployed the contract

### ❌ Metadata not loading

**Fix**:

- Verify IPFS URI format: `ipfs://QmHash/file.json`
- Test URL: `https://ipfs.io/ipfs/QmHash/file.json`
- Ensure file is pinned on IPFS

### ❌ Wrong network

**Fix**: Switch to Sepolia in MetaMask dropdown

---

## What's Next?

Now that you have a working NFT project:

### 📚 Read Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [MINTING.md](./MINTING.md) - Complete minting documentation
- [TECHNICAL.md](./TECHNICAL.md) - Technical specifications
- [SECURITY.md](./SECURITY.md) - Security best practices

---

## Project Structure Overview

```
tokenizeArt/
├── README.md              ← Project overview
├── code/
│   └── UNSC42.sol        ← Smart contract
├── deployment/           ← Hardhat workspace
│   ├── deploy.js         ← Deployment script
│   └── .env              ← Your credentials (not in Git)
├── mint/                 ← Frontend workspace
│   ├── app/
│   │   ├── components/   ← React components
│   │   └── page.tsx      ← Landing page
│   └── package.json
└── documentation/        ← Guides (you are here!)
    ├── DEPLOYMENT.md
    ├── MINTING.md
    ├── TECHNICAL.md
    └── SECURITY.md
```

---

## Key Commands Reference

### Deployment Workspace

```bash
cd deployment

npm run compile    # Compile smart contract
npm run deploy     # Deploy to Sepolia
npm run test       # Run tests
npm run clean      # Clean artifacts
```

### Frontend Workspace

```bash
cd mint

npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Root (Monorepo)

```bash
npm install        # Install all workspaces
npm run dev        # Start frontend dev server
npm run build      # Build all workspaces
npm run compile    # Compile contract
npm run deploy     # Deploy contract
```

---

_Built with ❤️ for 42 School TokenizeArt Project_
