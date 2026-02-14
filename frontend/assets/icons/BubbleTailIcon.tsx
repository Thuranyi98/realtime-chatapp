import type { SVGProps } from "react";

type BubbleTailIconProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function BubbleTailIcon({ color, ...props }: BubbleTailIconProps) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" {...props}>
      <path d="M0 0 L12 0 L6 8 Z" fill={color} />
    </svg>
  );
}
