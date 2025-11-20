<template>
    <h3>
        <router-link to="/">Zurück zur Übersicht</router-link>
    </h3>

    <h2>Preis / Angebot</h2>

    <p>Die Zeitmessanlage kann in verschiedener Konfiguration gebucht werden.</p>
    <p>Erklärung zusätzliche Leistungen siehe auch <router-link to="contact">Kontakt</router-link>.</p>

    <br />

    <h3>Engagieren von Zeitnehmern - Just in Time Association:</h3>
    <img src="/src/public/just-in-time-association-logo.svg" class="x-small-image" />

    <p>Engagieren Zeitnehmer: &nbsp;&nbsp;&nbsp;&nbsp; {{ costTimingOfficiantsDaily }}€ / Wettkampftag</p>
    <p>Bereitstellung Anlage mit Hänger: &nbsp;&nbsp;&nbsp;&nbsp; {{ costTimingTrailer }}€</p>
    <p>Anfahrt: &nbsp;&nbsp;&nbsp;&nbsp; {{ (Math.round(costTravelTransport * 100) / 100).toFixed(2) }}€ / km und Richtung</p>
    <p>Auf-/Abbauunterstützung und Problemlöse-Helfer bei Eigenbetreuung: &nbsp;&nbsp;&nbsp;&nbsp; auf Anfrage</p>
    <p>Bei kurzen Wettkampfformen können auf Anfrage Sonderkonditionen verhandelt werden.</p>

    <br />
    <br />
    <h3>Anlagemiete - Bezirk Schwaben:</h3>
    <img src="/src/public/Logo-Schwaben.png" class="x-small-image" />

    <p>Miete Zeitmessung pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costMainSystem }}€</p>
    <p>Miete Anzeigetafel pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costDisplay }}€</p>
    <p>Miete Geräte Mess-Set pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costMeasurementDevices }}€</p>
    <p>Miete Windmesser f. techn. Diszip. pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costWindmeterTechnical }}€</p>
</template>

<script setup lang="ts">
    // import useAppStore from "../app-store";
    // const appStore = useAppStore();

    import {
        costMainSystem,
        costTravelTransport,
        costTimingTrailer,
        costDisplay,
        costMeasurementDevices,
        costTimingOfficiantsDaily,
        costWindmeterTechnical,
    } from "./../costs.ts";
</script>

<style scoped></style>
