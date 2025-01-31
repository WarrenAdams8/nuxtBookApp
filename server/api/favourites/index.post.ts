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



    return favourite
})

