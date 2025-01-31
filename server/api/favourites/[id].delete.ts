import { eq, and } from 'drizzle-orm'
import { useValidatedParams, z } from 'h3-zod'

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    const { id } = await useValidatedParams(event, {
        id: z.string()
    })


    const deletedFavourite = await useDrizzle().delete(tables.favourites).where(and(
        eq(tables.favourites.id, id),
        eq(tables.favourites.userId, user.id)
    )).returning().get()


    return id

})


