import { parseAbi } from "viem";

export const DEFAULT_CONTRACT = "0x318784B9CFa2Ed6Cf91e54915933A55bf1EFC65C";

export const CONTRACT_ABI = parseAbi([
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
]);

export const ETHERSCAN_BASE_URL = "https://sepolia.etherscan.io";

export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
