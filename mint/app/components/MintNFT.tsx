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
import { MetadataSelector } from "./MetadataSelector";
import { CONTRACT_ABI, DEFAULT_CONTRACT } from "../constants/contract";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_METADATA_URL = "https://plum-select-octopus-670.mypinata.cloud/ipfs/bafkreifvaqx7lbu6noz6vajqkvn5onix4r46yvxttcw62iqsprr3q2kn24";

export function MintNFT() {
  const [tokenURI, setTokenURI] = useState(DEFAULT_METADATA_URL);
  const [contractAddress, setContractAddress] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [inputMode, setInputMode] = useState<"select" | "manual">("select");

  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    metadata,
    isLoading: loadingMetadata,
    error: metadataError,
  } = useNFTMetadata(tokenURI);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMounted(true);
    const savedAddress = localStorage.getItem('nft-contract-address');
    setContractAddress(savedAddress || DEFAULT_CONTRACT);
  }, []);

  useEffect(() => {
    if (contractAddress && mounted) {
      localStorage.setItem('nft-contract-address', contractAddress);
    }
  }, [contractAddress, mounted]);

  const handleMint = async () => {
    if (!tokenURI || !address || !contractAddress) return;

    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "mintNFT",
        args: [address, tokenURI],
      });
    } catch (err) {
      console.error("Error minting NFT:", err);
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
            <AlertTitle className="text-accent font-mono uppercase tracking-wide">
              Wallet Connection Required
            </AlertTitle>
            <AlertDescription className="text-primary/80 font-mono text-xs mt-2">
              Initialize neural link to proceed
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
            htmlFor="contractAddress"
            className="text-primary font-mono uppercase tracking-wider text-xs"
          >
            → Target Contract Address
          </Label>
          <Input
            id="contractAddress"
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="font-mono text-sm bg-background/50 border-primary/30 focus:border-accent focus:ring-accent/50 transition-all"
          />
          <p className="text-xs text-muted-foreground/60 font-mono flex items-center gap-2">
            <span className="text-accent">▸</span>
            NFT contract address on Sepolia Network
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="tokenURI"
              className="text-primary font-mono uppercase tracking-wider text-xs"
            >
              → Metadata Coordinates
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setInputMode(inputMode === "select" ? "manual" : "select");
                setTokenURI("");
              }}
              className="text-xs font-mono border-primary/30 hover:border-accent hover:text-accent transition-all cursor-pointer"
            >
              {inputMode === "select" ? "Manual Input" : "Select Preset"}
            </Button>
          </div>

          {inputMode === "select" ? (
            <MetadataSelector value={tokenURI} onValueChange={setTokenURI} />
          ) : (
            <Input
              id="tokenURI"
              type="text"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
              placeholder="ipfs://... or https://gateway.pinata.cloud/ipfs/..."
              className="font-mono text-sm bg-background/50 border-primary/30 focus:border-accent focus:ring-accent/50 transition-all"
            />
          )}
          
          <p className="text-xs text-muted-foreground/60 font-mono flex items-center gap-2">
            <span className="text-accent">▸</span>
            {inputMode === "select"
              ? "Select from predefined metadata or switch to manual input"
              : "Input IPFS hash or metadata URL to initialize deployment"}
          </p>
        </div>

        {/* NFT Preview */}
        {loadingMetadata && <LoadingSkeleton />}

        {metadataError && <ErrorMessage message={metadataError} />}

        {metadata && !loadingMetadata && <NFTPreview metadata={metadata} />}

        <Button
          onClick={handleMint}
          disabled={!tokenURI || !contractAddress || !contractAddress.startsWith('0x') || isPending || isConfirming}
          className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent text-background font-bold uppercase tracking-wider animate-neon-glow border-0 transition-all duration-300 cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          size="lg"
        >
          {isConfirming ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Confirming on Blockchain...
            </>
          ) : isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Waiting for Wallet...
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
