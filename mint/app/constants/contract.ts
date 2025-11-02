import { parseAbi } from "viem";

export const DEFAULT_CONTRACT = "0xfc5DdA410ba54A9c404Cf034ef260e0FB40ffb95";

export const CONTRACT_ABI = parseAbi([
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
]);

export const ETHERSCAN_BASE_URL = "https://sepolia.etherscan.io";

export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
