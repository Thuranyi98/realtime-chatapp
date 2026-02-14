import { apiRequest } from "./base";
import type { User } from "../lib/types/chat";

type UsersResponse = { data: User[] };

export function getUsersApi(token: string) {
  return apiRequest<UsersResponse>("/api/users", { token });
}

export function getAdminsApi(token: string) {
  return apiRequest<UsersResponse>("/api/users/admins", { token });
}
