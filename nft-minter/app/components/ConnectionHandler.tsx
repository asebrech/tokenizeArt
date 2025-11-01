'use client'

import { useState } from 'react'
import { useAccountEffect } from 'wagmi'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function ConnectionHandler() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [, forceUpdate] = useState({})

  useAccountEffect({
    onConnect(data) {
      console.log('✅ Wallet connected:', data.address)
      console.log('📱 Connector:', data.connector.name)
      console.log('⛓️  Chain ID:', data.chainId)
      
      // Force React Query to invalidate all queries and refetch
      queryClient.invalidateQueries()
      
      // Force component re-render
      forceUpdate({})
      
      // Give wagmi a moment to fully update internal state
      setTimeout(() => {
        queryClient.refetchQueries()
        forceUpdate({})
        
        // Force Next.js to refresh server components
        router.refresh()
        
        if (typeof window !== 'undefined') {
          // Dispatch events for any other components listening
          window.dispatchEvent(new CustomEvent('wallet-connected', { 
            detail: { 
              address: data.address, 
              connector: data.connector.name,
              chainId: data.chainId 
            }
          }))
          
          // Force visibility change to trigger React Query
          window.dispatchEvent(new Event('visibilitychange'))
        }
        
        // One more router refresh after everything settles
        setTimeout(() => router.refresh(), 100)
      }, 200)
    },
    onDisconnect() {
      console.log('� Wallet disconnected')
      
      queryClient.invalidateQueries()
      forceUpdate({})
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wallet-disconnected'))
      }
    },
  })

  return null
}
