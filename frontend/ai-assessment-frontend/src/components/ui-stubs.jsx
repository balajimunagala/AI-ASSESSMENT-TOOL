import React, { createContext, useContext, useMemo, useState } from "react"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

function buttonClasses({ variant, size }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "bg-transparent hover:bg-muted/50",
    outline: "border border-border bg-transparent hover:bg-muted/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  }

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1.5",
    icon: "h-9 w-9",
  }

  return cn(base, variants[variant] ?? variants.default, sizes[size] ?? sizes.default)
}

export function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className,
  disabled,
  onClick,
  type,
  children,
  ...rest
}) {
  const cls = cn(buttonClasses({ variant, size }), className)

  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children)
    const childProps = child.props || {}
    const mergedOnClick = (e) => {
      childProps.onClick?.(e)
      onClick?.(e)
    }

    return React.cloneElement(child, {
      ...rest,
      ...childProps,
      className: cn(childProps.className, cls),
      onClick: onClick || childProps.onClick ? mergedOnClick : childProps.onClick,
      "aria-disabled": disabled ? true : childProps["aria-disabled"],
      tabIndex: disabled ? -1 : childProps.tabIndex,
    })
  }

  return (
    <button
      type={type ?? "button"}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Card({ className, children }) {
  return <div className={cn("rounded-lg border border-border bg-background", className)}>{children}</div>
}
export function CardContent({ className, children }) {
  return <div className={cn("p-6", className)}>{children}</div>
}
export function CardHeader({ className, children }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)}>{children}</div>
}
export function CardTitle({ className, children }) {
  return <div className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</div>
}

export function Badge({ variant = "default", className, children, ...rest }) {
  const base =
    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium"

  const variants = {
    default: "border-transparent bg-secondary text-secondary-foreground",
    outline: "bg-transparent",
  }

  const cls = cn(base, variants[variant] ?? variants.default, className)
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  )
}

export function Input({ className, ...rest }) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      {...rest}
    />
  )
}

export function Avatar({ className, children }) {
  return <div className={cn("inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-secondary", className)}>{children}</div>
}
export function AvatarImage() {
  // Not used by your components (they only use AvatarFallback).
  return null
}
export function AvatarFallback({ className, children }) {
  return <div className={cn("flex h-full w-full items-center justify-center bg-secondary text-sm", className)}>{children}</div>
}

// --- Tabs ---
const TabsContext = createContext(null)

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue)
  const ctx = useMemo(() => ({ value, setValue }), [value])
  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
}

export function TabsList({ className, children }) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>
}

export function TabsTrigger({ value, className, children, ...rest }) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  const { value: active, setValue } = ctx
  const isActive = active === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50",
        className
      )}
      onClick={() => setValue(value)}
      {...rest}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}

// --- Select ---
const SelectContext = createContext(null)

function extractSelectItems(children) {
  const items = []
  const walk = (node) => {
    React.Children.forEach(node, (child) => {
      if (!React.isValidElement(child)) return
      if (child.type && child.type.__selectItem === true) {
        items.push({ value: child.props.value, label: child.props.children })
        return
      }
      walk(child.props?.children)
    })
  }
  walk(children)
  return items
}

export function Select({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)

  const items = useMemo(() => extractSelectItems(children), [children])
  const labelByValue = useMemo(() => {
    const map = {}
    for (const item of items) map[item.value] = item.label
    return map
  }, [items])

  const ctx = useMemo(() => ({ value, setValue, open, setOpen, labelByValue }), [value, open, labelByValue])
  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>
}

export function SelectTrigger({ className, children, ...rest }) {
  const ctx = useContext(SelectContext)
  if (!ctx) return null

  return (
    <button
      type="button"
      className={cn(
        "inline-flex w-full items-center justify-between rounded-md border border-border bg-background px-3 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={() => ctx.setOpen(!ctx.open)}
      {...rest}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder }) {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  const label = ctx.labelByValue[ctx.value]
  return <span className={cn(!label && placeholder ? "text-muted-foreground" : undefined)}>{label ?? placeholder ?? ctx.value}</span>
}

export function SelectContent({ className, children }) {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  if (!ctx.open) return null
  return (
    <div
      className={cn(
        "mt-1 max-h-60 overflow-auto rounded-md border border-border bg-background shadow-md z-50",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SelectItem({ value, className, children, ...rest }) {
  const ctx = useContext(SelectContext)
  if (!ctx) return null
  const isActive = ctx.value === value

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center px-3 py-2 text-sm text-left transition-colors hover:bg-muted/50",
        isActive ? "bg-muted" : "",
        className
      )}
      onClick={() => {
        ctx.setValue(value)
        ctx.setOpen(false)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
SelectItem.__selectItem = true

// --- DropdownMenu ---
const DropdownContext = createContext(null)

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  const ctx = useMemo(() => ({ open, setOpen }), [open])
  return <DropdownContext.Provider value={ctx}>{children}</DropdownContext.Provider>
}

export function DropdownMenuTrigger({ asChild, children }) {
  const ctx = useContext(DropdownContext)
  if (!ctx) return null

  const toggle = () => ctx.setOpen(!ctx.open)

  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children)
    return React.cloneElement(child, {
      onClick: (e) => {
        child.props.onClick?.(e)
        toggle()
      },
    })
  }

  return <button type="button" onClick={toggle}>{children}</button>
}

export function DropdownMenuContent({ align = "start", className, children }) {
  const ctx = useContext(DropdownContext)
  if (!ctx || !ctx.open) return null
  const pos = align === "end" ? "right-0" : "left-0"
  return (
    <div className={cn("absolute mt-2 w-56 rounded-md border border-border bg-background shadow-md", pos, className)}>
      {children}
    </div>
  )
}

export function DropdownMenuItem({ className, children, onClick, ...rest }) {
  const ctx = useContext(DropdownContext)
  return (
    <button
      type="button"
      className={cn("flex w-full items-center px-3 py-2 text-sm hover:bg-muted/50", className)}
      onClick={(e) => {
        onClick?.(e)
        ctx?.setOpen(false)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator() {
  return <div className="h-px my-1 bg-border" />
}

export function DropdownMenuLabel({ className, children }) {
  return <div className={cn("px-3 py-2 text-sm font-medium", className)}>{children}</div>
}

// --- Sheet (mobile drawer) ---
const SheetContext = createContext(null)

export function Sheet({ children }) {
  const [open, setOpen] = useState(false)
  const ctx = useMemo(() => ({ open, setOpen }), [open])
  return <SheetContext.Provider value={ctx}>{children}</SheetContext.Provider>
}

export function SheetTrigger({ asChild, children }) {
  const ctx = useContext(SheetContext)
  if (!ctx) return null
  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children)
    return React.cloneElement(child, {
      onClick: (e) => {
        child.props.onClick?.(e)
        ctx.setOpen(true)
      },
    })
  }
  return <button type="button" onClick={() => ctx.setOpen(true)}>{children}</button>
}

export function SheetContent({ side = "left", className, children }) {
  const ctx = useContext(SheetContext)
  if (!ctx || !ctx.open) return null
  const sideCls = side === "left" ? "left-0" : "right-0"
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={() => ctx.setOpen(false)} />
      <div className={cn("absolute top-0 h-full w-64 bg-background border-r border-border p-0", sideCls, className)}>
        {children}
      </div>
    </div>
  )
}

// --- AlertDialog ---
const AlertDialogContext = createContext(null)

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false)
  const ctx = useMemo(() => ({ open, setOpen }), [open])
  return <AlertDialogContext.Provider value={ctx}>{children}</AlertDialogContext.Provider>
}

export function AlertDialogTrigger({ asChild, children }) {
  const ctx = useContext(AlertDialogContext)
  if (!ctx) return null
  if (asChild && React.isValidElement(children)) {
    const child = React.Children.only(children)
    return React.cloneElement(child, {
      onClick: (e) => {
        child.props.onClick?.(e)
        ctx.setOpen(true)
      },
    })
  }
  return <button type="button" onClick={() => ctx.setOpen(true)}>{children}</button>
}

export function AlertDialogContent({ children }) {
  const ctx = useContext(AlertDialogContext)
  if (!ctx || !ctx.open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={() => ctx.setOpen(false)} />
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-background p-4 shadow-lg">
        {children}
      </div>
    </div>
  )
}

export function AlertDialogHeader({ children }) {
  return <div className="mb-2 space-y-1">{children}</div>
}
export function AlertDialogFooter({ children }) {
  return <div className="mt-4 flex items-center justify-end gap-2">{children}</div>
}
export function AlertDialogTitle({ children }) {
  return <div className="text-base font-semibold">{children}</div>
}
export function AlertDialogDescription({ children }) {
  return <div className="text-sm text-muted-foreground">{children}</div>
}

export function AlertDialogCancel({ children, ...rest }) {
  const ctx = useContext(AlertDialogContext)
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted/50"
      onClick={(e) => {
        rest.onClick?.(e)
        ctx?.setOpen(false)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export function AlertDialogAction({ children, onClick, ...rest }) {
  const ctx = useContext(AlertDialogContext)
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      onClick={(e) => {
        onClick?.(e)
        ctx?.setOpen(false)
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

// (No non-component exports to keep Fast Refresh happy)

