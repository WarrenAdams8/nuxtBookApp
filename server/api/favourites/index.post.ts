export default eventHandler(async (event) => {



    const body = await readBody(event)

    const { user, book } = body

    console.log(book)


    return { body }
})