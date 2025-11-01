import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MintNFT } from './components/MintNFT'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { Particles } from '@/components/ui/shadcn-io/particles'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        staticity={50}
        color="#7b3ff2"
        size={0.8}
      />
      
      <nav className="relative z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">NFT Minter</h1>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-4">
            Sepolia Testnet
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mint Your NFT on Sepolia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect your wallet and enter your NFT metadata URL to mint your unique digital collectible
          </p>
        </div>

        <MintNFT />

        <footer className="mt-16 text-center text-sm text-muted-foreground space-y-2">
          <p className="font-mono">
            Contract: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
          </p>
          <p>Built with Next.js, RainbowKit, and shadcn/ui</p>
        </footer>
      </main>
    </div>
  );
}
