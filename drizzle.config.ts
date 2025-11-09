import { defineConfig } from "drizzle-kit";
import "./envConfig";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
