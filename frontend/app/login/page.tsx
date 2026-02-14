"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "../../api/auth";
import { AuthShell } from "../../components/auth/AuthShell";
import { PasswordField } from "../../components/auth/PasswordField";
import { Button } from "../../components/ui/button";
import { FormError, FormItem, FormLabel } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useForm } from "../../lib/hooks/useForm";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({ email: "", password: "" });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    form.clearErrors();
    if (!form.values.email) form.setError("email", "Email is required");
    if (!form.values.password) form.setError("password", "Password is required");
    if (!form.values.email || !form.values.password) return;

    await form.submit(async (values) => {
      try {
        const data = await loginApi(values);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);
        router.push("/");
      } catch (submitError) {
        setError((submitError as Error).message);
      }
    });
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access the real-time chat workspace."
      footer={<button onClick={() => router.push("/signup")} className="mt-4 w-full text-center text-sm text-slate underline">New here? Create an account</button>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="you@example.com" value={form.values.email} onChange={(e) => form.setValue("email", e.target.value)} />
          <FormError error={form.errors.email} />
        </FormItem>
        <FormItem>
          <FormLabel>Password</FormLabel>
          <PasswordField placeholder="Enter your password" value={form.values.password} onChange={(value) => form.setValue("password", value)} />
          <FormError error={form.errors.password} />
        </FormItem>
        {error && <p className="text-sm text-rose">{error}</p>}
        <Button type="submit" disabled={form.isSubmitting} className="w-full">{form.isSubmitting ? "Signing in..." : "Login"}</Button>
      </form>
    </AuthShell>
  );
}
