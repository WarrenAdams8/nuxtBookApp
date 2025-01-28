import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2';

export const users = sqliteTable('users', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    userId: integer('user_id').notNull().unique(),
    email: text('email').notNull(),
    avatar: text('avatar').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull()
})


export const favourites = sqliteTable('favourites', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(),
    authors: text('authors', { mode: 'json' }).$type<string[]>().notNull(),
    description: text('description').notNull(),
    releaseDate: text('release_date').notNull(),
    categories: text('categories', { mode: 'json' }).$type<string[]>().notNull(),
    price: integer('prices').notNull(),
    image: text('image').notNull(),
    thumbnail: text('thumbnail').notNull(),
    previewLink: text('preview_link').notNull(),
    pageCount: integer('page_count').notNull(),
    userId: integer('user_id').references(() => users.userId).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull()
})



