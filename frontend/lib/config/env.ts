export type AppEnv = "local" | "staging" | "production";

const appEnv = (process.env.NEXT_PUBLIC_APP_ENV as AppEnv | undefined) ?? "local";

const apiByEnv: Record<AppEnv, string> = {
  local: process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://localhost:4000",
  staging: process.env.NEXT_PUBLIC_API_URL_STAGING || "http://localhost:4000",
  production: process.env.NEXT_PUBLIC_API_URL_PRODUCTION || "http://localhost:4000",
};

const socketByEnv: Record<AppEnv, string> = {
  local: process.env.NEXT_PUBLIC_SOCKET_URL_LOCAL || apiByEnv.local,
  staging: process.env.NEXT_PUBLIC_SOCKET_URL_STAGING || apiByEnv.staging,
  production: process.env.NEXT_PUBLIC_SOCKET_URL_PRODUCTION || apiByEnv.production,
};

export const envConfig = {
  appEnv,
  apiBaseUrl: apiByEnv[appEnv],
  socketUrl: socketByEnv[appEnv],
};
