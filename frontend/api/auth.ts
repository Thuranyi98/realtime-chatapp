import { apiRequest } from "./base";
import type { Role } from "../lib/types/chat";

type LoginResponse = {
  token: string;
  role: Role;
  userId: string;
};

export function loginApi(payload: { email: string; password: string }) {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function registerApi(payload: { email: string; password: string; role: Role }) {
  return apiRequest<{ status: string }>("/api/auth/register", {
    method: "POST",
    body: payload,
  });
}
