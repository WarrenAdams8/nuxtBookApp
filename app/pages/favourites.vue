<script setup lang="ts">
const { user } = useUserSession();

const { data } = await useFetch('/api/favourites', {
    method: 'GET',
    immediate: true
})


</script>
<template>
    <h1>Favourites</h1>
    <pre>{{ data }}</pre>
</template>