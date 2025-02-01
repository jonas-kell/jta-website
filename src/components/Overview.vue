<template>
    <h3>Start</h3>

    <p>
        {{ appStore.displayTitle }}
    </p>

    <router-link to="calendar">Cal</router-link>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";

    const appStore = useAppStore();
</script>

<style scoped></style>
