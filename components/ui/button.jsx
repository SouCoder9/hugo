import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-violet-500/50 bg-transparent text-foreground hover:bg-violet-500/10 hover:border-violet-500 hover:text-violet-500 dark:hover:text-violet-400",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md",
        ghost: 
          "hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400",
        link: 
          "text-violet-600 dark:text-violet-400 underline-offset-4 hover:underline",
        glow:
          "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 animate-glow hover:scale-[1.02] active:scale-[0.98]",
        glass:
          "bg-white/10 backdrop-blur-lg border border-white/20 text-foreground hover:bg-white/20 hover:border-white/30",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
