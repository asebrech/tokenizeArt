import { parseAbi } from "viem";

export const DEFAULT_CONTRACT = "0xEd93110b4b0D1dC2DBDd66182FDa9aB738d28f99";

export const CONTRACT_ABI = parseAbi([
  "function mintNFT(address recipient, string memory tokenURI) public returns (uint256)",
]);

export const ETHERSCAN_BASE_URL = "https://sepolia.etherscan.io";

export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
