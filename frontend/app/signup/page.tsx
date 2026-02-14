"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerApi } from "../../api/auth";
import { AuthShell } from "../../components/auth/AuthShell";
import { PasswordField } from "../../components/auth/PasswordField";
import { Button } from "../../components/ui/button";
import { FormError, FormItem, FormLabel } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import type { Role } from "../../lib/types/chat";
import { useForm } from "../../lib/hooks/useForm";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<{ email: string; password: string; role: Role }>({ email: "", password: "", role: "USER" });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    form.clearErrors();
    if (!form.values.email) form.setError("email", "Email is required");
    if (!form.values.password) form.setError("password", "Password is required");
    if (!form.values.email || !form.values.password) return;

    await form.submit(async (values) => {
      try {
        await registerApi(values);
        router.push("/login");
      } catch (submitError) {
        setError((submitError as Error).message);
      }
    });
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Start a real-time chat session."
      footer={<button onClick={() => router.push("/login")} className="mt-4 w-full text-center text-sm text-slate underline">Already have an account? Sign in</button>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="you@example.com" value={form.values.email} onChange={(e) => form.setValue("email", e.target.value)} />
          <FormError error={form.errors.email} />
        </FormItem>
        <FormItem>
          <FormLabel>Password</FormLabel>
          <PasswordField placeholder="Create a password" value={form.values.password} onChange={(value) => form.setValue("password", value)} />
          <FormError error={form.errors.password} />
        </FormItem>
        <FormItem>
          <FormLabel>Role</FormLabel>
          <Select value={form.values.role} onChange={(e) => form.setValue("role", e.target.value as Role)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </Select>
        </FormItem>
        {error && <p className="text-sm text-rose">{error}</p>}
        <Button type="submit" disabled={form.isSubmitting} className="w-full">{form.isSubmitting ? "Creating..." : "Sign up"}</Button>
      </form>
    </AuthShell>
  );
}
