"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-zinc-900 !border-zinc-700 !text-white !shadow-lg",
          description: "!text-zinc-400",
          actionButton: "!bg-white !text-zinc-900",
          cancelButton: "!bg-zinc-800 !text-zinc-300",
          error: "!border-red-900/50 !bg-red-950/80",
          success: "!border-emerald-900/50 !bg-emerald-950/60",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
