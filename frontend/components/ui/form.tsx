import type { ReactNode } from "react";

export function FormItem({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function FormLabel({ children }: { children: ReactNode }) {
  return <label className="text-sm font-medium">{children}</label>;
}

export function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-sm text-rose">{error}</p>;
}
