import { envConfig } from "../lib/config/env";
import { logout } from "../lib/auth";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  token?: string;
  body?: unknown;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const response = await fetch(`${envConfig.apiBaseUrl}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      logout();
      return new Promise<never>(() => {});
    }
    throw new Error(data?.message || "Request failed");
  }

  return data as T;
}
