# UNSC-42 TokenizeArt Project# UNSC-42 TokenizeArt Project# TokenizeArt - NFT Minting Platform



**A comprehensive NFT minting platform built on Ethereum blockchain**



> *Project by: asebrech (42 School)*  **A comprehensive NFT minting platform built on Ethereum blockchain**A monorepo containing smart contracts and a Next.js frontend for minting NFTs with a Space/Halo themed UI.

> *Contract: UNSC-42 (ERC-721 Standard)*  

> *Network: Sepolia Testnet*  

> *Contract Address: `0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C`*

> *Project by: asebrech (42 School)*  ## 🏗️ Project Structure

---

> *Contract: UNSC-42 (ERC-721 Standard)*  

## 📋 Table of Contents

> *Network: Sepolia Testnet*  ```

- [Project Overview](#-project-overview)

- [Platform Choice & Justification](#-platform-choice--justification)> *Contract Address: `0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C`*tokenizeArt/                    # Monorepo root

- [Technology Stack](#-technology-stack)

- [Repository Structure](#-repository-structure)├── code/                       # Solidity smart contracts (shared)

- [Quick Start](#-quick-start)

- [Security & Best Practices](#-security--best-practices)---│   └── MyNFT.sol              # ERC-721 NFT contract

- [NFT Metadata Standards](#-nft-metadata-standards)

- [Additional Resources](#-additional-resources)├── deployment/                 # Contracts workspace



---## 📋 Table of Contents│   ├── .env                   # Environment variables for deployment



## 🎯 Project Overview│   ├── .gitignore             # Deployment-specific ignores



UNSC-42 is an ERC-721 compliant NFT (Non-Fungible Token) smart contract deployed on the Ethereum Sepolia testnet. This project demonstrates the complete lifecycle of NFT development, from smart contract creation to deployment and minting through a user-friendly web interface.- [Project Overview](#-project-overview)│   ├── package.json           # Hardhat dependencies



**Key Features:**- [Platform Choice & Justification](#-platform-choice--justification)│   ├── hardhat.config.js      # Hardhat configuration

- ✅ ERC-721 standard compliance

- ✅ Owner-controlled minting- [Technology Stack](#-technology-stack)│   ├── deploy.js              # Deployment script

- ✅ IPFS metadata integration

- ✅ Web3 wallet integration (MetaMask, WalletConnect, etc.)- [Repository Structure](#-repository-structure)│   ├── artifacts/             # Compiled contract artifacts

- ✅ Real-time transaction tracking

- ✅ Dynamic contract address switching- [Quick Start](#-quick-start)│   └── cache/                 # Hardhat cache

- ✅ Responsive UI with space-themed design

- [Security & Best Practices](#-security--best-practices)├── mint/                       # Frontend workspace

---

- [NFT Metadata Standards](#-nft-metadata-standards)│   ├── .env.local             # Frontend environment variables

## 🔍 Platform Choice & Justification

- [Additional Resources](#-additional-resources)│   ├── .gitignore             # Frontend-specific ignores

### Why Ethereum?

│   ├── package.json           # Next.js dependencies

After evaluating multiple blockchain platforms (Ethereum, Binance Smart Chain, Polygon, Solana), **Ethereum** was selected for the following reasons:

---│   ├── app/                   # Next.js app directory

#### 1. **Industry Standard & Maturity**

- Ethereum is the pioneer and most widely adopted platform for NFTs│   ├── components/            # React components (shadcn/ui)

- ERC-721 is the de facto standard for non-fungible tokens

- Extensive documentation and community support## 🎯 Project Overview│   └── lib/                   # Utility functions



#### 2. **Security & Decentralization**└── package.json               # Root orchestrator

- Proven security track record with billions in value secured

- Highly decentralized network with thousands of validatorsUNSC-42 is an ERC-721 compliant NFT (Non-Fungible Token) smart contract deployed on the Ethereum Sepolia testnet. This project demonstrates the complete lifecycle of NFT development, from smart contract creation to deployment and minting through a user-friendly web interface.```

- Battle-tested consensus mechanism (Proof of Stake)



#### 3. **Developer Ecosystem**

- **OpenZeppelin**: Industry-standard, audited smart contract libraries**Key Features:**## 🚀 Quick Start

- **Hardhat**: Professional-grade development environment

- **Wagmi & RainbowKit**: Modern Web3 integration frameworks- ✅ ERC-721 standard compliance

- Rich tooling ecosystem (Etherscan, Alchemy, IPFS integrations)

- ✅ Owner-controlled minting### Install Dependencies

#### 4. **Testnet Availability**

- Sepolia testnet provides a realistic testing environment- ✅ IPFS metadata integration```bash

- Free test ETH from faucets (no real money required)

- Identical behavior to mainnet for learning purposes- ✅ Web3 wallet integration (MetaMask, WalletConnect, etc.)npm install



#### 5. **Interoperability**- ✅ Real-time transaction tracking```

- NFTs are widely supported across marketplaces (OpenSea, Rarible, LooksRare)

- Standard wallet support (MetaMask, WalletConnect, Rainbow)- ✅ Dynamic contract address switching

- Easy integration with IPFS for decentralized metadata storage

- ✅ Responsive UI with space-themed design### Smart Contract Commands

### Why ERC-721?

```bash

The **ERC-721 standard** was chosen over alternatives (ERC-1155, custom implementations) because:

- Each token is unique with its own metadata---# Compile contracts

- Proven ownership transfer mechanisms

- Built-in `ownerOf()` function for ownership verificationnpm run compile

- Wide ecosystem support

## 🔍 Platform Choice & Justification

---

# Deploy to Sepolia

## 🛠 Technology Stack

### Why Ethereum?npm run deploy

### Smart Contract Layer

- **Solidity**: `^0.8.20` - Smart contract programming language

- **OpenZeppelin Contracts**: `5.4.0` - Audited contract libraries

  - `ERC721URIStorage`: NFT implementation with URI storageAfter evaluating multiple blockchain platforms (Ethereum, Binance Smart Chain, Polygon, Solana), **Ethereum** was selected for the following reasons:# Or use the explicit command

  - `Ownable`: Access control for minting privileges

- **Hardhat**: `2.22.0` - Development environment and testing frameworknpm run deploy:contract



### Frontend Application#### 1. **Industry Standard & Maturity**```

- **Next.js**: `16.0.1` - React framework with App Router

- **React**: `19.2.0` - UI component library- Ethereum is the pioneer and most widely adopted platform for NFTs

- **TypeScript**: `5.7.3` - Type-safe JavaScript

- **Wagmi**: `2.19.1` - React Hooks for Ethereum- ERC-721 is the de facto standard for non-fungible tokens### Frontend Commands

- **RainbowKit**: `2.2.9` - Wallet connection UI

- **Viem**: `2.38.5` - TypeScript-first Ethereum client- Extensive documentation and community support```bash

- **Tailwind CSS**: `4.0.1` - Utility-first CSS framework

- **shadcn/ui**: Modern component library# Run development server



### Infrastructure#### 2. **Security & Decentralization**npm run dev

- **Alchemy**: RPC provider for blockchain interaction

- **IPFS**: Decentralized storage for NFT metadata- Proven security track record with billions in value secured

- **Etherscan**: Contract verification and blockchain explorer

- Highly decentralized network with thousands of validators# Build for production

---

- Battle-tested consensus mechanism (Proof of Stake)npm run build

## 📁 Repository Structure



```

tokenizeArt/#### 3. **Developer Ecosystem**# Start production server

├── README.md                    # This file - Project overview

├── package.json                 # Monorepo configuration- **OpenZeppelin**: Industry-standard, audited smart contract librariesnpm run start

│

├── code/                        # Smart contract source code- **Hardhat**: Professional-grade development environment

│   └── UNSC42.sol              # Main NFT contract (ERC-721)

│- **Wagmi & RainbowKit**: Modern Web3 integration frameworks# Lint code

├── deployment/                  # Contract deployment workspace

│   ├── package.json            # Hardhat dependencies- Rich tooling ecosystem (Etherscan, Alchemy, IPFS integrations)npm run lint

│   ├── hardhat.config.js       # Hardhat configuration

│   ├── deploy.js               # Deployment script```

│   ├── .env.example            # Environment variables template

│   └── artifacts/              # Compiled contract artifacts#### 4. **Testnet Availability**

│

├── mint/                        # Frontend minting application- Sepolia testnet provides a realistic testing environment## 🔧 Monorepo Setup

│   ├── package.json            # Next.js dependencies

│   ├── wagmi.config.ts         # Web3 configuration- Free test ETH from faucets (no real money required)

│   ├── app/

│   │   ├── components/         # React components- Identical behavior to mainnet for learning purposesThis project uses **npm workspaces** to manage the monorepo:

│   │   │   ├── MintNFT.tsx    # Main minting interface

│   │   │   ├── NFTPreview.tsx # Metadata preview- Root package orchestrates all workspaces

│   │   │   └── ...

│   │   ├── hooks/             # Custom React hooks#### 5. **Interoperability**- `deployment/` workspace contains Hardhat configuration and smart contract deployment

│   │   ├── utils/             # Utility functions

│   │   ├── constants/         # Contract ABI and addresses- NFTs are widely supported across marketplaces (OpenSea, Rarible, LooksRare)- `mint/` workspace contains the Next.js frontend application

│   │   └── types/             # TypeScript type definitions

│   └── components/ui/         # shadcn/ui components- Standard wallet support (MetaMask, WalletConnect, Rainbow)- `code/` folder is shared between workspaces (smart contracts source)

│

└── documentation/              # Detailed documentation- Easy integration with IPFS for decentralized metadata storage- Each workspace has its own dependencies, `.env`, and `.gitignore`

    ├── DEPLOYMENT.md           # Deployment guide

    ├── MINTING.md              # Minting guide- Shared dependencies are hoisted to the root `node_modules`

    ├── TECHNICAL.md            # Technical specifications

    └── SECURITY.md             # Security considerations### Why ERC-721?

```

### Available Scripts

---

The **ERC-721 standard** was chosen over alternatives (ERC-1155, custom implementations) because:

## 🚀 Quick Start

- Each token is unique with its own metadata#### Main Commands

### Prerequisites

- Proven ownership transfer mechanisms| Command | Description |

- **Node.js**: v18.x or higher

- **npm**: v9.x or higher- Built-in `ownerOf()` function for ownership verification|---------|-------------|

- **MetaMask**: Browser extension or compatible Web3 wallet

- **Sepolia ETH**: Free from [Sepolia Faucet](https://sepoliafaucet.com/)- Wide ecosystem support| `npm run dev` | Run frontend dev server |



### Installation| `npm run build` | Build frontend for production |



```bash---| `npm run compile` | Compile smart contracts |

# Clone the repository

git clone https://github.com/asebrech/tokenizeArt.git| `npm run deploy` | Deploy contracts to Sepolia |

cd tokenizeArt

## 🛠 Technology Stack

# Install all dependencies (monorepo)

npm install#### Frontend Commands



# Navigate to deployment workspace for contract operations### Smart Contract Layer| Command | Description |

cd deployment

- **Solidity**: `^0.8.20` - Smart contract programming language|---------|-------------|

# Navigate to mint workspace for frontend

cd mint- **OpenZeppelin Contracts**: `5.4.0` - Audited contract libraries| `npm run dev:frontend` | Run frontend dev server |

```

  - `ERC721URIStorage`: NFT implementation with URI storage| `npm run build:frontend` | Build frontend for production |

### Quick Commands

  - `Ownable`: Access control for minting privileges| `npm run start:frontend` | Start frontend production server |

```bash

# Compile smart contracts- **Hardhat**: `2.22.0` - Development environment and testing framework| `npm run lint:frontend` | Lint frontend code |

npm run compile



# Deploy to Sepolia testnet

npm run deploy### Frontend Application#### Contract Commands



# Start frontend development server- **Next.js**: `16.0.1` - React framework with App Router| Command | Description |

npm run dev

- **React**: `19.2.0` - UI component library|---------|-------------|

# Build frontend for production

npm run build- **TypeScript**: `5.7.3` - Type-safe JavaScript| `npm run compile:contracts` | Compile smart contracts |

```

- **Wagmi**: `2.19.1` - React Hooks for Ethereum| `npm run deploy:contracts` | Deploy contracts to Sepolia |

For detailed setup instructions, see [`documentation/DEPLOYMENT.md`](./documentation/DEPLOYMENT.md)

- **RainbowKit**: `2.2.9` - Wallet connection UI| `npm run clean:contracts` | Clean Hardhat cache and artifacts |

---

- **Viem**: `2.38.5` - TypeScript-first Ethereum client

## 🔒 Security & Best Practices

- **Tailwind CSS**: `4.0.1` - Utility-first CSS framework## 🎨 Tech Stack

### Smart Contract Security

- **shadcn/ui**: Modern component library

- ✅ **Ownable Pattern**: Only contract owner can mint NFTs

- ✅ **OpenZeppelin Libraries**: Audited and battle-tested code**Smart Contracts:**

- ✅ **No Reentrancy**: Simple minting logic without external calls

- ✅ **Input Validation**: Solidity's type system ensures valid addresses### Infrastructure- Hardhat 2.22.0



### Ownership Verification- **Alchemy**: RPC provider for blockchain interaction- OpenZeppelin Contracts 5.4.0



The contract implements the standard `ownerOf(uint256 tokenId)` function:- **IPFS**: Decentralized storage for NFT metadata- Solidity 0.8.24



```solidity- **Etherscan**: Contract verification and blockchain explorer- Ethers.js 6.13.0

// Verify NFT ownership (inherited from ERC721)

address owner = UNSC42.ownerOf(tokenId);

```

---**Frontend:**

This function can be called by anyone to verify the current owner of any token ID.

- Next.js 16.0.1

### Frontend Security

## 📁 Repository Structure- React 19.2.0

- ✅ **Read-Only Operations**: Metadata fetching doesn't require signatures

- ✅ **User Confirmation**: All transactions require explicit wallet approval- Wagmi 2.19.1

- ✅ **Error Handling**: User-friendly messages for failed transactions

- ✅ **Input Sanitization**: TypeScript type checking prevents invalid data```- RainbowKit 2.2.9



### Testnet UsagetokenizeArt/- Tailwind CSS 4



⚠️ **IMPORTANT**: This project uses **Sepolia testnet only**. Never use real money or mainnet private keys.├── README.md                    # This file - Project overview- shadcn/ui components



- Sepolia ETH has no monetary value├── package.json                 # Monorepo configuration- TypeScript 5

- Free to obtain from faucets

- Identical functionality to mainnet for learning│

├── code/                        # Smart contract source code

---│   └── UNSC42.sol              # Main NFT contract (ERC-721)

│

## 🎨 NFT Metadata Standards├── deployment/                  # Contract deployment workspace

│   ├── package.json            # Hardhat dependencies

### Required Metadata Format│   ├── hardhat.config.js       # Hardhat configuration

│   ├── deploy.js               # Deployment script

All NFTs must follow the ERC-721 metadata standard:│   ├── .env.example            # Environment variables template

│   └── artifacts/              # Compiled contract artifacts

```json│

{├── mint/                        # Frontend minting application

  "name": "UNSC-42 #1 - Title",│   ├── package.json            # Next.js dependencies

  "description": "Description of the artwork",│   ├── wagmi.config.ts         # Web3 configuration

  "image": "ipfs://QmHash/image.png",│   ├── app/

  "attributes": [│   │   ├── components/         # React components

    {│   │   │   ├── MintNFT.tsx    # Main minting interface

      "trait_type": "Artist",│   │   │   ├── NFTPreview.tsx # Metadata preview

      "value": "asebrech"│   │   │   └── ...

    },│   │   ├── hooks/             # Custom React hooks

    {│   │   ├── utils/             # Utility functions

      "trait_type": "Project",│   │   ├── constants/         # Contract ABI and addresses

      "value": "42 School"│   │   └── types/             # TypeScript type definitions

    }│   └── components/ui/         # shadcn/ui components

  ]│

}└── documentation/              # Detailed documentation

```    ├── DEPLOYMENT.md           # Deployment guide

    ├── MINTING.md              # Minting guide

### Metadata Requirements    ├── TECHNICAL.md            # Technical specifications

    └── SECURITY.md             # Security considerations

- **Artist Name**: Must be `asebrech` (login)```

- **NFT Name**: Must include "42" and a descriptive title

- **Storage**: IPFS for decentralized, immutable storage---

- **Format**: JSON following OpenSea metadata standards

## 🚀 Quick Start

Example IPFS URI: `ipfs://QmYourHash/metadata.json`

### Prerequisites

---

- **Node.js**: v18.x or higher

## 📚 Additional Resources- **npm**: v9.x or higher

- **MetaMask**: Browser extension or compatible Web3 wallet

### Documentation- **Sepolia ETH**: Free from [Sepolia Faucet](https://sepoliafaucet.com/)

- [Deployment Guide](./documentation/DEPLOYMENT.md) - Step-by-step deployment instructions

- [Minting Guide](./documentation/MINTING.md) - How to mint NFTs using the frontend### Installation

- [Technical Specifications](./documentation/TECHNICAL.md) - Contract details and architecture

- [Security Guide](./documentation/SECURITY.md) - Security considerations and best practices```bash

# Clone the repository

### External Linksgit clone https://github.com/asebrech/tokenizeArt.git

- [View Contract on Etherscan](https://sepolia.etherscan.io/address/0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C)cd tokenizeArt

- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)

- [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)# Install all dependencies (monorepo)

- [Hardhat Documentation](https://hardhat.org/docs)npm install

- [IPFS Documentation](https://docs.ipfs.tech/)

# Navigate to deployment workspace for contract operations

### Getting Helpcd deployment

- Review the `documentation/` folder for detailed guides

- Check [Hardhat troubleshooting](https://hardhat.org/hardhat-runner/docs/troubleshooting)# Navigate to mint workspace for frontend

- Explore [Wagmi documentation](https://wagmi.sh/) for frontend issuescd mint

```

---

### Quick Commands

## 📜 License

```bash

MIT License - See individual dependencies for their licenses.# Compile smart contracts

npm run compile

---

# Deploy to Sepolia testnet

## 🎓 Educational Purposenpm run deploy



This project was created as part of the **42 School curriculum** to demonstrate:# Start frontend development server

- Understanding of blockchain technologynpm run dev

- Smart contract development skills

- Web3 frontend integration# Build frontend for production

- Security best practicesnpm run build

- Professional documentation standards```



**Note**: This is a testnet project for educational purposes. No real assets are involved.For detailed setup instructions, see [`documentation/DEPLOYMENT.md`](./documentation/DEPLOYMENT.md)



------



*Built with ❤️ by asebrech for the 42 TokenizeArt project*## 🔒 Security & Best Practices


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
- [Deployment Guide](./documentation/DEPLOYMENT.md) - Step-by-step deployment instructions
- [Minting Guide](./documentation/MINTING.md) - How to mint NFTs using the frontend
- [Technical Specifications](./documentation/TECHNICAL.md) - Contract details and architecture
- [Security Guide](./documentation/SECURITY.md) - Security considerations and best practices

### External Links
- [View Contract on Etherscan](https://sepolia.etherscan.io/address/0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [IPFS Documentation](https://docs.ipfs.tech/)

### Getting Help
- Review the `documentation/` folder for detailed guides
- Check [Hardhat troubleshooting](https://hardhat.org/hardhat-runner/docs/troubleshooting)
- Explore [Wagmi documentation](https://wagmi.sh/) for frontend issues

---

## 📜 License

MIT License - See individual dependencies for their licenses.

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

*Built with ❤️ by asebrech for the 42 TokenizeArt project*
