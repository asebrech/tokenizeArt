# 🔒 Security Guide

Comprehensive security documentation for the UNSC-42 NFT project covering smart contract security, operational security, and best practices.

---

## Table of Contents

1. [Smart Contract Security](#smart-contract-security)
2. [Access Control](#access-control)
3. [Ownership Verification](#ownership-verification)
4. [Frontend Security](#frontend-security)
5. [Operational Security](#operational-security)
6. [Best Practices](#best-practices)
7. [Security Checklist](#security-checklist)

---

## Smart Contract Security

### Security Model Overview

The UNSC42 contract implements a **permission-based security model** with the following principles:

1. **Least Privilege**: Only the owner can mint tokens
2. **Audited Code**: Uses OpenZeppelin's battle-tested libraries
3. **Simplicity**: Minimal custom code reduces attack surface
4. **Transparency**: Verified source code on Etherscan

### OpenZeppelin Dependencies

All security-critical functionality comes from **OpenZeppelin Contracts v5.4.0**, which are:

- ✅ **Audited** by multiple security firms
- ✅ **Battle-tested** with billions in secured value
- ✅ **Community-reviewed** by thousands of developers
- ✅ **Actively maintained** with security patches

**Dependencies**:

```solidity
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

### No Common Vulnerabilities

The contract is **NOT vulnerable** to:

#### ✅ Reentrancy Attacks

- No external calls during state changes
- Simple minting logic with no callbacks
- No Ether handling

#### ✅ Integer Overflow/Underflow

- Solidity ^0.8.0 has built-in overflow protection
- No unchecked arithmetic operations

#### ✅ Access Control Issues

- OpenZeppelin's `Ownable` pattern
- Explicit `onlyOwner` modifier on mint function

#### ✅ Front-Running

- No price-sensitive operations
- No Dutch auctions or time-based mechanics

#### ✅ Denial of Service

- No loops over unbounded arrays
- No blocking operations

---

## Access Control

### Owner Privileges

The contract owner has **exclusive rights** to:

1. **Mint NFTs**: Call `mintNFT()` function
2. **Transfer Ownership**: Call `transferOwnership()`
3. **Renounce Ownership**: Call `renounceOwnership()`

**Code Implementation**:

```solidity
function mintNFT(address recipient, string memory tokenURI)
    public
    onlyOwner  // ← Access control modifier
    returns (uint256)
{
    // Minting logic
}
```

### Verifying Contract Owner

**Via Etherscan**:

1. Visit contract on Etherscan
2. Go to "Read Contract" tab
3. Call `owner()` function
4. Compare with your wallet address

**Via Code**:

```javascript
const owner = await contract.owner();
console.log("Contract owner:", owner);
```

**Via Frontend**:

```typescript
const { data: owner } = useReadContract({
  address: contractAddress,
  abi: CONTRACT_ABI,
  functionName: "owner",
});
```

### Transferring Ownership

**⚠️ WARNING**: Only transfer ownership to a trusted address!

**Steps**:

1. Connect with current owner wallet
2. Call `transferOwnership(newOwner)`
3. New owner must accept (if using `Ownable2Step`)

**Example**:

```solidity
contract.transferOwnership("0xNewOwnerAddress");
```

**Consequences**:

- Previous owner **loses all privileges**
- New owner gains minting rights
- **Cannot be undone** without new owner cooperation

### Renouncing Ownership

**⚠️ CRITICAL WARNING**: This makes the contract **permanently ownerless**!

**Consequences**:

- **No one can mint new tokens** ever again
- Contract becomes immutable
- Cannot be reversed

**When to use**:

- Only for finalized collections
- Never recommended for this project

```solidity
contract.renounceOwnership(); // ⚠️ DANGEROUS
```

---

## Ownership Verification

### Purpose

The `ownerOf()` function allows **anyone** to verify who owns a specific NFT.

### Function Signature

```solidity
function ownerOf(uint256 tokenId) public view returns (address)
```

### Usage Examples

#### Via Etherscan

1. Go to contract on Etherscan
2. Navigate to "Read Contract" tab
3. Find `ownerOf` function
4. Enter token ID (e.g., `1`)
5. Click "Query"
6. Result shows owner address

**Example**:

```
Input: tokenId = 1
Output: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

#### Via Web3 Script

```javascript
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  ["function ownerOf(uint256) view returns (address)"],
  provider
);

const owner = await contract.ownerOf(1);
console.log(`Token #1 owner: ${owner}`);
```

#### Via Frontend (Wagmi)

```typescript
import { useReadContract } from "wagmi";

function OwnerDisplay({ tokenId }: { tokenId: number }) {
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });

  return <div>Owner: {owner}</div>;
}
```

### Error Handling

**If token doesn't exist**:

```
Error: ERC721: invalid token ID
```

This means:

- Token ID hasn't been minted yet
- Token ID was burned (not applicable in this contract)

---

## Frontend Security

### Wallet Connection Security

**Safe Practices**:

- ✅ Always verify you're on the correct website
- ✅ Check the network (Sepolia testnet)
- ✅ Review transaction details before signing
- ✅ Never share your seed phrase
- ✅ Use hardware wallets for mainnet

**RainbowKit Protection**:

- Secure wallet connection flow
- Network verification
- Transaction simulation (when available)

### Transaction Security

#### Before Signing

**Always verify**:

1. **Contract address** matches your deployed contract
2. **Function name** is `mintNFT`
3. **Parameters** are correct (recipient, tokenURI)
4. **Gas fee** is reasonable (~0.001-0.003 ETH)
5. **Network** is Sepolia (not mainnet!)

**MetaMask Display**:

```
Contract: 0x3187...C65C
Function: mintNFT
To: 0x742d...bEb
TokenURI: ipfs://Qm...
Gas: 0.002 ETH
```

#### User Actions

**The frontend requires explicit user approval for**:

- Wallet connection
- Network switching
- Transaction signing
- Token approvals (for transfers)

**No transaction happens without your consent!**

### Error Messages

The frontend sanitizes errors to prevent:

- Information leakage
- Confusing technical jargon
- Security details exposure

**Example**:

```typescript
// Raw error (not shown to user)
"execution reverted: ERC721: caller is not owner nor approved";

// User-friendly message (shown to user)
"You don't have permission to perform this action";
```

### Input Validation

**Frontend validates**:

- ✅ Ethereum addresses (checksum validation)
- ✅ IPFS URI format (`ipfs://` prefix)
- ✅ Contract address format
- ✅ Network compatibility

**TypeScript type safety**:

```typescript
// Ensures address is valid format
address: contractAddress as `0x${string}`;
```

---

## Operational Security

### Private Key Management

**CRITICAL RULES**:

1. **Never commit private keys to Git**

   - ✅ `.env` is in `.gitignore`
   - ✅ Use `.env.example` for templates

2. **Use separate wallets for testnet**

   - Don't use your mainnet wallet
   - Testnet wallets can use simpler passwords

3. **Never share your private key**

   - No one legitimate will ask for it
   - Not even "support" teams

4. **For mainnet (NOT THIS PROJECT)**:
   - Use hardware wallets (Ledger, Trezor)
   - Use multi-signature wallets
   - Never store keys in cloud storage

### Environment Variables

**Secure `.env` setup**:

```bash
# deployment/.env

# ✅ GOOD: Testnet credentials
API_URL="https://eth-sepolia.g.alchemy.com/v2/..."
PRIVATE_KEY="testnet_key_without_0x"
ETHERSCAN_API_KEY="public_api_key"

# ❌ BAD: Never do this
MAINNET_PRIVATE_KEY="real_money_key"
PASSWORD="mypassword123"
```

**Verification**:

```bash
# Check .env is ignored
git status

# Should NOT show .env file
```

### Network Security

**Testnet vs Mainnet**:

| Network | Use Case            | Cost    | Risk |
| ------- | ------------------- | ------- | ---- |
| Sepolia | ✅ This project     | Free    | None |
| Mainnet | ❌ Not for learning | Real $$ | High |

**Always verify network**:

```javascript
const network = await provider.getNetwork();
console.log("Network:", network.name);
// Expected: "sepolia"
```

**In MetaMask**:

- Top center shows network name
- Must show "Sepolia test network"
- If it shows "Ethereum Mainnet" → STOP!

---

## Best Practices

### For Smart Contracts

1. **Use Audited Libraries**

   - ✅ OpenZeppelin for all standard functionality
   - Avoid custom implementations of standards

2. **Keep It Simple**

   - Complex code = more attack surface
   - Minimize custom logic

3. **Test Thoroughly**

   - Write unit tests for all functions
   - Test edge cases and failure modes

4. **Verify on Etherscan**

   - Makes code transparent
   - Enables community review
   - Builds trust

5. **Document Everything**
   - Clear comments in code
   - Comprehensive external documentation

### For Deployment

1. **Start with Testnet**

   - ✅ Always test on Sepolia first
   - Never deploy to mainnet without testing

2. **Verify Environment**

   - Check `.env` variables
   - Verify network configuration
   - Confirm sufficient test ETH

3. **Save Deployment Info**

   - Contract address
   - Transaction hash
   - Block number
   - Deployer address

4. **Test After Deployment**
   - Call view functions
   - Perform test mints
   - Verify ownership

### For Users

1. **Verify URLs**

   - Check you're on the correct website
   - Look for HTTPS padlock
   - Bookmark official site

2. **Review Transactions**

   - Always check details before signing
   - Verify contract address
   - Check gas fees

3. **Protect Seed Phrase**

   - Write it down offline
   - Store in secure location
   - Never share with anyone
   - Never type into websites

4. **Use Reputable Wallets**
   - MetaMask, Rainbow, Coinbase Wallet
   - Download from official sources only

---

## Security Checklist

### Pre-Deployment

- [ ] Contract uses OpenZeppelin libraries
- [ ] `.env` file is in `.gitignore`
- [ ] Private key is for testnet wallet only
- [ ] Sufficient Sepolia ETH in wallet
- [ ] Hardhat config verified
- [ ] Contract compiled without errors
- [ ] Network is set to Sepolia

### During Deployment

- [ ] Transaction details reviewed
- [ ] Gas fee is reasonable
- [ ] Deployment transaction confirmed
- [ ] Contract address saved
- [ ] Verification succeeded on Etherscan

### Post-Deployment

- [ ] `owner()` returns your address
- [ ] `name()` returns "UNSC-42"
- [ ] `symbol()` returns "UNSC"
- [ ] Test mint succeeds
- [ ] `ownerOf()` returns correct owner
- [ ] `tokenURI()` returns correct URI
- [ ] Contract verified on Etherscan

### Frontend Security

- [ ] Contract address is correct
- [ ] Network is Sepolia
- [ ] Wallet connection works
- [ ] Transaction errors are handled
- [ ] User can cancel transactions
- [ ] No private keys in code
- [ ] Environment variables secured

### Operational Security

- [ ] `.env` not committed to Git
- [ ] Private key backed up securely
- [ ] Testnet wallet used (not mainnet)
- [ ] Contract address documented
- [ ] Deployment details recorded
- [ ] All team members informed

---

## Incident Response

### If Private Key Compromised

**For Testnet (this project)**:

1. Create new wallet
2. Deploy new contract
3. Update documentation
4. No financial loss (testnet only)

**For Mainnet (future projects)**:

1. Immediately transfer all assets to safe wallet
2. Revoke all token approvals
3. Notify affected parties
4. Investigate breach source
5. Generate new keys from new seed phrase

### If Contract Has Issues

**Cannot modify deployed contract**, but you can:

1. Deploy new corrected version
2. Transfer ownership (if needed)
3. Update frontend to point to new contract
4. Document the issue and fix

### If Wrong Network Deployed

**Testnet deployment**:

- No issue, just redeploy correctly

**Mainnet deployment (accidental)**:

- Costs real money
- Cannot recover gas fees
- Deploy again on correct network

---

## Audit Recommendations

For production/mainnet deployments (not this project):

1. **Professional Audit**

   - Hire security firm
   - Examples: OpenZeppelin, Trail of Bits, ConsenSys Diligence
   - Cost: $5,000-$50,000+

2. **Bug Bounty Program**

   - Immunefi, HackerOne
   - Reward security researchers
   - Crowdsourced security review

3. **Formal Verification**
   - Mathematical proof of correctness
   - Tools: Certora, Mythril
   - For high-value contracts

**Note**: Not required for educational testnet projects.

---

## Security Resources

### Learning

- [Ethereum Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [OpenZeppelin Security Blog](https://blog.openzeppelin.com/security-audits)
- [Smart Contract Weakness Classification](https://swcregistry.io/)

### Tools

- [Slither](https://github.com/crytic/slither) - Static analysis
- [Mythril](https://github.com/ConsenSys/mythril) - Security scanner
- [Echidna](https://github.com/crytic/echidna) - Fuzzer

### Communities

- [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
- [OpenZeppelin Forum](https://forum.openzeppelin.com/)
- [Reddit r/ethdev](https://reddit.com/r/ethdev)

---

## Conclusion

The UNSC42 contract is designed with security as a priority:

- ✅ Uses audited OpenZeppelin libraries
- ✅ Simple, minimal custom code
- ✅ Clear access control
- ✅ Transparent and verified
- ✅ Testnet deployment (no financial risk)

**Remember**: This is an educational project on testnet. No real money is at risk. Always exercise extreme caution when working with mainnet and real assets.

---

_Stay safe and happy minting! 🔒_

---

_For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)_  
_For minting guide, see [MINTING.md](./MINTING.md)_  
_For technical details, see [TECHNICAL.md](./TECHNICAL.md)_
