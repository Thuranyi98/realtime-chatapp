/**
 * Clears auth storage and redirects to login.
 * Safe to call from any context (no-op on server).
 */
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  window.location.href = "/login";
}
