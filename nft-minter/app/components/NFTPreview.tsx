import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NFTMetadata } from '../types/nft'

interface NFTPreviewProps {
  metadata: NFTMetadata
}

export function NFTPreview({ metadata }: NFTPreviewProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>NFT Preview</span>
          <Badge variant="secondary">Ready to Mint</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metadata.image && (
          <div className="overflow-hidden rounded-lg border bg-card">
            <Image 
              src={metadata.image} 
              alt={metadata.name || 'NFT Preview'} 
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
        )}
        
        {metadata.name && (
          <h4 className="text-2xl font-bold">{metadata.name}</h4>
        )}
        
        {metadata.description && (
          <CardDescription className="text-base">{metadata.description}</CardDescription>
        )}
        
        {metadata.attributes && metadata.attributes.length > 0 && (
          <div className="space-y-3">
            <h5 className="text-sm font-semibold">Attributes</h5>
            <div className="grid grid-cols-2 gap-3">
              {metadata.attributes.map((attr, index) => (
                <Card key={index}>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {attr.trait_type}
                    </p>
                    <p className="text-sm font-bold mt-1">{attr.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
