import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const favourites = sqliteTable('favourites', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull(),
    book: text('book', { mode: 'json' }).$type<Book>().notNull()
})
