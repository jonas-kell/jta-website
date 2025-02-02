<template>
    <h3>
        <router-link to="/">Zurück zur Übersicht</router-link>
    </h3>

    <h2>Einsätze / Kalender</h2>

    <div class="iframe-container" :class="{ dark: appStore.dark }">
        <iframe
            src="https://calendar.google.com/calendar/embed?src=32f93d13eecfc4cdd9f185dc81d5104dc639c366df70200b8c81d71e69abe123%40group.calendar.google.com&ctz=Europe%2FBerlin&showPrint=0&title=Zeitnahme%20Anlage%20Schwaben&showCalendars=0&showTz=0&mode=AGENDA&color=%23D50000"
            style="border: 0"
            frameborder="0"
            scrolling="no"
            width="100%"
            height="100%"
            class="calendar"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";

    const appStore = useAppStore();
</script>

<style scoped>
    .iframe-container {
        width: 95%;
        height: 70vh;
    }

    .iframe-container.dark {
        filter: hue-rotate(190deg) invert(1);
    }
</style>
