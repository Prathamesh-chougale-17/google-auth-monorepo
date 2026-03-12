import { expo } from "@better-auth/expo";
import { client } from "@tinywins/db";
import { env } from "@tinywins/env/server";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const trustedOrigins = [
  env.CORS_ORIGIN,
  "tinywins://",
  "tinywins://*",
  ...(env.NODE_ENV === "development"
    ? ["exp://", "exp://**", "exp://192.168.*.*:*/**", "http://localhost:8081"]
    : []),
];

export const auth = betterAuth({
  database: mongodbAdapter(client),
  trustedOrigins,
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  ...(env.NODE_ENV === "production"
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
            httpOnly: true,
          },
        },
      }
    : {}),
  plugins: [expo()],
});
