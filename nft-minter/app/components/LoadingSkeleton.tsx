export function LoadingSkeleton() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )
}
