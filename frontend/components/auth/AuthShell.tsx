import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, footer, children }: AuthShellProps) {
  return (
    <main className="auth-gradient flex min-h-screen items-center justify-center px-6 py-10">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-slate">{subtitle}</p>
        <div className="mt-6">{children}</div>
        {footer}
      </div>
    </main>
  );
}
