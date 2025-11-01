import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 backdrop-blur-sm">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="font-mono uppercase tracking-wide text-sm">
        ⚠ Metadata Load Failed
      </AlertTitle>
      <AlertDescription className="font-mono text-xs mt-2 text-destructive-foreground/80">
        {message}
      </AlertDescription>
    </Alert>
  )
}
