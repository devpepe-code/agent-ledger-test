import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-tight ring-offset-[#0A0A0F] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Legacy purple — in-app actions */
        default: "bg-[#7C3AED] text-white shadow hover:bg-[#6d31d4]",
        /** High-contrast marketing primary (Vercel-style) */
        primary:
          "bg-white text-black font-semibold shadow-none hover:bg-gray-100",
        outline:
          "border border-white/20 bg-transparent text-white/80 hover:border-white/40 hover:text-white",
        /** Purple glow — use sparingly */
        accent:
          "bg-purple-600 text-white font-semibold shadow-none hover:bg-purple-500 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]",
        ghost: "text-white/80 hover:bg-white/10 hover:text-white",
        destructive: "bg-[#EF4444] text-white hover:bg-[#dc2626]",
        secondary:
          "border border-[#06B6D4]/40 bg-[#06B6D4]/10 text-[#06B6D4] hover:bg-[#06B6D4]/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "min-h-[48px] rounded-lg px-6 py-3 text-sm sm:h-11 sm:px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
