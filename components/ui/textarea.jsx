import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-2 border-border/50 bg-background/50 px-4 py-3 text-base shadow-sm transition-all duration-300 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50 hover:border-violet-500/50 md:text-sm resize-none",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
