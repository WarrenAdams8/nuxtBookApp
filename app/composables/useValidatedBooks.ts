export const useValidatedBooks = (data: BooksApiResponse): BooksApiResponse => {
    const validatedBooks = booksApiResponseSchema.safeParse(data)
    if (!validatedBooks.success) {
        console.error(validatedBooks.error.errors)
        return {
            kind: "empty",
            totalItems: 0,
            items: [],
            fetchedAt: Date.now()
        }
    }
    return validatedBooks.data

}