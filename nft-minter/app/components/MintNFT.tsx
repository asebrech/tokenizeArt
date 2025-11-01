'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseAbi } from 'viem'

const contractABI = parseAbi([
  'function mintNFT(address recipient, string memory tokenURI) public returns (uint256)',
])

export function MintNFT() {
  const [tokenURI, setTokenURI] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

  const handleMint = async () => {
    if (!tokenURI || !address) return
    
    setIsLoading(true)
    try {
      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'mintNFT',
        args: [address, tokenURI],
      })
    } catch (err) {
      console.error('Error minting NFT:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Please connect your wallet to mint an NFT</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
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

      <button
        onClick={handleMint}
        disabled={!tokenURI || isLoading || isConfirming}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
      >
        {isConfirming ? 'Confirming...' : isLoading ? 'Minting...' : 'Mint NFT'}
      </button>

      {hash && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">Transaction Hash:</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm break-all"
          >
            {hash}
          </a>
        </div>
      )}

      {isConfirmed && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 font-semibold">✅ NFT Minted Successfully!</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-700 text-sm">Error: {error.message}</p>
        </div>
      )}
    </div>
  )
}
