import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, ExternalLink, AlertCircle } from "lucide-react"
import { ETHERSCAN_BASE_URL } from '../constants/contract'

interface TransactionStatusProps {
  hash?: `0x${string}`
  isConfirmed: boolean
  error?: Error | null
}

export function TransactionStatus({ hash, isConfirmed, error }: TransactionStatusProps) {
  return (
    <div className="space-y-4 mt-6">
      {hash && (
        <Alert className="bg-primary/10 border-primary/30 backdrop-blur-sm">
          <ExternalLink className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-mono uppercase tracking-wide">
            ⚡ Transaction Broadcast
          </AlertTitle>
          <AlertDescription className="mt-2">
            <a
              href={`${ETHERSCAN_BASE_URL}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 break-all inline-flex items-center gap-2 font-mono text-xs transition-colors"
            >
              <span>View deployment on Etherscan</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </AlertDescription>
        </Alert>
      )}

      {isConfirmed && (
        <Alert className="border-accent bg-accent/10 backdrop-blur-sm animate-neon-glow">
          <CheckCircle2 className="h-5 w-5 text-accent" />
          <AlertTitle className="text-accent font-mono uppercase tracking-wide">
            ✓ Deployment Complete
          </AlertTitle>
          <AlertDescription className="text-primary/80 font-mono mt-2">
            NFT successfully minted to blockchain. Asset secured.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 backdrop-blur-sm">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-mono uppercase tracking-wide">
            ⚠ System Error
          </AlertTitle>
          <AlertDescription className="font-mono text-xs mt-2">
            {error.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
