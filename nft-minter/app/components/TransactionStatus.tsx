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
    <div className="space-y-4 mt-4">
      {hash && (
        <Alert>
          <ExternalLink className="h-4 w-4" />
          <AlertTitle>Transaction Submitted</AlertTitle>
          <AlertDescription>
            <a
              href={`${ETHERSCAN_BASE_URL}/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all inline-flex items-center gap-1"
            >
              View on Etherscan <ExternalLink className="h-3 w-3" />
            </a>
          </AlertDescription>
        </Alert>
      )}

      {isConfirmed && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800 dark:text-green-200">Success!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
            NFT minted successfully!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
