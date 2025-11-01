import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MintNFT } from './components/MintNFT'
import { ClearSessionButton } from './components/ClearSessionButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">MyNFT Minter</h1>
            <ClearSessionButton />
          </div>
          <ConnectButton />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mint Your NFT on Sepolia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your wallet and enter your NFT metadata URL to mint your unique digital collectible
          </p>
        </div>

        <MintNFT />

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Contract Address: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}</p>
          <p className="mt-2">Network: Sepolia Testnet</p>
        </div>
      </main>
    </div>
  );
}
