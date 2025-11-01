import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton() {
  return (
    <Card className="border-primary/20 bg-card/60 backdrop-blur-xl glow-border">
      <CardHeader className="border-b border-primary/20">
        <Skeleton className="h-7 w-48 bg-primary/20" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="relative">
            <Skeleton className="w-full h-64 rounded-lg bg-primary/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-32 bg-primary/10" />
            <Skeleton className="h-7 w-3/4 bg-primary/20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 bg-primary/10" />
            <Skeleton className="h-5 w-full bg-primary/10" />
            <Skeleton className="h-5 w-4/5 bg-primary/10" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-40 bg-primary/10" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-20 bg-primary/10" />
              <Skeleton className="h-20 bg-primary/10" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
