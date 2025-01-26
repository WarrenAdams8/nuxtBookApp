import type { Rawbook,Book } from "~~/shared/types/BookTypes"

export const useValidatedBooks = (data: BooksApiResponse): Book[] => {
    const validatedBooks = booksApiResponseSchema.safeParse(data)
    if (!validatedBooks.success) {
        console.error(validatedBooks.error.errors)
        return []
    }

    const transformedBooks = validatedBooks.data.items?.map((book: Rawbook) => {
        return {
            title: book.volumeInfo.title,
            id: book.id,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            releaseDate: book.volumeInfo.publishedDate,
            categories: book.volumeInfo.categories,
            price: book.saleInfo.listPrice.amount,
            image: book.volumeInfo.imageLinks.image,
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            previewLink: book.volumeInfo.previewLink,
            pageCount: book.volumeInfo.pageCount,
        }
    })

    if (transformedBooks === undefined){
        return []
    }

    return transformedBooks

}