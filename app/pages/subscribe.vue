<script setup lang="ts">

const { loggedIn } = useUserSession();

const { data } = await useFetch('/api/stripe/get-sub-data')

// checkOut button

const checkout = async () => {
    // 1
    const PRICE_LOOKUP_KEY = 'standard_monthly'
    // 2
    const res = await $fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        body: {
            lookup_key: PRICE_LOOKUP_KEY,
        },
    })

    if (res) {
        // 3
        await navigateTo(res.url, {
            external: true,
        })
    }
}
</script>
<template>
    <h1>Please Subscribe</h1>
    <pre v-if="loggedIn">{{ data }}</pre>
    <UButton v-if="loggedIn" label="Subscribe" class="px-3.5 m-3" @click="checkout" />
    <NuxtLink v-else-if="!loggedIn" to="/signIn" class="m-16">signIn</NuxtLink>

</template>