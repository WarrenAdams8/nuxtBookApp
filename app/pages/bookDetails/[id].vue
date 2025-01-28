<script setup lang="ts">
import type { Rawbook } from '~~/shared/types/BookTypes';

const { id } = useRoute().params

const { user } = useUserSession();


const {
    data: book,
    status,
} = useLazyFetch(
    () =>
        `https://www.googleapis.com/books/v1/volumes/${id}`,
    {
        transform: (data: Rawbook) => useValidatedBook(data)
    },
);

const addBookToFavourites = () => {
    $fetch('/api/favourites', {
        method: 'POST',
        body: {
            book: book.value
        }
    })
}

</script>
<template>
    <div>
        <h1 v-if="status === 'pending'" class="p-10">...loading</h1>
        <h1 v-else-if="status === 'error'" class="p-10">Oops no Book Found</h1>

        <div v-else-if="status === 'success'" class="p-10">
            <h1>{{ book?.title }}</h1>
            <img :src="book?.image" alt="">
        </div>
        <div>
            <UButton v-if="user" label="Add to Favourites" @click="addBookToFavourites" variant="outline"
                color="neutral" class="px-12 py-4 m-5" />
        </div>
    </div>
</template>