import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm shadow-violet-500/25 hover:shadow-md hover:shadow-violet-500/40",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm shadow-red-500/25 hover:shadow-md hover:shadow-red-500/40",
        outline: 
          "border-violet-500/50 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10 hover:border-violet-500",
        success:
          "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-500/25 hover:shadow-md hover:shadow-emerald-500/40",
        warning:
          "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/25 hover:shadow-md hover:shadow-amber-500/40",
        info:
          "border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm shadow-blue-500/25 hover:shadow-md hover:shadow-blue-500/40",
        glass:
          "border-white/20 bg-white/10 backdrop-blur-sm text-foreground hover:bg-white/20",
        glow:
          "border-transparent bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm shadow-violet-500/25 animate-glow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
