CREATE TABLE `bookmarks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`authors` text NOT NULL,
	`description` text NOT NULL,
	`release_date` text NOT NULL,
	`categories` text NOT NULL,
	`prices` integer NOT NULL,
	`image` text NOT NULL,
	`thumbnail` text NOT NULL,
	`preview_link` text NOT NULL,
	`page_count` integer NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `favourites`;