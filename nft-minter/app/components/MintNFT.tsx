'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useNFTMetadata } from '../hooks/useNFTMetadata'
import { NFTPreview } from './NFTPreview'
import { LoadingSkeleton } from './LoadingSkeleton'
import { ErrorMessage } from './ErrorMessage'
import { TransactionStatus } from './TransactionStatus'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract'

export function MintNFT() {
  const [tokenURI, setTokenURI] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, error } = useWriteContract()
  const { metadata, isLoading: loadingMetadata, error: metadataError } = useNFTMetadata(tokenURI)
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMint = async () => {
    if (!tokenURI || !address) return
    
    setIsLoading(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintNFT',
        args: [address, tokenURI],
      })
    } catch (err) {
      console.error('Error minting NFT:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Please connect your wallet to mint an NFT</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mint Your NFT</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Token URI (IPFS URL or Metadata URL)
        </label>
        <input
          type="text"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          placeholder="https://ipfs.io/ipfs/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-2 text-xs text-gray-500">
          Enter the IPFS URL or metadata URL for your NFT
        </p>
      </div>

      {/* NFT Preview */}
      {loadingMetadata && (
        <div className="mb-6">
          <LoadingSkeleton />
        </div>
      )}

      {metadataError && (
        <div className="mb-6">
          <ErrorMessage message={metadataError} />
        </div>
      )}

      {metadata && !loadingMetadata && (
        <div className="mb-6">
          <NFTPreview metadata={metadata} />
        </div>
      )}

      <button
        onClick={handleMint}
        disabled={!tokenURI || isLoading || isConfirming}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
      >
        {isConfirming ? 'Confirming...' : isLoading ? 'Minting...' : 'Mint NFT'}
      </button>

      <TransactionStatus 
        hash={hash}
        isConfirmed={isConfirmed}
        error={error}
      />
    </div>
  )
}
