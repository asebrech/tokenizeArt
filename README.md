# TokenizeArt - NFT Minting Platform

A monorepo containing smart contracts and a Next.js frontend for minting NFTs with a Space/Halo themed UI.

## 🏗️ Project Structure

```
tokenizeArt/                    # Monorepo root
├── code/                       # Solidity smart contracts (shared)
│   └── MyNFT.sol              # ERC-721 NFT contract
├── deployment/                 # Contracts workspace
│   ├── .env                   # Environment variables for deployment
│   ├── .gitignore             # Deployment-specific ignores
│   ├── package.json           # Hardhat dependencies
│   ├── hardhat.config.js      # Hardhat configuration
│   ├── deploy.js              # Deployment script
│   ├── artifacts/             # Compiled contract artifacts
│   └── cache/                 # Hardhat cache
├── mint/                       # Frontend workspace
│   ├── .env.local             # Frontend environment variables
│   ├── .gitignore             # Frontend-specific ignores
│   ├── package.json           # Next.js dependencies
│   ├── app/                   # Next.js app directory
│   ├── components/            # React components (shadcn/ui)
│   └── lib/                   # Utility functions
└── package.json               # Root orchestrator
```

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Smart Contract Commands
```bash
# Compile contracts
npm run compile

# Deploy to Sepolia
npm run deploy

# Or use the explicit command
npm run deploy:contract
```

### Frontend Commands
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🔧 Monorepo Setup

This project uses **npm workspaces** to manage the monorepo:
- Root package orchestrates all workspaces
- `deployment/` workspace contains Hardhat configuration and smart contract deployment
- `mint/` workspace contains the Next.js frontend application
- `code/` folder is shared between workspaces (smart contracts source)
- Each workspace has its own dependencies, `.env`, and `.gitignore`
- Shared dependencies are hoisted to the root `node_modules`

### Available Scripts

#### Main Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend dev server |
| `npm run build` | Build frontend for production |
| `npm run compile` | Compile smart contracts |
| `npm run deploy` | Deploy contracts to Sepolia |

#### Frontend Commands
| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Run frontend dev server |
| `npm run build:frontend` | Build frontend for production |
| `npm run start:frontend` | Start frontend production server |
| `npm run lint:frontend` | Lint frontend code |

#### Contract Commands
| Command | Description |
|---------|-------------|
| `npm run compile:contracts` | Compile smart contracts |
| `npm run deploy:contracts` | Deploy contracts to Sepolia |
| `npm run clean:contracts` | Clean Hardhat cache and artifacts |

## 🎨 Tech Stack

**Smart Contracts:**
- Hardhat 2.22.0
- OpenZeppelin Contracts 5.4.0
- Solidity 0.8.24
- Ethers.js 6.13.0

**Frontend:**
- Next.js 16.0.1
- React 19.2.0
- Wagmi 2.19.1
- RainbowKit 2.2.9
- Tailwind CSS 4
- shadcn/ui components
- TypeScript 5
