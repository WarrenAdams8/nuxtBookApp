import type { Rawbook, Book } from "~~/shared/types/BookTypes"

const defaultBook: Book = {
    title: "default",
    id: "default",
    authors: ["default"],
    description: "default",
    releaseDate: "default",
    categories: ["default"],
    price: 0,
    image: "default",
    thumbnail: "default",
    previewLink: "default",
    pageCount: 0
}

export const useValidatedBook = (data: Rawbook): Book => {
    const validatedBook = bookSchema.safeParse(data)
    if (!validatedBook.success) {
        console.error(validatedBook.error.errors)
        return defaultBook
    }

    const transformedBook =  {
        title: validatedBook.data.volumeInfo.title,
        id: validatedBook.data.id,
        authors: validatedBook.data.volumeInfo.authors,
        description: validatedBook.data.volumeInfo.description,
        releaseDate: validatedBook.data.volumeInfo.publishedDate,
        categories: validatedBook.data.volumeInfo.categories,
        price: validatedBook.data.saleInfo.listPrice.amount,
        image: validatedBook.data.volumeInfo.imageLinks.image,
        thumbnail: validatedBook.data.volumeInfo.imageLinks.thumbnail,
        previewLink: validatedBook.data.volumeInfo.previewLink,
        pageCount: validatedBook.data.volumeInfo.pageCount,
    }

    return transformedBook
}