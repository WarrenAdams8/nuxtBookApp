CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`email` text NOT NULL,
	`avatar` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
