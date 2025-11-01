export interface NFTMetadata {
  name?: string
  description?: string
  image?: string
  attributes?: Array<{
    trait_type: string
    value: string | number
  }>
}

export interface NFTPreviewState {
  metadata: NFTMetadata | null
  isLoading: boolean
  error: string | null
}
