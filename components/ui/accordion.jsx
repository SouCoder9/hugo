"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item 
    ref={ref} 
    className={cn(
      "border-b border-border/50 transition-colors hover:border-violet-500/30",
      className
    )} 
    {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-5 text-base font-semibold transition-all duration-300 hover:text-violet-500 text-left [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-violet-500",
        className
      )}
      {...props}>
      {children}
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/10 transition-all duration-300 group-hover:bg-violet-500/20">
        <ChevronDown
          className="h-4 w-4 shrink-0 text-violet-500 transition-transform duration-300" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-5 pt-0 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
