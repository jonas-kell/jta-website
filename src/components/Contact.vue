<template>
    <h3>
        <router-link to="/">Zurück zur Übersicht</router-link>
    </h3>

    <h2>Kontakt</h2>

    <p>Anfragen für die Miete und oder Reservierung der Anlage an:</p>

    <p>
        <a v-if="appStore.standalone" :href="'mailto:' + deobfuscate(OWN_MAIL_OBVUSCATED)">
            {{ deobfuscate(OWN_MAIL_OBVUSCATED) }}</a
        >
        <a v-else :href="'mailto:' + deobfuscate(SCHWABEN_MAIL_OBVUSCATED)">{{ deobfuscate(SCHWABEN_MAIL_OBVUSCATED) }}</a>
    </p>

    <h3>Verantwortlicher Zeitmessung:</h3>
    <p>{{ deobfuscate(NAME1_OBVUSCATED) }} (Just in Time Association)</p>

    <h3>Zubuchung eines Anlagenbetreuers und/oder Zeitmessers:</h3>
    <img src="/src/public/tsv-smue-experts.jpg" class="small-image" />

    <p><b>Buchung des Rundum-Sorglos-Pakets der Just in Time Association wird wärmstens empfohlen!</b></p>

    <p class="multiline-p" style="margin-top: 1em">
        Grundsätzlich ist die Miete der Anlage ohne Lieferung, Auf-/Abbau oder Betrieb.
    </p>
    <p class="multiline-p">Die buchenden Vereine sind selbst hierfür verantwortlich.</p>
    <p class="multiline-p">Hierzu muss vorher die entsprechende Fortbildung/Schulung erfolgt sein.</p>
    <p class="multiline-p">Die <b>Just in Time Association</b> hat ausgebildete Verantwortliche,</p>
    <p class="multiline-p">die bei Bedarf zusätzlich engagiert werden können.</p>
    <p class="multiline-p">Dies geschieht unabhängig von der Anlagenmiete und unabhängig</p>
    <p class="multiline-p">von dem (an den Bezirk Schwaben) zu entrichtenden Mietbetrag.</p>
    <p class="multiline-p">Auch der Transport ist unabhängig von der Miete extra zu beantragen/zu organisieren.</p>
    <p class="multiline-p">Bei Bedarf unbedingt bei Kontaktaufnahme ansprechen!!</p>

    <p>
        <a v-if="appStore.standalone" :href="'mailto:' + deobfuscate(OWN_MAIL_OBVUSCATED)">
            {{ deobfuscate(OWN_MAIL_OBVUSCATED) }}</a
        >
        <a v-else :href="'mailto:' + deobfuscate(SCHWABEN_MAIL_OBVUSCATED)">{{ deobfuscate(SCHWABEN_MAIL_OBVUSCATED) }}</a>
    </p>

    <p>!! Beachte Transportanforderungen für Videowall, siehe <router-link to="download">Downloads</router-link> !!</p>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";
    import { deobfuscate, NAME1_OBVUSCATED, OWN_MAIL_OBVUSCATED, SCHWABEN_MAIL_OBVUSCATED } from "../obfuscation";
    const appStore = useAppStore();
</script>

<style scoped></style>
