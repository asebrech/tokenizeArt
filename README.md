# TokenizeArt - NFT Minting Platform

A monorepo containing smart contracts and a Next.js frontend for minting NFTs with a Space/Halo themed UI.

## 🏗️ Project Structure

```
tokenizeArt/
├── code/              # Solidity smart contracts
├── deployment/        # Deployment scripts
├── artifacts/         # Compiled contract artifacts
├── cache/            # Hardhat cache
├── mint/             # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components (shadcn/ui)
│   └── lib/          # Utility functions
├── hardhat.config.js # Hardhat configuration
└── package.json      # Monorepo root with workspaces
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
- Root package manages Hardhat and smart contracts
- `mint/` workspace contains the Next.js frontend
- Shared dependencies are hoisted to the root `node_modules`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile smart contracts |
| `npm run deploy` | Deploy contracts to Sepolia |
| `npm run dev` | Run frontend dev server |
| `npm run build` | Build frontend for production |
| `npm run dev:frontend` | Alias for `npm run dev` |
| `npm run build:frontend` | Alias for `npm run build` |
| `npm run deploy:contract` | Alias for `npm run deploy` |

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
