import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `iecho_${name}`);

export const toolTierEnum = pgEnum("tool_tier", ["free", "freemium", "paid"]);
export const contactStatusEnum = pgEnum("contact_status", [
  "new",
  "read",
  "archived",
]);

export const tools = createTable(
  "tools",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    categories: text("categories").array().notNull(),
    tags: text("tags").array().notNull(),
    url: text("url").notNull(),
    icon: text("icon"),
    audience: text("audience").array().notNull(),
    tier: toolTierEnum("tier").notNull(),
    isPopular: boolean("is_popular").default(false).notNull(),
    upvotes: integer("upvotes").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    tierIdx: index("iecho_tools_tier_idx").on(table.tier),
  })
);

export const upvotes = createTable(
  "upvotes",
  {
    id: serial("id").primaryKey(),
    toolId: text("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    fingerprint: text("fingerprint").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    toolFingerprintUnique: uniqueIndex("iecho_upvotes_tool_fingerprint_idx").on(
      table.toolId,
      table.fingerprint
    ),
    toolIdx: index("iecho_upvotes_tool_idx").on(table.toolId),
  })
);

export const collections = createTable(
  "collections",
  {
    id: serial("id").primaryKey(),
    fingerprint: text("fingerprint").notNull(),
    toolIds: text("tool_ids").array().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    fingerprintIdx: index("iecho_collections_fingerprint_idx").on(
      table.fingerprint
    ),
  })
);

export const contacts = createTable(
  "contacts",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    status: contactStatusEnum("status").default("new").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    statusIdx: index("iecho_contacts_status_idx").on(table.status),
  })
);

export type ToolRow = typeof tools.$inferSelect;
export type NewTool = typeof tools.$inferInsert;
export type UpvoteRow = typeof upvotes.$inferSelect;
export type NewUpvote = typeof upvotes.$inferInsert;
export type CollectionRow = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type ContactRow = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
