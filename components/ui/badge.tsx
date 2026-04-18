import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#7C3AED]/25 text-[#c4b5fd] ",
        secondary:
          "border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#22d3ee]",
        success:
          "border-[#10B981]/35 bg-[#10B981]/15 text-[#6ee7b7]",
        destructive:
          "border-[#EF4444]/35 bg-[#EF4444]/15 text-[#fca5a5]",
        outline: "border-white/20 text-white/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
