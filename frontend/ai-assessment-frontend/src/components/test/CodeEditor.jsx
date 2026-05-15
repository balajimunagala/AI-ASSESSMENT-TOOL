import { Play, Send, Settings2, RotateCcw } from "lucide-react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui-stubs"

export function CodeEditor({ code, onChange, onRun, onSubmit, isRunning }) {
  const handleReset = () => {
    onChange(`function twoSum(nums, target) {
  // Write your solution here
  
}`)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 border-b border-border">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Select defaultValue="javascript">
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRun}
            disabled={isRunning}
            className="gap-2"
          >
            <Play className="w-4 h-4" />
            Run
          </Button>
          <Button
            size="sm"
            onClick={onSubmit}
            disabled={isRunning}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Submit
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 overflow-auto bg-background">
        <div className="flex min-h-full">
          {/* Line Numbers */}
          <div className="flex-shrink-0 py-4 px-2 text-right select-none bg-secondary/30 border-r border-border">
            {code.split("\n").map((_, i) => (
              <div
                key={i}
                className="text-xs text-muted-foreground font-mono leading-6"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Area */}
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-4 font-mono text-sm leading-6 bg-transparent resize-none focus:outline-none code-editor"
            spellCheck={false}
            placeholder="// Write your code here..."
          />
        </div>
      </div>
    </div>
  )
}
