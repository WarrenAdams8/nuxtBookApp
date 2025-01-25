<script setup lang="ts">
const value = ref("");
const valueDebounced = refDebounced(value, 1000);


const {
    data: bookResponse,
    refresh,
    status,
} = useLazyFetch(
    () =>
        `https://www.googleapis.com/books/v1/volumes?q=${valueDebounced.value}&maxResults=30&filter=paid-ebooks`,
    {
        transform: (data: BooksApiResponse) => useValidatedBooks(data),
        immediate: false,
    },
);

watch(valueDebounced, () => {
    refresh();
});

</script>
<template>
    <div class=" p-10">
        <UInput v-model="value" placeholder="Search..." />
        <div v-if="status === 'pending'">
            <h2>..loading</h2>
        </div>
        <div v-else-if="
            status === 'error' ||
            bookResponse?.totalItems === 0 ||
            valueDebounced === ''
        ">
            <h2>No books found</h2>
        </div>
        <div v-else-if="status === 'success'">
            <div class="grid grid-flow-col grid-rows-4 gap-2">
                <div v-for="book in bookResponse?.items" :key="book.id">
                    <NuxtLink :to="{ name: 'bookDetails-id', params: { id: book.id } }">
                        <h1>{{ book.volumeInfo.title }}</h1>
                        <img :src="book.volumeInfo.imageLinks.thumbnail" alt="book cover" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>

</template>