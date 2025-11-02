"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Loader2, Wallet } from "lucide-react";
import { useNFTMetadata } from "../hooks/useNFTMetadata";
import { NFTPreview } from "./NFTPreview";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorMessage } from "./ErrorMessage";
import { TransactionStatus } from "./TransactionStatus";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/contract";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export function MintNFT() {
  const [tokenURI, setTokenURI] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, error } = useWriteContract();
  const {
    metadata,
    isLoading: loadingMetadata,
    error: metadataError,
  } = useNFTMetadata(tokenURI);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMint = async () => {
    if (!tokenURI || !address) return;

    setIsLoading(true);
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "mintNFT",
        args: [address, tokenURI],
      });
    } catch (err) {
      console.error("Error minting NFT:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <Card className="max-w-2xl mx-auto border-primary/20 bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mb-2 bg-primary/20" />
          <Skeleton className="h-4 w-3/4 bg-primary/10" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full bg-primary/10" />
          <Skeleton className="h-12 w-full bg-primary/10" />
        </CardContent>
      </Card>
    );
  }

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto border-primary/20 bg-card/60 backdrop-blur-xl glow-border">
        <CardContent className="pt-6">
          <Alert className="bg-accent/10 border-accent/30">
            <Wallet className="h-5 w-5 text-accent" />
            <AlertDescription className="text-primary font-mono">
              ⚠️ WALLET CONNECTION REQUIRED - Initialize neural link to proceed
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto border-primary/20 bg-card/60 backdrop-blur-xl glow-border">
      <CardHeader className="border-b border-primary/20">
        <CardTitle className="text-3xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            NFT DEPLOYMENT TERMINAL
          </span>
        </CardTitle>
        <CardDescription className="text-primary/60 font-mono text-xs">
          [ INITIALIZE BLOCKCHAIN TRANSACTION SEQUENCE ]
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <Label
            htmlFor="tokenURI"
            className="text-primary font-mono uppercase tracking-wider text-xs"
          >
            → Metadata Coordinates
          </Label>
          <Input
            id="tokenURI"
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            placeholder="ipfs://... or https://gateway.pinata.cloud/ipfs/..."
            className="font-mono text-sm bg-background/50 border-primary/30 focus:border-accent focus:ring-accent/50 transition-all"
          />
          <p className="text-xs text-muted-foreground/60 font-mono flex items-center gap-2">
            <span className="text-accent">▸</span>
            Input IPFS hash or metadata URL to initialize deployment
          </p>
        </div>

        {/* NFT Preview */}
        {loadingMetadata && <LoadingSkeleton />}

        {metadataError && <ErrorMessage message={metadataError} />}

        {metadata && !loadingMetadata && <NFTPreview metadata={metadata} />}

        <Button
          onClick={handleMint}
          disabled={!tokenURI || isLoading || isConfirming}
          className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent text-background font-bold uppercase tracking-wider animate-neon-glow border-0 transition-all duration-300 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          size="lg"
        >
          {isConfirming ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Confirming Deployment...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Initializing Mint...
            </>
          ) : (
            <>Deploy NFT to Blockchain</>
          )}
        </Button>

        <TransactionStatus
          hash={hash}
          isConfirmed={isConfirmed}
          error={error}
        />
      </CardContent>
    </Card>
  );
}
