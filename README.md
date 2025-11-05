# TokenizeArt - NFT Minting Platform

**A comprehensive NFT minting platform built on Ethereum blockchain**

> _Project by: asebrech (42 School)_
>
> _Contract: UNSC-42 (ERC-721 Standard)_
>
> _Network: Sepolia Testnet_
>
> _Contract Address: [`0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C`](https://sepolia.etherscan.io/address/0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C)_

A monorepo containing smart contracts and a Next.js frontend for minting NFTs with a Space/Halo themed UI.

<div align="center">
  <img src="https://plum-select-octopus-670.mypinata.cloud/ipfs/bafybeif3isiawv2ufgaz2ppiz2l5c5bpxkkifrjijr2c3pvdvbulym4wpq" alt="UNSC-42 NFT" width="400"/>
  <p><em>Example UNSC-42 NFT</em></p>
</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Platform Choice & Justification](#-platform-choice--justification)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Quick Start](#-quick-start)
- [Security & Best Practices](#-security--best-practices)
- [NFT Metadata Standards](#-nft-metadata-standards)
- [Additional Resources](#-additional-resources)

---

## 🎯 Project Overview

UNSC-42 is an ERC-721 compliant NFT (Non-Fungible Token) smart contract deployed on the Ethereum Sepolia testnet. This project demonstrates the complete lifecycle of NFT development, from smart contract creation to deployment and minting through a user-friendly web interface.

**Key Features:**

- ✅ ERC-721 standard compliance
- ✅ Owner-controlled minting
- ✅ IPFS metadata integration
- ✅ Web3 wallet integration (MetaMask, WalletConnect, etc.)
- ✅ Real-time transaction tracking
- ✅ Dynamic contract address switching
- ✅ Responsive UI with space-themed design

---

## 🔍 Platform Choice & Justification

### Why Ethereum?

After evaluating multiple blockchain platforms (Ethereum, Binance Smart Chain, Polygon, Solana), **Ethereum** was selected for the following reasons:

#### 1. **Industry Standard & Maturity**

- Ethereum is the pioneer and most widely adopted platform for NFTs
- ERC-721 is the de facto standard for non-fungible tokens
- Extensive documentation and community support

#### 2. **Security & Decentralization**

- Proven security track record with billions in value secured
- Highly decentralized network with thousands of validators
- Battle-tested consensus mechanism (Proof of Stake)

#### 3. **Developer Ecosystem**

- **OpenZeppelin**: Industry-standard, audited smart contract libraries
- **Hardhat**: Professional-grade development environment
- **Wagmi & RainbowKit**: Modern Web3 integration frameworks
- Rich tooling ecosystem (Etherscan, Alchemy, IPFS integrations)

#### 4. **Testnet Availability**

- Sepolia testnet provides a realistic testing environment
- Free test ETH from faucets (no real money required)
- Identical behavior to mainnet for learning purposes

### Why ERC-721?

The **ERC-721 standard** was chosen over alternatives (ERC-1155, custom implementations) because:

- Each token is unique with its own metadata
- Proven ownership transfer mechanisms
- Built-in `ownerOf()` function for ownership verification
- Wide ecosystem support

---

## 🛠 Technology Stack

### Smart Contract Layer

- **Solidity**: `^0.8.20` - Smart contract programming language
- **OpenZeppelin Contracts**: `5.4.0` - Audited contract libraries
  - `ERC721URIStorage`: NFT implementation with URI storage
  - `Ownable`: Access control for minting privileges
- **Hardhat**: `2.22.0` - Development environment and testing framework

### Frontend Application

- **Next.js**: `16.0.1` - React framework with App Router
- **React**: `19.2.0` - UI component library
- **TypeScript**: `5.7.3` - Type-safe JavaScript
- **Wagmi**: `2.19.1` - React Hooks for Ethereum
- **RainbowKit**: `2.2.9` - Wallet connection UI
- **Viem**: `2.38.5` - TypeScript-first Ethereum client
- **Tailwind CSS**: `4.0.1` - Utility-first CSS framework
- **shadcn/ui**: Modern component library

### Infrastructure

- **Alchemy**: RPC provider for blockchain interaction
- **IPFS**: Decentralized storage for NFT metadata
- **Etherscan**: Contract verification and blockchain explorer

---

## 🏗️ Project Structure

```
tokenizeArt/                      # Monorepo root
├── README.md                     # This file - Project overview
├── package.json                  # Monorepo configuration
│
├── code/                         # Solidity smart contracts (shared)
│   └── UNSC42.sol                # ERC-721 NFT contract
│
├── deployment/                   # Contracts workspace
│   ├── package.json              # Hardhat dependencies
│   ├── hardhat.config.js         # Hardhat configuration
│   ├── deploy.js                 # Deployment script
│   ├── .env.example              # Environment variables template
│   └── artifacts/                # Compiled contract artifacts
│
├── mint/                         # Frontend minting application
│   ├── package.json              # Next.js dependencies
│   ├── wagmi.config.ts           # Web3 configuration
│   ├── app/
│   │   ├── components/           # React components
│   │   │   ├── MintNFT.tsx      # Main minting interface
│   │   │   ├── NFTPreview.tsx   # Metadata preview
│   │   │   └── ...
│   │   ├── hooks/                # Custom React hooks
│   │   ├── utils/                # Utility functions
│   │   ├── constants/            # Contract ABI and addresses
│   │   └── types/                # TypeScript type definitions
│   └── components/ui/            # shadcn/ui components
│
└── documentation/                # Detailed documentation
    ├── README.md                 # Quick start guide
    ├── DEPLOYMENT.md             # Deployment guide
    ├── MINTING.md                # Minting guide
    ├── TECHNICAL.md              # Technical specifications
    ├── SECURITY.md               # Security considerations
    └── DIAGRAMS.md               # Architecture diagrams
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MetaMask**: Browser extension or compatible Web3 wallet
- **Sepolia ETH**: Free from [Sepolia Faucet](https://sepoliafaucet.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/asebrech/tokenizeArt.git
cd tokenizeArt

# Install all dependencies (monorepo)
npm install

# Navigate to deployment workspace for contract operations
cd deployment

# Navigate to mint workspace for frontend
cd mint
```

### Quick Commands

```bash
# Compile smart contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy

# Start frontend development server
npm run dev

# Build frontend for production
npm run build
```

For detailed setup instructions, see [`documentation/DEPLOYMENT.md`](./documentation/DEPLOYMENT.md)

---

## 🔒 Security & Best Practices

### Smart Contract Security

- ✅ **Ownable Pattern**: Only contract owner can mint NFTs
- ✅ **OpenZeppelin Libraries**: Audited and battle-tested code
- ✅ **No Reentrancy**: Simple minting logic without external calls
- ✅ **Input Validation**: Solidity's type system ensures valid addresses

### Ownership Verification

The contract implements the standard `ownerOf(uint256 tokenId)` function:

```solidity
// Verify NFT ownership (inherited from ERC721)
address owner = UNSC42.ownerOf(tokenId);
```

This function can be called by anyone to verify the current owner of any token ID.

### Frontend Security

- ✅ **Read-Only Operations**: Metadata fetching doesn't require signatures
- ✅ **User Confirmation**: All transactions require explicit wallet approval
- ✅ **Error Handling**: User-friendly messages for failed transactions
- ✅ **Input Sanitization**: TypeScript type checking prevents invalid data

### Testnet Usage

⚠️ **IMPORTANT**: This project uses **Sepolia testnet only**. Never use real money or mainnet private keys.

- Sepolia ETH has no monetary value
- Free to obtain from faucets
- Identical functionality to mainnet for learning

---

## 🎨 NFT Metadata Standards

### Required Metadata Format

All NFTs must follow the ERC-721 metadata standard:

```json
{
  "name": "UNSC-42 #1 - Title",
  "description": "Description of the artwork",
  "image": "ipfs://QmHash/image.png",
  "attributes": [
    {
      "trait_type": "Artist",
      "value": "asebrech"
    },
    {
      "trait_type": "Project",
      "value": "42 School"
    }
  ]
}
```

### Metadata Requirements

- **Artist Name**: Must be `asebrech` (login)
- **NFT Name**: Must include "42" and a descriptive title
- **Storage**: IPFS for decentralized, immutable storage
- **Format**: JSON following OpenSea metadata standards

Example IPFS URI: `ipfs://QmYourHash/metadata.json`

---

## 📚 Additional Resources

### Documentation

- [Quick Start](./documentation/README.md) - Get started in 5 minutes
- [Deployment Guide](./documentation/DEPLOYMENT.md) - Step-by-step deployment instructions
- [Minting Guide](./documentation/MINTING.md) - How to mint NFTs using the frontend
- [Technical Specifications](./documentation/TECHNICAL.md) - Contract details and architecture
- [Security Guide](./documentation/SECURITY.md) - Security considerations and best practices
- [Architecture Diagrams](./documentation/DIAGRAMS.md) - Visual system architecture

### External Links

- [View Contract on Etherscan](https://sepolia.etherscan.io/address/0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Wagmi documentation](https://wagmi.sh/)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎓 Educational Purpose

This project was created as part of the **42 School curriculum** to demonstrate:

- Understanding of blockchain technology
- Smart contract development skills
- Web3 frontend integration
- Security best practices
- Professional documentation standards

**Note**: This is a testnet project for educational purposes. No real assets are involved.

---

**Built with ❤️ by asebrech for 42 School**
