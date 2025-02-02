<template>
    <h1 v-if="appStore.standalone">Leichtathleitk Zeitnahme Anlage Bezirk Schwaben</h1>

    <img src="/Title-Image.jpg" class="title-image" />

    <h2>Übersicht</h2>
    <p>
        <router-link to="calendar">Einsätze / Kalender</router-link>
    </p>
    <p>
        <router-link to="price">Preis / Angebot</router-link>
    </p>
    <p>
        <router-link to="download">Downloads / Materialien</router-link>
    </p>
    <p>
        <router-link to="contact">Kontakt</router-link>
    </p>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";

    const appStore = useAppStore();
</script>

<style scoped>
    .title-image {
        max-width: 75%;
        max-height: 40vh;

        min-height: 200px;
    }
</style>
