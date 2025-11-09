import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { passkey } from "better-auth/plugins/passkey";
import { authSchema } from "../db/schema/auth";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...authSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    passkey({
      rpID: process.env.AUTH_RP_ID!,
      rpName: process.env.AUTH_RP_NAME!,
      origin: process.env.AUTH_ORIGIN!,
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "required",
      },
    }),
    nextCookies(),
  ],
});
