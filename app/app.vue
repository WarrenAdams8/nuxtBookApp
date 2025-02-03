<script setup lang="ts">
const { loggedIn, clear } = useUserSession();

const { data } = await useFetch('/api/stripe/get-sub-data', {
  immediate: true
})

alert("Make sure Stripe Listner on")

console.log(data.value)


</script>
<template>
  <div class="flex justify-center mx-auto m-3">
    <NuxtLink to="/" class="px-3.5">Home</NuxtLink>
    <NuxtLink to="/favourites" class="px-3.5">favourites</NuxtLink>
    <NuxtLink to="/subscribe" class="px-3.5">subscribe</NuxtLink>
    <div v-if="!loggedIn">
      <NuxtLink to="/signIn" class="px-3.5">sign In</NuxtLink>
    </div>
    <div v-else-if="loggedIn">
      <UButton label="Sign out" class="px-3.5" @click="clear" color="neutral" />
      <h1>{{ data?.status }}</h1>
    </div>

  </div>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
