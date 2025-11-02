export interface ParsedError {
  title: string
  message: string
  isUserRejection: boolean
}

export function parseTransactionError(error: Error): ParsedError {
  const errorMsg = error.message.toLowerCase()
  
  // User cancelled
  if (errorMsg.includes('user rejected') || errorMsg.includes('user denied')) {
    return {
      title: 'Transaction Cancelled',
      message: 'You cancelled the transaction.',
      isUserRejection: true
    }
  }
  
  // Insufficient funds
  if (errorMsg.includes('insufficient funds')) {
    return {
      title: 'Insufficient Funds',
      message: 'Not enough ETH in your wallet.',
      isUserRejection: false
    }
  }
  
  // Unauthorized (owner-only functions)
  if (errorMsg.includes('ownable') || errorMsg.includes('unauthorized')) {
    return {
      title: 'Unauthorized',
      message: 'Only the contract owner can perform this action.',
      isUserRejection: false
    }
  }
  
  // Generic contract revert
  if (errorMsg.includes('revert')) {
    return {
      title: 'Transaction Failed',
      message: 'The contract rejected this transaction.',
      isUserRejection: false
    }
  }
  
  // Default - show first line of error
  return {
    title: 'Error',
    message: error.message.split('\n')[0].slice(0, 100),
    isUserRejection: false
  }
}
