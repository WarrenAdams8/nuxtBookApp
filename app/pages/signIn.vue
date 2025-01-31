<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();


const signOut = async () => {
    clear();
};

</script>
<template>
    <h1>sign in</h1>
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

</template>