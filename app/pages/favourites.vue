<script setup lang="ts">
const { user } = useUserSession();

const { data: books } = await useFetch('/api/favourites', {
    method: 'GET',
    immediate: true
})


</script>
<template>
    <h1>Favourites</h1>
    <pre>{{ books }}</pre>
</template>