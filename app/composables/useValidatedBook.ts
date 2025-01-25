import type { Book } from "~~/shared/types/BookTypes"
import { bookSchema } from "~~/shared/types/BookTypes"

const defaultBook: Book = {
    kind: "empty",
    id: "0",
    etag: "0",
    selfLink: "default",
    volumeInfo: {
        title: "Unknown Title",
        subtitle: "",
        authors: ["Unknown"],
        publisher: "",
        publishedDate: "",
        description: "No description",
        industryIdentifiers: [],
        readingModes: {
            text: false,
            image: false
        },
        pageCount: 0,
        printType: "",
        categories: ["N/A"],
        averageRating: 0,
        ratingsCount: 0,
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "preview-1.0.0",
        panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
        },
        imageLinks: {
            smallThumbnail: "",
            thumbnail: "",
            image: ""
        },
        language: "en",
        previewLink: "",
        infoLink: "",
        canonicalVolumeLink: ""
    },
    saleInfo: {
        country: "default",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
        listPrice: {
            amount: 0,
            currencyCode: "USD"
        },
        retailPrice: {
            amount: 0,
            currencyCode: "USD"
        },
        buyLink: "",
        offers: []
    },
    accessInfo: {
        country: "",
        viewability: "NO_PAGES",
        embeddable: false,
        publicDomain: false,
        textToSpeechPermission: "NOT_ALLOWED",
        epub: {
            isAvailable: false,
            acsTokenLink: ""
        },
        pdf: { isAvailable: false, acsTokenLink: "" },
        webReaderLink: "",
        accessViewStatus: "NONE",
        quoteSharingAllowed: false
    }
}

export const useValidatedBook = (data: Book): Book => {
    const validatedBooks = bookSchema.safeParse(data)
    if (!validatedBooks.success) {
        console.error(validatedBooks.error.errors)
        return defaultBook
    }
    return validatedBooks.data
}