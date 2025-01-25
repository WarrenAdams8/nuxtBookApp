<script setup lang="ts">
const { id } = useRoute().params

const {
    data: book,
    status,
} = useLazyFetch(
    () =>
        `https://www.googleapis.com/books/v1/volumes/${id}`,
    {
        transform: (data: Book) => useValidatedBook(data)
    },
);

</script>
<template>
    <div>
        <h1 v-if="status === 'pending'" class="p-10">...loading</h1>
        <h1 v-else-if="status === 'error'" class="p-10">Oops no Book Found</h1>

        <div v-else-if="status === 'success'" class="p-10">
            <h1>{{ book?.volumeInfo.title }}</h1>
            <img :src="book?.volumeInfo.imageLinks.image" alt="">
        </div>
    </div>
</template>