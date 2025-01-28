import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2';

export const users = sqliteTable('users', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    userId: integer('user_id').notNull(),
    email: text('email').notNull(),
    avatar: text('avatar').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull()
})


export const favourites = sqliteTable('favourites', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull(),
    book: text('book', { mode: 'json' }).$type<Book>().notNull()
})
