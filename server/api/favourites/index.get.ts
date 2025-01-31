import { eq } from 'drizzle-orm'
import { favourites } from '~~/server/database/schema'

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)


    // List favourites for the current user
    const result = await useDrizzle()
        .select({
            id: favourites.id,
            title: favourites.title,
            authors: favourites.authors,
            description: favourites.description,
            releaseDate: favourites.releaseDate,
            categories: favourites.categories,
            price: favourites.price,
            image: favourites.image,
            thumbnail: favourites.thumbnail,
            previewLink: favourites.previewLink,
            pageCount: favourites.pageCount
        })
        .from(tables.favourites).where(eq(tables.favourites.userId, user.id))
        .all()

    return result as Book[]

})




