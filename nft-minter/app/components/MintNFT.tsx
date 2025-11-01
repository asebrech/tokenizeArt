'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Loader2, Wallet } from 'lucide-react'
import { useNFTMetadata } from '../hooks/useNFTMetadata'
import { NFTPreview } from './NFTPreview'
import { LoadingSkeleton } from './LoadingSkeleton'
import { ErrorMessage } from './ErrorMessage'
import { TransactionStatus } from './TransactionStatus'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants/contract'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to mint an NFT
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Mint Your NFT</CardTitle>
        <CardDescription>
          Upload your metadata and mint your unique NFT on the blockchain
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tokenURI">Token URI</Label>
          <Input
            id="tokenURI"
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            placeholder="https://ipfs.io/ipfs/... or ipfs://..."
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Enter the IPFS URL or metadata URL for your NFT
          </p>
        </div>

        {/* NFT Preview */}
        {loadingMetadata && <LoadingSkeleton />}

        {metadataError && <ErrorMessage message={metadataError} />}

        {metadata && !loadingMetadata && <NFTPreview metadata={metadata} />}

        <Button
          onClick={handleMint}
          disabled={!tokenURI || isLoading || isConfirming}
          className="w-full"
          size="lg"
        >
          {isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming Transaction...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting...
            </>
          ) : (
            'Mint NFT'
          )}
        </Button>

        <TransactionStatus 
          hash={hash}
          isConfirmed={isConfirmed}
          error={error}
        />
      </CardContent>
    </Card>
  )
}
