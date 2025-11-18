CREATE TYPE "public"."contact_status" AS ENUM('new', 'read', 'archived');--> statement-breakpoint
CREATE TYPE "public"."tool_tier" AS ENUM('free', 'freemium', 'paid');--> statement-breakpoint
CREATE TABLE "iecho_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"fingerprint" text NOT NULL,
	"tool_ids" text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "iecho_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"status" "contact_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "iecho_tools" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"tags" text[] NOT NULL,
	"url" text NOT NULL,
	"icon" text,
	"audience" text[] NOT NULL,
	"tier" "tool_tier" NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"upvotes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "iecho_upvotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"tool_id" text NOT NULL,
	"fingerprint" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "iecho_upvotes" ADD CONSTRAINT "iecho_upvotes_tool_id_iecho_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."iecho_tools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "iecho_collections_fingerprint_idx" ON "iecho_collections" USING btree ("fingerprint");--> statement-breakpoint
CREATE INDEX "iecho_contacts_status_idx" ON "iecho_contacts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "iecho_tools_category_idx" ON "iecho_tools" USING btree ("category");--> statement-breakpoint
CREATE INDEX "iecho_tools_tier_idx" ON "iecho_tools" USING btree ("tier");--> statement-breakpoint
CREATE UNIQUE INDEX "iecho_upvotes_tool_fingerprint_idx" ON "iecho_upvotes" USING btree ("tool_id","fingerprint");--> statement-breakpoint
CREATE INDEX "iecho_upvotes_tool_idx" ON "iecho_upvotes" USING btree ("tool_id");