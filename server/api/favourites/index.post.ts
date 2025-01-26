export default eventHandler(async (event) => {



    const body = await readBody(event)

    const { user, book } = body

    const favourite = await useDrizzle().insert(tables.favourites).values({
        userId: user.id,
        book: book
    }).returning().get()

    console.log(favourite)


    return { body }
})