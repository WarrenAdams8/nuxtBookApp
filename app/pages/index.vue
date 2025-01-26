<script setup lang="ts">
const value = ref("");
const valueDebounced = refDebounced(value, 1000);

const { loggedIn, user, clear } = useUserSession();

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

const signOut = async () => {
    clear();
};


</script>
<template>
    <div class="p-10">
        <UInput v-model="value" placeholder="Search..." variant="soft" />
        <div v-if="!loggedIn" class="m-3 hello">
            <UButton to="/auth/github" icon="i-simple-icons-github" label="Login with GitHub" color="neutral" size="md"
                class="m-3" external />
            <UButton to="/auth/google" icon="i-simple-icons-google" label="Login with Google" color="neutral" size="md"
                class="m-3" external />
        </div>
        <div v-else-if="loggedIn">
            <UButton label="Sign out" class="m-3" @click="signOut" color="neutral" />
            <pre>{{ user }}</pre>
        </div>

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