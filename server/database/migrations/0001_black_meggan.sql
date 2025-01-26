PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_favourites` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`book` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_favourites`("id", "user_id", "book") SELECT "id", "user_id", "book" FROM `favourites`;--> statement-breakpoint
DROP TABLE `favourites`;--> statement-breakpoint
ALTER TABLE `__new_favourites` RENAME TO `favourites`;--> statement-breakpoint
PRAGMA foreign_keys=ON;