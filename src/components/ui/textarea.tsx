import * as React from "react"

import { cn } from "@/utils/shadcn"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2",
        "text-sm text-white placeholder:text-zinc-600",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
