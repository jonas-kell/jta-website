<template>
    <h1 v-if="appStore.standalone">Just in Time Association - JTA</h1>
    <h2 v-if="appStore.standalone">Leichtathletik Zeitmessung in Schwaben</h2>
    <br />

    <img src="/src/public/Title-Image-JTA.jpg" class="title-image" v-if="appStore.standalone" />
    <img src="/src/public/Title-Image-BLV.jpg" class="title-image" v-else />

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
    <p>
        <a href="https://www.viele-schaffen-mehr.de/projekte/zeitmessanlage-schwaben" target="_blank">Spendencampagne</a> (2025)
    </p>

    <br />
    <br />
    <img v-if="appStore.standalone" src="/src/public/just-in-time-association-logo.svg" class="small-image" />
    <br />
    <br />
    <br />
    <br />

    <img v-if="appStore.standalone" src="/src/public/Logo-Schwaben.png" class="small-image" />
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";

    const appStore = useAppStore();
</script>

<style scoped>
    .title-image {
        max-width: 70%;
        max-height: 40vh;

        min-height: 200px;
    }
</style>
