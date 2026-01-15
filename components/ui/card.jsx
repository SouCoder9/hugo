import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-border/50 bg-card text-card-foreground shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-violet-500/30 hover:-translate-y-1",
      className
    )}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-bold leading-none tracking-tight text-lg", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

// New gradient card variant
const GradientCard = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl p-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-1",
      className
    )}>
    <div className="rounded-[14px] bg-card p-6 h-full">
      {props.children}
    </div>
  </div>
))
GradientCard.displayName = "GradientCard"

// Glass card variant
const GlassCard = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-card-foreground shadow-lg transition-all duration-300 hover:bg-white/15 dark:hover:bg-white/10 hover:-translate-y-1",
      className
    )}
    {...props} />
))
GlassCard.displayName = "GlassCard"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, GradientCard, GlassCard }
