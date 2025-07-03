"use client";

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
  className={cn(
    "bg-white border border-gray-300 rounded w-5 h-5 flex items-center justify-center data-[state=checked]:bg-blue-600",
    className
  )}
  {...props}
>
  <CheckboxPrimitive.Indicator>
    <CheckIcon className="text-pink-500 w-4 h-4" />
  </CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
  )
}

export { Checkbox }


