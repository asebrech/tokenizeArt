import { useState, useEffect } from 'react'
import { NFTMetadata } from '../types/nft'
import { IPFS_GATEWAY } from '../constants/contract'

interface UseNFTMetadataResult {
  metadata: NFTMetadata | null
  isLoading: boolean
  error: string | null
}

/**
 * Custom hook to fetch and parse NFT metadata from a given URI
 * Supports IPFS URLs (ipfs://) and HTTP/HTTPS URLs
 */
export function useNFTMetadata(tokenURI: string): UseNFTMetadataResult {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenURI) {
        setMetadata(null)
        setError(null)
        return
      }

      // Validate URL format
      if (!tokenURI.startsWith('http://') && 
          !tokenURI.startsWith('https://') && 
          !tokenURI.startsWith('ipfs://')) {
        setError('Invalid URL. Please use http://, https://, or ipfs://')
        setMetadata(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const fetchURL = convertIPFSUrl(tokenURI)
        console.log('Fetching metadata from:', fetchURL)

        const response = await fetch(fetchURL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const contentType = response.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          throw new Error('Response is not JSON. Please provide a valid metadata URL.')
        }

        const data: NFTMetadata = await response.json()
        
        // Validate metadata has required fields
        if (!data.image && !data.name && !data.description) {
          throw new Error('Invalid metadata format. Missing image, name, or description.')
        }
        
        // Convert image IPFS URL if needed
        if (data.image) {
          data.image = convertIPFSUrl(data.image)
        }
        
        console.log('Metadata loaded successfully:', data)
        setMetadata(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error fetching metadata:', errorMessage)
        setError(`Failed to load metadata: ${errorMessage}`)
        setMetadata(null)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce the fetch to avoid too many requests
    const timer = setTimeout(fetchMetadata, 500)
    return () => clearTimeout(timer)
  }, [tokenURI])

  return { metadata, isLoading, error }
}

/**
 * Converts IPFS URLs to HTTP gateway URLs
 */
function convertIPFSUrl(url: string): string {
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', IPFS_GATEWAY)
  }
  return url
}
