-- Adminer 4.6.3 PostgreSQL dump

\connect "tododb";

DROP TABLE IF EXISTS "todo";
DROP SEQUENCE IF EXISTS todo_id_seq;
CREATE SEQUENCE todo_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 58 CACHE 1;

CREATE TABLE "public"."todo" (
    "id" integer DEFAULT nextval('todo_id_seq') NOT NULL,
    "todo_text" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "complete" boolean DEFAULT false,
    "user_id" text NOT NULL,
    CONSTRAINT "todo_id" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2019-04-12 13:16:03.170308+05:30
