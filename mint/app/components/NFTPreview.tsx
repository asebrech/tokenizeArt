import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NFTMetadata } from '../types/nft'

interface NFTPreviewProps {
  metadata: NFTMetadata
}

export function NFTPreview({ metadata }: NFTPreviewProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/30 glow-border">
      <CardHeader className="border-b border-primary/20">
        <CardTitle className="flex items-center gap-3 font-mono uppercase tracking-wider">
          <span className="text-accent">◉</span>
          <span className="text-primary">Asset Preview</span>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 uppercase text-xs">
            ⚡ Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {metadata.image && (
          <div className="relative overflow-hidden rounded-lg border-2 border-primary/30 bg-background/50 p-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <div className="relative rounded-lg overflow-hidden border border-primary/20">
              <Image 
                src={metadata.image} 
                alt={metadata.name || 'NFT Preview'} 
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
            {/* Hologram scan line effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-pulse" 
                   style={{ marginTop: '30%' }} />
            </div>
          </div>
        )}
        
        {metadata.name && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">Asset Designation</p>
            <h4 className="text-2xl font-bold text-primary glow-text">{metadata.name}</h4>
          </div>
        )}
        
        {metadata.description && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">Description</p>
            <CardDescription className="text-base text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-4">
              {metadata.description}
            </CardDescription>
          </div>
        )}
        
        {metadata.attributes && metadata.attributes.length > 0 && (
          <div className="space-y-4">
            <h5 className="text-sm font-mono uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="text-accent">▸</span>
              Asset Properties
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {metadata.attributes.map((attr, index) => (
                <Card key={index} className="bg-background/30 border-primary/20 hover:border-accent/40 transition-all">
                  <CardContent className="p-4">
                    <p className="text-xs text-accent/60 uppercase tracking-wider font-mono mb-1">
                      {attr.trait_type}
                    </p>
                    <p className="text-sm font-bold text-primary">{attr.value}</p>
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
