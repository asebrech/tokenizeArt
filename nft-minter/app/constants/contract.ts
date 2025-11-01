import { parseAbi } from 'viem'

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export const CONTRACT_ABI = parseAbi([
  'function mintNFT(address recipient, string memory tokenURI) public returns (uint256)',
])

export const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io'

export const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'
