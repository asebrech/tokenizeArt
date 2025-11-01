import { ETHERSCAN_BASE_URL } from '../constants/contract'

interface TransactionStatusProps {
  hash?: `0x${string}`
  isConfirmed: boolean
  error?: Error | null
}

export function TransactionStatus({ hash, isConfirmed, error }: TransactionStatusProps) {
  return (
    <>
      {hash && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">Transaction Hash:</p>
          <a
            href={`${ETHERSCAN_BASE_URL}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm break-all"
          >
            {hash}
          </a>
        </div>
      )}

      {isConfirmed && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 font-semibold">✅ NFT Minted Successfully!</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-700 text-sm">Error: {error.message}</p>
        </div>
      )}
    </>
  )
}
