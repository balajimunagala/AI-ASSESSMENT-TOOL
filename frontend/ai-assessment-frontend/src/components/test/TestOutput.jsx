import { Terminal, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "../ui-stubs"
import { useState } from "react"

const cn = (...classes) => classes.filter(Boolean).join(" ")

export function TestOutput({ output, isRunning }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div
      className={cn(
        "border-t border-border bg-card transition-all duration-200",
        isExpanded ? "h-[200px]" : "h-10"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Output</span>
          {isRunning && (
            <span className="text-xs text-primary animate-pulse">
              Running...
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Output Content */}
      {isExpanded && (
        <div className="h-[calc(100%-40px)] overflow-auto p-4 font-mono text-sm">
          {isRunning ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Executing code...</span>
            </div>
          ) : output ? (
            <pre className="whitespace-pre-wrap text-foreground/90">
              {output}
            </pre>
          ) : (
            <span className="text-muted-foreground">
              Click &quot;Run&quot; to execute your code and see the output here.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
