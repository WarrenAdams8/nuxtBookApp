<script lang="ts">
const { data } = await useFetch('/api/stripe/sync-stripe', {
    immediate: true
})

navigateTo('/')
</script>
<template>
    <div>Cancelled!!</div>
</template>