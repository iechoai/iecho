import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  verbose: true,
  strict: true,
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["iecho_*"],
} satisfies Config;
