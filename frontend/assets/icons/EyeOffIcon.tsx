import type { SVGProps } from "react";

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.5 5.2A10.6 10.6 0 0 1 12 5c5 0 9.2 3.2 10.9 7.7a12 12 0 0 1-2.4 3.7" />
      <path d="M6.4 6.4A12 12 0 0 0 1.1 12a12 12 0 0 0 4.2 5.5" />
    </svg>
  );
}
