# 🔒 Security Guide

Essential security information for the UNSC-42 NFT project.

---

## Table of Contents

1. [Smart Contract Security](#smart-contract-security)
2. [Access Control](#access-control)
3. [Ownership Verification](#ownership-verification)
4. [Operational Security](#operational-security)
5. [Security Checklist](#security-checklist)

---

## Smart Contract Security

### Security Model

The UNSC42 contract uses **OpenZeppelin Contracts v5.4.0**:

- ✅ Audited and battle-tested libraries
- ✅ Simple, minimal custom code
- ✅ Only owner can mint tokens
- ✅ No Ether handling (no reentrancy risk)
- ✅ Solidity ^0.8.0 (built-in overflow protection)

```solidity
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

---

## Access Control

### Owner Privileges

Only the contract owner can:

1. **Mint NFTs**: `mintNFT()` function
2. **Transfer Ownership**: `transferOwnership()`
3. **Renounce Ownership**: `renounceOwnership()` (⚠️ makes contract permanently ownerless)

### Verify Owner

**Etherscan**: Read Contract → `owner()` function

**Code**:
```typescript
const { data: owner } = useReadContract({
  address: contractAddress,
  abi: CONTRACT_ABI,
  functionName: "owner",
});
```

---

## Ownership Verification

### Check NFT Owner

**Etherscan**: Read Contract → `ownerOf(tokenId)` → Enter token ID

**Frontend (Wagmi)**:
```typescript
const { data: owner } = useReadContract({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: "ownerOf",
  args: [BigInt(tokenId)],
});
```

---

## Operational Security

### Private Key Management

**Critical Rules**:

1. **Never commit private keys to Git** (`.env` is in `.gitignore`)
2. **Use separate wallets for testnet** (don't use mainnet wallet)
3. **Never share your private key** (no one legitimate will ask)
4. **For mainnet**: Use hardware wallets (Ledger, Trezor)

### Environment Variables

```bash
# deployment/.env
API_URL="https://eth-sepolia.g.alchemy.com/v2/..."
PRIVATE_KEY="testnet_key_without_0x"
ETHERSCAN_API_KEY="public_api_key"
```

Verify `.env` is not tracked:
```bash
git status  # Should NOT show .env file
```

### Network Verification

| Network | Use Case            | Cost    | Risk |
| ------- | ------------------- | ------- | ---- |
| Sepolia | ✅ This project     | Free    | None |
| Mainnet | ❌ Not for learning | Real $$ | High |

**Always verify** you're on Sepolia testnet before transactions!

---

## Security Checklist

### Pre-Deployment
- [ ] `.env` file in `.gitignore`
- [ ] Private key for testnet wallet only
- [ ] Sufficient Sepolia ETH
- [ ] Network set to Sepolia

### Post-Deployment
- [ ] `owner()` returns your address
- [ ] Test mint succeeds
- [ ] Contract verified on Etherscan

### Frontend
- [ ] Contract address correct
- [ ] Network is Sepolia
- [ ] No private keys in code

### Operational
- [ ] `.env` not committed to Git
- [ ] Testnet wallet used (not mainnet)
- [ ] Contract address documented

---

## Best Practices

1. ✅ Use OpenZeppelin libraries
2. ✅ Always test on Sepolia first
3. ✅ Verify on Etherscan
4. ✅ Never share private keys
5. ✅ Review transactions before signing
6. ✅ Keep it simple

---

**Remember**: This is a testnet educational project. No real money is at risk.

---

_For more details, see [DEPLOYMENT.md](./DEPLOYMENT.md) and [TECHNICAL.md](./TECHNICAL.md)_
