'use client'

import { useAccount } from 'wagmi'
import { MintNFT } from './MintNFT'

export function MintNFTWrapper() {
  const { address } = useAccount()
  
  // Force complete remount when address changes
  // This ensures the component fully re-renders after WalletConnect
  return <MintNFT key={address || 'disconnected'} />
}
