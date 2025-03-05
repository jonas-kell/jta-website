<template>
    <h3>
        <router-link to="/">Zurück zur Übersicht</router-link>
    </h3>

    <h2>Preis / Angebot</h2>

    <p>Die Zeitmessanlage kann in mehreren Konfigurationen/Teilen gebucht werden.</p>
    <p>Erklärung zusätzliche Leistungen siehe auch <router-link to="contact">Kontakt</router-link>.</p>

    <h3>Anlagemiete - Bezirk Schwaben:</h3>

    <p>Miete Zeitmessung pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costMainSystem }}€</p>
    <p>Miete Anzeigetafel pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costDisplay }}€</p>
    <p>Miete Geräte Mess-Set pro Tag: &nbsp;&nbsp;&nbsp;&nbsp; {{ costMeasurementDevices }}€</p>

    <h3>Externes Engagieren von Zeitnehmern - TSV-Schwabmünchen:</h3>

    <p>Ersteinsatz Betreuung: &nbsp;&nbsp;&nbsp;&nbsp; <b>Übernahme durch Bezirk Schwaben</b></p>
    <p>Engagieren Zeitnehmer: &nbsp;&nbsp;&nbsp;&nbsp; {{ costTimingOfficiantsPerH }}€/h oder im Paket auf Anfrage</p>
    <p>Anlagentransport/Abholung: &nbsp;&nbsp;&nbsp;&nbsp; auf Anfrage</p>
    <p>Zeitnahme-Wohnmobil: &nbsp;&nbsp;&nbsp;&nbsp; auf Anfrage</p>
    <p>Auf-/Abbauunterstützung und Problemlöse-Helfer bei Eigenbetreuung: &nbsp;&nbsp;&nbsp;&nbsp; auf Anfrage</p>
</template>

<script setup lang="ts">
    // import useAppStore from "../app-store";
    // const appStore = useAppStore();

    import { costMainSystem, costDisplay, costMeasurementDevices, costTimingOfficiantsPerH } from "./../costs.ts";
</script>

<style scoped></style>
