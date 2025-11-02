import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MintNFT } from "./components/MintNFT";
import { Badge } from "@/components/ui/badge";
import { Rocket, Zap, Shield } from "lucide-react";
import { Particles } from "@/components/ui/shadcn-io/particles";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Space Particles Background - Cyan stars */}
      <Particles
        className="absolute inset-0 opacity-60"
        quantity={180}
        ease={70}
        staticity={40}
        color="#3dd9eb"
        size={1.0}
      />

      {/* Additional particle layer for depth */}
      <Particles
        className="absolute inset-0 opacity-30"
        quantity={100}
        ease={90}
        staticity={60}
        color="#00d4ff"
        size={1.6}
      />

      {/* Gradient overlay for atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-background/50 pointer-events-none" />

      <nav className="relative z-50 border-b border-primary/20 bg-card/40 backdrop-blur-xl supports-[backdrop-filter]:bg-card/30 sticky top-0 glow-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-7 w-7 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
            </div>
            <h1 className="text-2xl font-bold glow-text tracking-wider">
              UNSC NFT FORGE
            </h1>
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-accent animate-pulse" />
            <Badge
              variant="secondary"
              className="text-xs uppercase tracking-widest border-primary/30 bg-primary/10 text-primary font-semibold"
            >
              Sepolia Network Active
            </Badge>
            <Zap className="h-5 w-5 text-accent animate-pulse" />
          </div>

          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight glow-text">
              Deploy Your NFT
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl -z-10 animate-pulse" />
          </div>

          <p className="text-lg md:text-xl text-primary/80 max-w-2xl mx-auto font-light leading-relaxed">
            <Rocket className="inline h-5 w-5 mr-2 text-accent" />
            Initialize deployment sequence. Upload metadata coordinates and mint
            your digital asset to the blockchain.
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center gap-8 mt-8 text-xs text-muted-foreground/60 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>FORGE READY</span>
            </div>
          </div>
        </div>

        <MintNFT />

        <footer className="mt-20 text-center text-xs text-muted-foreground/60 space-y-3 font-mono">
          <div className="flex items-center justify-center gap-2 text-primary/40">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
            <span>UNSC DEPLOYMENT PROTOCOL</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
          <p className="text-muted-foreground/40">
            Powered by Ethereum • Secured by Blockchain • Built for the Future
          </p>
        </footer>
      </main>
    </div>
  );
}
