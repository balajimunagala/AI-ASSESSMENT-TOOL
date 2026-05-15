import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Code2, Clock, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
} from "../ui-stubs"

export function TestHeader({ onSubmit }) {
  const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const isLowTime = timeLeft < 10 * 60 // Less than 10 minutes

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold hidden sm:inline">CodeAssess</span>
        </Link>
        
        <div className="h-6 w-px bg-border hidden sm:block" />
        
        <div className="hidden sm:block">
          <h1 className="font-medium text-sm">Senior React Developer</h1>
          <p className="text-xs text-muted-foreground">Question 1 of 3</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            isLowTime
              ? "bg-destructive/10 text-destructive"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="font-mono font-medium text-sm">
            {formatTime(timeLeft)}
          </span>
          {isLowTime && <AlertCircle className="w-4 h-4 animate-pulse" />}
        </div>

        {/* Progress */}
        <Badge variant="outline" className="hidden md:flex">
          1/3 Completed
        </Badge>

        {/* Submit Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Submit Assessment</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Assessment?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to submit your assessment? This action
                cannot be undone. You still have {formatTime(timeLeft)} remaining.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}
