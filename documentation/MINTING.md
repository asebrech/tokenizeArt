# 🎨 NFT Minting Guide

Complete guide for minting UNSC-42 NFTs using both the web interface and direct contract interaction.

---

## Table of Contents

1. [Overview](#overview)
2. [Minting via Web Interface](#minting-via-web-interface)
3. [Preparing NFT Metadata](#preparing-nft-metadata)
4. [Direct Contract Interaction](#direct-contract-interaction)
5. [Verifying Ownership](#verifying-ownership)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The UNSC-42 contract supports minting NFTs with custom metadata stored on IPFS. Only the contract owner can mint new tokens.

**Minting Requirements**:

- ✅ Must be the contract owner
- ✅ Valid recipient Ethereum address
- ✅ IPFS URI pointing to valid metadata
- ✅ Sufficient Sepolia ETH for gas fees

---

## Minting via Web Interface

### Step 1: Start the Frontend Application

```bash
# Navigate to mint workspace
cd mint

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The application will start at `http://localhost:3000`

### Step 2: Connect Your Wallet

1. Open the application in your browser
2. Click **"Connect Wallet"** button in the top-right corner
3. Select your wallet provider (MetaMask, WalletConnect, etc.)
4. Approve the connection in your wallet
5. Ensure you're connected to **Sepolia Test Network**

**Wallet Status Indicator**:

- 🔴 Not connected
- 🟢 Connected - displays address (e.g., `0x1234...5678`)

### Step 3: Configure Contract Address (Optional)

The app comes with a default contract address, but you can change it:

1. Locate the **"Contract Address"** input field
2. Enter your deployed contract address
3. The address is automatically saved to browser localStorage

**Default Contract**: `0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C`

### Step 4: Select or Enter Metadata URI

The application provides two ways to input metadata:

#### Option A: Select from Predefined NFTs (Default)

1. By default, the first predefined NFT is selected
2. Click the dropdown to see all available predefined NFTs
3. Each option shows:
   - **#1, #2, #3** - NFT number
   - **Actual NFT name** - fetched from metadata (e.g., "UNSC-42 #1 - Space Marine")
4. Select any NFT to automatically populate the metadata URI

**Available Predefined NFTs**:

- #1 - First artwork (selected by default)
- #2 - Second artwork
- #3 - Third artwork

#### Option B: Manual Input

1. Click the **"Manual Input"** button (top-right of the metadata field)
2. Enter your custom IPFS metadata URI manually

**Format**: `ipfs://QmYourHashHere/metadata.json` or full gateway URL

**Example**: `https://gateway.pinata.cloud/ipfs/QmHash/metadata.json`

**Important**:

- Must point to valid JSON metadata
- Metadata should follow ERC-721 standard (see [Preparing NFT Metadata](#preparing-nft-metadata))
- Click **"Select Preset"** button to switch back to predefined options

### Step 5: Preview Metadata

As you select or enter the URI, the application will:

1. Automatically fetch metadata from IPFS
2. Display a preview card showing:
   - NFT image
   - Name
   - Description
   - Attributes

**Loading States**:

- ⏳ "Fetching metadata..." - Loading
- 🔄 "Loading..." - Fetching NFT names in dropdown
- ✅ Preview card displayed - Valid metadata
- ❌ Error message - Invalid URI or metadata

### Step 6: Mint the NFT

1. Review the metadata preview
2. Click **"Mint NFT"** button
3. MetaMask will pop up requesting signature
4. Review transaction details:
   - **To**: Contract address
   - **Function**: `mintNFT`
   - **Gas fee**: ~0.001-0.003 Sepolia ETH
5. Click **"Confirm"** in MetaMask

### Step 7: Track Transaction Status

The UI will show transaction progress:

**1. Pending (⏳)**:

```
Transaction Broadcast
Waiting for network confirmation...
Transaction Hash: 0x1234...
View on Etherscan →
```

**2. Confirmed (✅)**:

```
Transaction Confirmed
Your NFT has been minted successfully!
View on Etherscan →
```

**3. Error (❌)**:

```
Transaction Failed
[Error message explaining what went wrong]
```

### Step 8: View Your NFT

After confirmation:

1. Click **"View on Etherscan"** link
2. Find your transaction in the Etherscan explorer
3. Look for the "Tokens Transferred" section
4. See your newly minted token ID

**Example**: Token ID #1, #2, #3 (sequential)

---

## Preparing NFT Metadata

### Metadata Format

NFT metadata must follow the ERC-721 metadata standard:

```json
{
  "name": "UNSC-42 #1 - Spartan Armor",
  "description": "First edition UNSC combat armor NFT from 42 School project",
  "image": "ipfs://QmImageHash/spartan-armor.png",
  "external_url": "https://yourwebsite.com/nft/1",
  "attributes": [
    {
      "trait_type": "Artist",
      "value": "asebrech"
    },
    {
      "trait_type": "Project",
      "value": "42 School"
    },
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    },
    {
      "trait_type": "Edition",
      "value": "Genesis"
    }
  ]
}
```

### Required Fields

| Field         | Type   | Required | Description                             |
| ------------- | ------ | -------- | --------------------------------------- |
| `name`        | string | ✅ Yes   | Must include "42" and descriptive title |
| `description` | string | ✅ Yes   | Description of the NFT                  |
| `image`       | string | ✅ Yes   | IPFS URI to image file                  |
| `attributes`  | array  | ✅ Yes   | Must include artist name (asebrech)     |

### Project Requirements

**Artist Name**:

- Must include an attribute with `"trait_type": "Artist"`
- Value must be `"asebrech"` (your login)

**NFT Name**:

- Must include "42" in the name
- Example: "UNSC-42 #1 - Title"

**Example Valid Names**:

- ✅ "UNSC-42 #1 - Genesis Armor"
- ✅ "42 Spartan Protocol"
- ✅ "UNSC Combat Unit 42"

### Uploading to IPFS

#### Method 1: Pinata (Recommended)

1. Visit [https://pinata.cloud](https://pinata.cloud)
2. Create a free account
3. Click **"Upload"** → **"Folder"**
4. Upload your assets:
   ```
   nft-collection/
   ├── images/
   │   └── 1.png
   └── metadata/
       └── 1.json
   ```
5. Copy the CID (Content Identifier)
6. Your URI: `ipfs://YOUR_CID/metadata/1.json`

#### Method 2: NFT.Storage

1. Visit [https://nft.storage](https://nft.storage)
2. Create account and get API key
3. Upload your metadata and images
4. Get IPFS CID
5. Format: `ipfs://YOUR_CID/metadata.json`

#### Method 3: IPFS Desktop

1. Install [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop/)
2. Add your files to IPFS
3. Pin files for persistence
4. Copy CID from the interface

### Testing Metadata

Before minting, verify your metadata is accessible:

**Test URL**: `https://ipfs.io/ipfs/YOUR_CID/metadata.json`

Replace `YOUR_CID` with your actual IPFS hash.

**Expected Response**: JSON object with your metadata

---

## Direct Contract Interaction

### Via Etherscan (Owner Only)

1. Visit your contract on Etherscan:

   ```
   https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
   ```

2. Navigate to **"Contract"** → **"Write Contract"** tab

3. Click **"Connect to Web3"** and connect your wallet

4. Find the **`mintNFT`** function

5. Enter parameters:

   - **recipient**: `0xRecipientAddress` (can be your own address)
   - **tokenURI**: `ipfs://QmYourHash/metadata.json`

6. Click **"Write"** button

7. Confirm transaction in MetaMask

8. Wait for confirmation

**Advantages**:

- Direct contract interaction
- No frontend needed
- Useful for debugging

**Disadvantages**:

- No metadata preview
- Manual address entry
- Less user-friendly

### Via Hardhat Script

Create a minting script (`mint/mint-nft.js`):

```javascript
require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const recipientAddress = "YOUR_RECIPIENT_ADDRESS";
  const tokenURI = "ipfs://YOUR_METADATA_HASH/metadata.json";

  const [signer] = await ethers.getSigners();
  const UNSC42 = await ethers.getContractAt("UNSC42", contractAddress);

  console.log("Minting NFT...");
  const tx = await UNSC42.mintNFT(recipientAddress, tokenURI);

  console.log("Transaction hash:", tx.hash);

  const receipt = await tx.wait();
  console.log("Minted! Block:", receipt.blockNumber);
}

main().catch(console.error);
```

Run the script:

```bash
npx hardhat run scripts/mint-nft.js --network sepolia
```

---

## Verifying Ownership

### Method 1: Etherscan

1. Visit your contract on Etherscan
2. Go to **"Contract"** → **"Read Contract"** tab
3. Find **`ownerOf`** function
4. Enter the **token ID** (e.g., 1, 2, 3)
5. Click **"Query"**
6. Result shows the owner's address

**Example**:

```
ownerOf(1) → 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

### Method 2: Frontend Application

The app can display NFT ownership:

```typescript
// Using wagmi hook
const { data: owner } = useReadContract({
  address: contractAddress,
  abi: CONTRACT_ABI,
  functionName: "ownerOf",
  args: [tokenId],
});

console.log(`Token #${tokenId} owner:`, owner);
```

### Method 3: Web3 Script

```javascript
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");
const contract = new ethers.Contract(
  "CONTRACT_ADDRESS",
  ["function ownerOf(uint256) view returns (address)"],
  provider
);

const owner = await contract.ownerOf(1);
console.log("Owner:", owner);
```

---

## Transaction Flow Diagram

```
┌─────────────┐
│   User      │
│  (Owner)    │
└──────┬──────┘
       │
       │ 1. Connect Wallet
       ▼
┌─────────────────┐
│   Frontend      │
│  (Next.js App)  │
└──────┬──────────┘
       │
       │ 2. Enter URI
       │ 3. Preview Metadata
       ▼
┌─────────────────┐
│   IPFS          │
│ (Metadata)      │
└──────┬──────────┘
       │
       │ 4. Fetch JSON
       ▼
┌─────────────────┐
│   Frontend      │
│ (Shows Preview) │
└──────┬──────────┘
       │
       │ 5. Click Mint
       ▼
┌─────────────────┐
│   MetaMask      │
│  (Sign Tx)      │
└──────┬──────────┘
       │
       │ 6. Send Transaction
       ▼
┌─────────────────┐
│  Sepolia        │
│  Blockchain     │
└──────┬──────────┘
       │
       │ 7. Execute mintNFT()
       ▼
┌─────────────────┐
│  UNSC42         │
│  Contract       │
└──────┬──────────┘
       │
       │ 8. Mint Token
       │ 9. Emit Transfer Event
       ▼
┌─────────────────┐
│   User          │
│  (NFT Owner)    │
└─────────────────┘
```

---

## Troubleshooting

### Error: "User rejected transaction"

**Cause**: You declined the transaction in MetaMask

**Solution**: Click "Mint NFT" again and approve in MetaMask

---

### Error: "Execution reverted: Ownable: caller is not the owner"

**Cause**: You're not the contract owner

**Solution**:

- Connect with the deployer wallet
- Or transfer ownership first (advanced)

---

### Error: "Cannot read properties of undefined"

**Cause**: Invalid or unreachable IPFS URI

**Solution**:

1. Verify IPFS URI format: `ipfs://QmHash/file.json`
2. Test in browser: `https://ipfs.io/ipfs/QmHash/file.json`
3. Check metadata is properly pinned
4. Try a different IPFS gateway

---

### Error: "Insufficient funds"

**Cause**: Not enough Sepolia ETH for gas

**Solution**: Get more test ETH from Sepolia faucets

---

### Metadata Not Loading

**Causes & Solutions**:

1. **Wrong URI format**

   - ✅ Correct: `ipfs://QmHash/metadata.json`
   - ❌ Wrong: `https://ipfs.io/ipfs/...`

2. **File not pinned**

   - Pin your files on Pinata or NFT.Storage
   - Unpinned files may become unavailable

3. **Gateway timeout**

   - Try a different IPFS gateway
   - Public gateways can be slow

4. **Invalid JSON**
   - Validate your JSON at [jsonlint.com](https://jsonlint.com)
   - Ensure all required fields are present

---

### NFT Not Showing on OpenSea

**Wait Time**: OpenSea can take 5-30 minutes to index new NFTs

**Manual Refresh**:

1. Go to `https://testnets.opensea.io/assets/sepolia/YOUR_CONTRACT/TOKEN_ID`
2. Click the refresh metadata button

**Requirements**:

- Contract must be verified on Etherscan
- Metadata must be accessible
- Image must be accessible via IPFS

---

## Best Practices

### Before Minting

- ✅ Verify metadata JSON is valid
- ✅ Test IPFS URI is accessible
- ✅ Check you're connected as owner
- ✅ Ensure sufficient Sepolia ETH
- ✅ Preview metadata in the UI

### During Minting

- ✅ Review transaction details in MetaMask
- ✅ Check gas fee is reasonable
- ✅ Don't close the browser during transaction
- ✅ Wait for transaction confirmation

### After Minting

- ✅ Save transaction hash
- ✅ Verify ownership with `ownerOf()`
- ✅ Check NFT on Etherscan
- ✅ Wait for OpenSea indexing (optional)
- ✅ Test transfer functionality (optional)

---

## Batch Minting (Advanced)

For minting multiple NFTs, create a script:

```javascript
async function batchMint() {
  const tokenURIs = [
    "ipfs://QmHash1/1.json",
    "ipfs://QmHash2/2.json",
    "ipfs://QmHash3/3.json",
  ];

  for (let i = 0; i < tokenURIs.length; i++) {
    console.log(`Minting NFT ${i + 1}...`);
    const tx = await contract.mintNFT(recipient, tokenURIs[i]);
    await tx.wait();
    console.log(`✅ Minted token #${i + 1}`);
  }
}
```

**Note**: Each transaction requires gas fees and confirmation time.

---

## Next Steps

After minting your NFTs:

1. **Transfer NFTs**: See [TECHNICAL.md](./TECHNICAL.md) for transfer instructions
2. **View on Marketplaces**: Check OpenSea Testnet
3. **Security**: Review [SECURITY.md](./SECURITY.md)

---

## Additional Resources

- [ERC-721 Metadata Standard](https://docs.opensea.io/docs/metadata-standards)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Pinata Cloud](https://pinata.cloud)
- [NFT.Storage](https://nft.storage)

---

_Happy minting! 🎨_
