# 🚀 Deployment Guide

Complete guide for deploying the UNSC-42 NFT smart contract to the Ethereum Sepolia testnet.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Contract Compilation](#contract-compilation)
4. [Deployment Process](#deployment-process)
5. [Contract Verification](#contract-verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Keys

#### 1. Alchemy Account (RPC Provider)

- Visit [https://www.alchemy.com](https://www.alchemy.com)
- Sign up for a free account
- Create a new app:
  - **Chain**: Ethereum
  - **Network**: Sepolia
- Copy your **API Key** from the app dashboard

#### 2. MetaMask Wallet

- Install [MetaMask](https://metamask.io/) browser extension
- Create a new wallet or import existing
- Switch network to **Sepolia Test Network**
  - Click network dropdown
  - Enable "Show test networks" in settings
  - Select "Sepolia"

#### 3. Sepolia Test ETH

Get free test ETH from faucets:

- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [Chainlink Faucet](https://faucets.chain.link/sepolia)

**Amount needed**: ~0.1 Sepolia ETH (sufficient for deployment + verification)

#### 4. Etherscan API Key

- Visit [https://etherscan.io](https://etherscan.io)
- Create an account
- Navigate to [API Keys](https://etherscan.io/myapikey)
- Create a new API key

### Required Software

- **Node.js**: v18.x or higher

  ```bash
  node --version  # Should output v18.0.0 or higher
  ```

- **npm**: v9.x or higher
  ```bash
  npm --version   # Should output v9.0.0 or higher
  ```

---

## Environment Setup

### Step 1: Install Dependencies

```bash
# Navigate to the project root
cd tokenizeArt

# Install all workspace dependencies
npm install

# Navigate to deployment workspace
cd deployment
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `deployment/` folder:

```bash
# Copy the example file
cp .env.example .env

# Edit with your favorite editor
nano .env
```

Fill in your credentials:

```bash
# Alchemy RPC URL (replace YOUR_ALCHEMY_API_KEY)
API_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"

# Your wallet private key (WITHOUT 0x prefix)
# ⚠️ NEVER commit this file to Git! It's in .gitignore
PRIVATE_KEY="your_private_key_here"

# Etherscan API key for contract verification
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
```

### Step 3: Export Your Private Key from MetaMask

⚠️ **SECURITY WARNING**: Only use testnet wallets for development!

1. Open MetaMask
2. Click account menu (top right)
3. Select "Account details"
4. Click "Show private key"
5. Enter your password
6. Copy the private key (remove the `0x` prefix)
7. Paste into `.env` file

**Security Checklist**:

- ✅ `.env` is in `.gitignore`
- ✅ Never share your private key
- ✅ Use a separate wallet for testnet
- ✅ Never use this private key for mainnet

---

## Contract Compilation

### Step 1: Review the Smart Contract

The contract is located at `code/UNSC42.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UNSC42 is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor(address initialOwner)
        ERC721("UNSC-42", "UNSC")
        Ownable(initialOwner)
    {}

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

**Key Features**:

- **ERC721URIStorage**: NFT standard with metadata URI storage
- **Ownable**: Only contract owner can mint
- **Auto-incrementing IDs**: Token IDs start at 1

### Step 2: Compile the Contract

```bash
# From the deployment/ folder
npm run compile
```

**Expected Output**:

```
Compiled 1 Solidity file successfully (evm target: paris).
```

**Artifacts Generated**:

- `artifacts/code/UNSC42.sol/UNSC42.json` - Contract ABI and bytecode
- `cache/solidity-files-cache.json` - Compilation cache

If you encounter errors, see [Troubleshooting](#troubleshooting) section.

---

## Deployment Process

### Step 1: Review Deployment Script

The deployment script (`deployment/deploy.js`) performs:

1. Deploys contract with deployer address as owner
2. Waits for 5 block confirmations
3. Automatically verifies contract on Etherscan

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const UNSC42 = await ethers.getContractFactory("UNSC42");
  const unsc42 = await UNSC42.deploy(deployer.address);

  await unsc42.waitForDeployment();

  const contractAddress = await unsc42.getAddress();
  console.log("Contract deployed to:", contractAddress);

  // Wait for confirmations
  await unsc42.deploymentTransaction().wait(5);

  // Auto-verify on Etherscan
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [deployer.address],
  });
}
```

### Step 2: Deploy to Sepolia

```bash
# From deployment/ folder
npm run deploy
```

**Expected Output**:

```
Deploying contract with account: 0xYourAddress...

Contract deployed to address: 0xNewContractAddress...

Waiting for block confirmations...

Verifying contract on Etherscan...
Successfully submitted source code for contract
contracts/UNSC42.sol:UNSC42 at 0xNewContractAddress
for verification on the block explorer. Waiting for verification result...

Contract verified successfully!
```

### Step 3: Save Contract Address

**IMPORTANT**: Copy and save the contract address from the output!

You'll need it for:

- Frontend configuration
- Interacting with the contract
- Documentation
- Evaluation demonstration

Example: `0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C`

---

## Contract Verification

### Automatic Verification

The deployment script automatically verifies your contract on Etherscan. If successful, you'll see:

```
Contract verified successfully!
```

### View on Etherscan

Visit your contract on Etherscan:

```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

**Verified Contract Features**:

- ✅ Source code is visible
- ✅ "Read Contract" tab available
- ✅ "Write Contract" tab available
- ✅ Contract is marked with a green checkmark

### Manual Verification (If Automatic Fails)

If automatic verification fails, verify manually:

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS "YOUR_DEPLOYER_ADDRESS"
```

Example:

```bash
npx hardhat verify --network sepolia 0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C "0xYourDeployerAddress"
```

---

## Post-Deployment Steps

### 1. Update Frontend Configuration

Update the contract address in your frontend:

**File**: `mint/app/constants/contract.ts`

```typescript
export const DEFAULT_CONTRACT = "0xYourNewContractAddress";
```

### 2. Test Contract Functions

On Etherscan, test the contract:

1. Go to "Read Contract" tab
2. Try `name()` - Should return "UNSC-42"
3. Try `symbol()` - Should return "UNSC"
4. Try `owner()` - Should return your deployer address

### 3. Update Documentation

Update the contract address in:

- `README.md`
- Frontend UI (if hardcoded)
- Any documentation files

### 4. Document Deployment Details

Record for evaluation:

```
Contract: UNSC42
Address: 0xYourContractAddress
Network: Sepolia Testnet
Deployer: 0xYourDeployerAddress
Block: #BlockNumber
Transaction: 0xDeploymentTxHash
Etherscan: https://sepolia.etherscan.io/address/0xYourContractAddress
```

---

## Troubleshooting

### Error: "insufficient funds for intrinsic transaction cost"

**Cause**: Not enough Sepolia ETH in your wallet

**Solution**:

1. Visit a Sepolia faucet
2. Request test ETH
3. Wait for confirmation
4. Retry deployment

### Error: "nonce has already been used"

**Cause**: Transaction conflict or MetaMask nonce issue

**Solution**:

```bash
# Clear Hardhat cache
rm -rf cache artifacts

# Recompile
npm run compile

# Try deployment again
npm run deploy
```

Or reset MetaMask account:

- MetaMask → Settings → Advanced → Clear activity tab data

### Error: "invalid API key"

**Cause**: Incorrect or missing Etherscan API key

**Solution**:

1. Verify API key in `.env` file
2. Ensure no extra spaces or quotes
3. Generate a new API key if needed

### Error: "network sepolia is not defined"

**Cause**: Hardhat configuration issue

**Solution**:
Check `hardhat.config.js` has Sepolia network configured:

```javascript
networks: {
  sepolia: {
    url: process.env.API_URL,
    accounts: [`0x${process.env.PRIVATE_KEY}`]
  }
}
```

### Verification Fails

**Manual verification command**:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "DEPLOYER_ADDRESS"
```

**If still failing**:

- Wait a few minutes (Etherscan may be delayed)
- Check your Etherscan API key is valid
- Verify you're using the correct constructor arguments

### Gas Estimation Failed

**Cause**: RPC issues or network congestion

**Solution**:

1. Check Alchemy API key is correct
2. Try again after a few minutes
3. Check Sepolia network status

---

## Best Practices

### Before Deployment

- ✅ Review contract code thoroughly
- ✅ Test on local Hardhat network first
- ✅ Ensure sufficient testnet ETH
- ✅ Double-check `.env` configuration
- ✅ Verify `.env` is in `.gitignore`

### During Deployment

- ✅ Monitor transaction in MetaMask
- ✅ Save deployment transaction hash
- ✅ Wait for block confirmations
- ✅ Verify automatic verification succeeds

### After Deployment

- ✅ Save contract address securely
- ✅ Test contract functions on Etherscan
- ✅ Update frontend configuration
- ✅ Update documentation
- ✅ Test minting functionality

---

## Next Steps

After successful deployment:

1. **Test the Contract**: See [TECHNICAL.md](./TECHNICAL.md) for testing instructions
2. **Mint NFTs**: Follow [MINTING.md](./MINTING.md) for minting guide
3. **Security Review**: Read [SECURITY.md](./SECURITY.md) for security considerations

---

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Etherscan Verification Guide](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify)
- [Alchemy Tutorials](https://docs.alchemy.com/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

---

_Need help? Review the troubleshooting section or consult the Hardhat documentation._
