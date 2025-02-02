<template>
    <h3>
        <router-link to="/">Zurück zur Übersicht</router-link>
    </h3>

    <h2>Kontakt</h2>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";

    const appStore = useAppStore();
</script>

<style scoped></style>
