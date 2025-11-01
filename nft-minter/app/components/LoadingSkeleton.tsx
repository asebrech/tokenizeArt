import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <Skeleton className="w-full h-64 rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
