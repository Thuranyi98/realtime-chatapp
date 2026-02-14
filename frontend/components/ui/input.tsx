import * as React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate/60",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
