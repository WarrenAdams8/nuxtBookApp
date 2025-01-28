<script setup lang="ts">
const { user } = useUserSession();

const { data: books, refresh } = await useFetch('/api/favourites', {
    method: 'GET',
    immediate: true
})

const deleteFavourite = async (id: string) => {
    await $fetch(`/api/favourites/${id}`, { method: 'DELETE' })
    refresh()
}


</script>
<template>
    <h1>Favourites</h1>
    <div class="grid grid-flow-col grid-rows-4 gap-2 m-10">
        <div v-for="book in books" :key="book.id">
            <NuxtLink :to="{ name: 'bookDetails-id', params: { id: book.id } }">
                <h1>{{ book.title }}</h1>
                <img :src="book.thumbnail" alt="book cover" />
            </NuxtLink>
            <UButton v-if="user" label="remove from favourites" variant="outline" color="neutral" class="px-6 py-2 mt-2"
                @click="deleteFavourite(book.id)" />
        </div>
    </div>
</template>