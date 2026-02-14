import * as React from "react";
import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
          variant === "default" && "bg-gradient-to-br from-ink via-slate to-ink px-4 py-2 text-white shadow-lg",
          variant === "outline" && "border border-slate/20 bg-white/80 px-4 py-2 text-slate",
          variant === "ghost" && "px-2 py-2 text-slate hover:bg-slate/10",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
