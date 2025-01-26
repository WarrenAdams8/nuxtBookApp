import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    // List favourites for the current user
    const favourites = await useDrizzle().select().from(tables.favourites).where(eq(tables.favourites.userId, user.id)).all()

    return favourites

})