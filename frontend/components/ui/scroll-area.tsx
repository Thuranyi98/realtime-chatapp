import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
};

export function ScrollArea({ children, className, viewportClassName }: ScrollAreaProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn("h-full w-full overflow-auto", viewportClassName)}>{children}</div>
    </div>
  );
}
