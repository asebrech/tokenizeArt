import Image from 'next/image'
import { NFTMetadata } from '../types/nft'

interface NFTPreviewProps {
  metadata: NFTMetadata
}

export function NFTPreview({ metadata }: NFTPreviewProps) {
  return (
    <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">NFT Preview</h3>
      
      {metadata.image && (
        <div className="mb-4 overflow-hidden rounded-lg relative w-full" style={{ minHeight: '300px' }}>
          <Image 
            src={metadata.image} 
            alt={metadata.name || 'NFT Preview'} 
            width={600}
            height={600}
            className="w-full h-auto object-cover rounded-lg"
            unoptimized
          />
        </div>
      )}
      
      {metadata.name && (
        <h4 className="text-xl font-bold text-gray-900 mb-2">{metadata.name}</h4>
      )}
      
      {metadata.description && (
        <p className="text-gray-700 text-sm mb-3">{metadata.description}</p>
      )}
      
      {metadata.attributes && metadata.attributes.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">Attributes:</p>
          <div className="grid grid-cols-2 gap-2">
            {metadata.attributes.map((attr, index) => (
              <div key={index} className="bg-white p-2 rounded border border-gray-200">
                <p className="text-xs text-gray-500">{attr.trait_type}</p>
                <p className="text-sm font-semibold text-gray-900">{attr.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
