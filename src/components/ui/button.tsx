import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.375rem] text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-brand-accent)] text-[var(--color-gray-lightest)] hover:bg-[var(--color-brand-accent-hover)] hover:text-[var(--color-gray-lightest)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-md)] focus:bg-[var(--color-brand-accent-focus)] focus:shadow-[0_0_0_4px_var(--color-brand-accent-transparent-20)]",
        secondary: "bg-[var(--color-gray-lightest)] text-[var(--color-gray-heading)] border border-[var(--color-gray-border)] hover:bg-[var(--color-gray-light)] hover:text-[var(--color-gray-heading)] hover:border-[var(--color-gray-text)]",
        customOrder: "bg-[var(--color-brand-custom-order)] text-[var(--color-gray-lightest)] hover:bg-[var(--color-brand-custom-order-hover)] hover:text-[var(--color-gray-lightest)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-md)] focus:bg-[var(--color-brand-custom-order-focus)] focus:shadow-[0_0_0_4px_var(--color-brand-custom-order-transparent-20)]",
        darkRed: "bg-[var(--color-brand-accent)] text-white hover:bg-[var(--color-brand-accent-hover)] hover:text-white hover:translate-y-[-1px] hover:shadow-[var(--shadow-md)] focus:bg-[var(--color-brand-accent-focus)] focus:shadow-[0_0_0_4px_var(--color-brand-accent-transparent-20)]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
