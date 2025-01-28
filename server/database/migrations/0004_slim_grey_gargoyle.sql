PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_favourites` (
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
INSERT INTO `__new_favourites`("id", "title", "authors", "description", "release_date", "categories", "prices", "image", "thumbnail", "preview_link", "page_count", "user_id", "created_at", "updated_at") SELECT "id", "title", "authors", "description", "release_date", "categories", "prices", "image", "thumbnail", "preview_link", "page_count", "user_id", "created_at", "updated_at" FROM `favourites`;--> statement-breakpoint
DROP TABLE `favourites`;--> statement-breakpoint
ALTER TABLE `__new_favourites` RENAME TO `favourites`;--> statement-breakpoint
PRAGMA foreign_keys=ON;