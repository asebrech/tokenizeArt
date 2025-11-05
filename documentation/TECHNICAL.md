# 🔧 Technical Specifications

Detailed technical documentation for the UNSC-42 NFT smart contract and supporting infrastructure.

---

## Table of Contents

1. [Smart Contract Architecture](#smart-contract-architecture)
2. [Contract Functions](#contract-functions)
3. [Frontend Architecture](#frontend-architecture)
4. [Web3 Integration](#web3-integration)
5. [Testing](#testing)
6. [Gas Optimization](#gas-optimization)

---

## Smart Contract Architecture

### Contract Overview

**Name**: UNSC42  
**Standard**: ERC-721 (Non-Fungible Token)  
**Solidity Version**: ^0.8.20  
**License**: MIT

### Inheritance Hierarchy

```
ERC165
  └── ERC721
       └── ERC721URIStorage
              └── UNSC42

Ownable
  └── UNSC42
```

### Contract Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title UNSC42
 * @dev ERC-721 NFT contract for 42 School TokenizeArt project
 * @notice Implements owner-controlled minting with IPFS metadata support
 */
contract UNSC42 is ERC721URIStorage, Ownable {
    /// @dev Counter for token IDs, starts at 0
    uint256 private _tokenIds;

    /**
     * @dev Constructor sets token name, symbol, and initial owner
     * @param initialOwner Address that will own the contract
     */
    constructor(address initialOwner)
        ERC721("UNSC-42", "UNSC")
        Ownable(initialOwner)
    {}

    /**
     * @dev Mints a new NFT with specified metadata URI
     * @param recipient Address that will receive the NFT
     * @param tokenURI IPFS URI pointing to token metadata
     * @return newItemId The ID of the newly minted token
     * @notice Only contract owner can call this function
     */
    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

### Dependencies

#### OpenZeppelin Contracts (v5.4.0)

**ERC721URIStorage**:

- Extends ERC721 with `_setTokenURI()` and `tokenURI()` functions
- Stores metadata URI on-chain per token
- Overrides `tokenURI()` to return stored URI

**Ownable**:

- Provides basic access control
- `onlyOwner` modifier restricts function access
- `transferOwnership()` for ownership transfer
- `renounceOwnership()` to remove owner

### State Variables

| Variable    | Type    | Visibility | Description                      |
| ----------- | ------- | ---------- | -------------------------------- |
| `_tokenIds` | uint256 | private    | Counter for sequential token IDs |

**Note**: Token IDs start at 1 (incremented before first mint)

### Inherited State

From **ERC721**:

- `_name` - Token collection name ("UNSC-42")
- `_symbol` - Token symbol ("UNSC")
- `_owners` - Mapping of token ID to owner address
- `_balances` - Mapping of owner to token count

From **ERC721URIStorage**:

- `_tokenURIs` - Mapping of token ID to metadata URI

From **Ownable**:

- `_owner` - Address of contract owner

---

## Contract Functions

### Public Functions

#### `mintNFT(address recipient, string memory tokenURI)`

Mints a new NFT to the specified recipient with metadata URI.

**Access**: Only owner  
**Visibility**: Public  
**State Modifying**: Yes

**Parameters**:

- `recipient` (address) - Address to receive the NFT
- `tokenURI` (string) - IPFS URI to metadata (e.g., `ipfs://QmHash/metadata.json`)

**Returns**:

- `newItemId` (uint256) - The ID of the newly minted token

**Events Emitted**:

- `Transfer(address(0), recipient, newItemId)` - From ERC721
- `MetadataUpdate(newItemId)` - From IERC4906

**Gas Cost**: ~150,000-200,000 gas (depends on URI length)

**Example**:

```solidity
uint256 tokenId = mintNFT(
    0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb,
    "ipfs://QmVWYAenTfN9pUjJjgNjNbUdUw6fVDxp8qZqL5x6wkUzqK/1.json"
);
// Returns: 1 (first token)
```

**Requirements**:

- Caller must be contract owner
- Recipient cannot be zero address
- tokenURI can be empty string (but not recommended)

**Reverts If**:

- Caller is not owner: `"Ownable: caller is not the owner"`
- Recipient is zero address: `"ERC721: mint to the zero address"`

---

### Inherited Functions (ERC721)

#### `ownerOf(uint256 tokenId) → address`

Returns the owner of a specific token.

**Access**: Public  
**View**: Yes (no gas cost when called externally)

**Example**:

```solidity
address owner = ownerOf(1);
// Returns: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Reverts If**: Token doesn't exist

---

#### `balanceOf(address owner) → uint256`

Returns the number of tokens owned by an address.

**Example**:

```solidity
uint256 balance = balanceOf(0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb);
// Returns: 3 (if owner has 3 NFTs)
```

---

#### `tokenURI(uint256 tokenId) → string`

Returns the metadata URI for a token.

**Example**:

```solidity
string memory uri = tokenURI(1);
// Returns: "ipfs://QmVWYAenTfN9pUjJjgNjNbUdUw6fVDxp8qZqL5x6wkUzqK/1.json"
```

---

#### `transferFrom(address from, address to, uint256 tokenId)`

Transfers a token from one address to another.

**Requirements**:

- Caller must be token owner or approved
- `from` must be current owner
- `to` cannot be zero address

**Example**:

```solidity
transferFrom(ownerAddress, recipientAddress, 1);
```

---

#### `approve(address to, uint256 tokenId)`

Approves another address to transfer a specific token.

**Example**:

```solidity
approve(marketplaceAddress, 1);
```

---

#### `setApprovalForAll(address operator, bool approved)`

Approves or revokes an operator to manage all caller's tokens.

**Example**:

```solidity
setApprovalForAll(marketplaceAddress, true);
```

---

### Inherited Functions (Ownable)

#### `owner() → address`

Returns the current owner of the contract.

**Example**:

```solidity
address currentOwner = owner();
```

---

#### `transferOwnership(address newOwner)`

Transfers contract ownership to a new address.

**Access**: Only owner

**Example**:

```solidity
transferOwnership(0xNewOwnerAddress);
```

---

#### `renounceOwnership()`

Removes the owner, making the contract ownerless.

**Warning**: After renouncing, no one can mint new tokens!

---

## Frontend Architecture

### Technology Stack

```
┌─────────────────────────────────────┐
│         Next.js 16 (App Router)     │
│         React 19 + TypeScript       │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
  ┌────▼────┐    ┌─────▼─────┐
  │  Wagmi  │    │ RainbowKit │
  │  2.19   │    │    2.2     │
  └────┬────┘    └─────┬──────┘
       │                │
       └───────┬────────┘
               │
          ┌────▼────┐
          │  Viem   │
          │  2.38   │
          └────┬────┘
               │
      ┌────────┴─────────┐
      │                  │
┌─────▼──────┐    ┌─────▼─────┐
│  Alchemy   │    │   IPFS    │
│  (RPC)     │    │ (Metadata)│
└────────────┘    └───────────┘
```

### Project Structure

```
mint/
├── app/
│   ├── components/
│   │   ├── MintNFT.tsx          # Main minting interface
│   │   ├── MetadataSelector.tsx
│   │   ├── NFTPreview.tsx       # Metadata preview card
│   │   ├── TransactionStatus.tsx # TX status display
│   │   ├── LoadingSkeleton.tsx  # Loading states
│   │   └── ErrorMessage.tsx     # Error display
│   ├── hooks/
│   │   └── useNFTMetadata.ts    # IPFS metadata fetcher
│   ├── utils/
│   │   └── parseError.ts        # Transaction error parser
│   ├── constants/
│   │   └── contract.ts          # ABI, addresses, configs
│   ├── types/
│   │   └── nft.ts               # TypeScript interfaces
│   ├── providers.tsx            # Web3 providers setup
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/ui/               # shadcn/ui components
├── lib/
│   └── utils.ts                 # Utility functions
├── wagmi.config.ts              # Wagmi configuration
└── next.config.ts               # Next.js configuration
```

### Key Components

#### MintNFT Component

**Purpose**: Main interface for minting NFTs

**Features**:

- Contract address input with localStorage persistence
- Recipient address input
- **Dual metadata input modes**:
  - **Select mode**: Dropdown with predefined NFT metadata URLs
  - **Manual mode**: Direct URI input for custom metadata
- Real-time metadata preview
- Transaction status tracking
- Error handling

**State Management**:

```typescript
const [tokenURI, setTokenURI] = useState(DEFAULT_METADATA_URL);
const [contractAddress, setContractAddress] = useState("");
const [inputMode, setInputMode] = useState<"select" | "manual">("select");

// Wagmi hooks
const { address, isConnected } = useAccount();
const { writeContract, data: hash, error, isPending } = useWriteContract();
const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
```

**Key Functions**:

```typescript
const handleMint = async () => {
  writeContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "mintNFT",
    args: [address, tokenURI],
  });
};
```

---

## Web3 Integration

### Wagmi Configuration

**File**: `mint/wagmi.config.ts`

```typescript
import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
```

### RainbowKit Setup

**File**: `mint/app/providers.tsx`

```typescript
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#3dd9eb",
            accentColorForeground: "white",
          })}
          coolMode
          locale="en-US"
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### Contract ABI

**File**: `mint/app/constants/contract.ts`

```typescript
import { parseAbi } from "viem";

export const CONTRACT_ABI = parseAbi([
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function balanceOf(address owner) public view returns (uint256)",
]);

export const DEFAULT_CONTRACT = "0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C";
export const ETHERSCAN_BASE_URL = "https://sepolia.etherscan.io";
export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
```

---

## Testing

### Smart Contract Testing

Create test file: `deployment/test/UNSC42.test.js`

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UNSC42 Contract", function () {
  let unsc42, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const UNSC42 = await ethers.getContractFactory("UNSC42");
    unsc42 = await UNSC42.deploy(owner.address);
    await unsc42.waitForDeployment();
  });

  it("Should set the correct name and symbol", async function () {
    expect(await unsc42.name()).to.equal("UNSC-42");
    expect(await unsc42.symbol()).to.equal("UNSC");
  });

  it("Should mint NFT to recipient", async function () {
    const tokenURI = "ipfs://QmTest/1.json";
    await unsc42.mintNFT(addr1.address, tokenURI);

    expect(await unsc42.ownerOf(1)).to.equal(addr1.address);
    expect(await unsc42.tokenURI(1)).to.equal(tokenURI);
  });

  it("Should only allow owner to mint", async function () {
    await expect(
      unsc42.connect(addr1).mintNFT(addr1.address, "ipfs://test")
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should increment token IDs", async function () {
    await unsc42.mintNFT(addr1.address, "ipfs://1.json");
    await unsc42.mintNFT(addr1.address, "ipfs://2.json");

    expect(await unsc42.ownerOf(1)).to.equal(addr1.address);
    expect(await unsc42.ownerOf(2)).to.equal(addr1.address);
    expect(await unsc42.balanceOf(addr1.address)).to.equal(2);
  });
});
```

**Run tests**:

```bash
cd deployment
npx hardhat test
```

---

## Gas Optimization

### Deployment Cost

**Estimated Gas**: ~2,500,000 gas  
**Cost on Sepolia**: ~0.0025 ETH (free testnet)

### Minting Cost

**Gas per mint**: ~150,000-200,000 gas

**Factors affecting gas**:

- URI length (longer = more expensive)
- Network congestion
- Gas price at time of transaction

### Optimization Strategies

1. **Use IPFS**: Store metadata off-chain
2. **Batch operations**: Implement batch minting if needed
3. **Minimize storage**: Don't store unnecessary data on-chain
4. **Use events**: Cheaper than storage for historical data

---

## Contract Events

### Transfer Event

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
```

Emitted when:

- Token is minted (`from` = address(0))
- Token is transferred
- Token is burned (`to` = address(0))

### MetadataUpdate Event (IERC4906)

```solidity
event MetadataUpdate(uint256 tokenId);
```

Emitted when token metadata is updated.

---

## Security Considerations

See [SECURITY.md](./SECURITY.md) for comprehensive security documentation.

**Key Points**:

- ✅ Only owner can mint (access control)
- ✅ OpenZeppelin audited libraries
- ✅ No reentrancy vulnerabilities
- ✅ Standard ERC-721 implementation
- ✅ Testnet deployment (no financial risk)

---

## Additional Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)

---

_For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)_  
_For minting guide, see [MINTING.md](./MINTING.md)_
