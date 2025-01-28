export default eventHandler(async (event) => {

    const { user } = await requireUserSession(event)


    const body = await readBody(event)

    const { book } = body

    const favourite = await useDrizzle().insert(tables.favourites).values({
        id: book.id,
        title: book.title,
        authors: book.authors,
        description: book.description,
        releaseDate: book.releaseDate,
        categories: book.categories,
        price: book.price,
        image: book.image,
        thumbnail: book.thumbnail,
        previewLink: book.previewLink,
        pageCount: book.pageCount,
        userId: user.id,
    }).returning().get()

    console.log(favourite)


    return favourite
})

// export const favourites = sqliteTable('favourites', {
//     id: text('id').primaryKey().$defaultFn(() => createId()),
//     title: text('title').notNull(),
//     authors: text('authors', { mode: 'json' }).$type<string[]>().notNull(),
//     description: text('description').notNull(),
//     releaseDate: text('release_date').notNull(),
//     categories: text('categories', { mode: 'json' }).$type<string[]>().notNull(),
//     price: integer('prices').notNull(),
//     image: text('image').notNull(),
//     thumbnail: text('thumbnail').notNull(),
//     previewLink: text('preview_link').notNull(),
//     pageCount: integer('page_count').notNull(),
//     userId: integer('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
//     createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
//     updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull()
// })
