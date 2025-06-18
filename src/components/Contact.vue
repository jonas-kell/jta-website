<template>
    <h3>
        <router-link to="/">Zurück zur Übersicht</router-link>
    </h3>

    <h2>Kontakt</h2>

    <p>Anfragen für die Miete und oder Reservierung der Anlage an:</p>

    <p>
        <a v-if="!appStore.standalone" href="mailto:zeitnahme@blv-schwaben.de">zeitnahme@blv-schwaben.de</a>
        <a v-if="appStore.standalone" href="mailto:contact@just-in-time-association.de">contact@just-in-time-association.de</a>
    </p>

    <h3>Verantwortlicher Zeitmessung:</h3>
    <p>Jonas Kell (Just in Time Association)</p>

    <h3>Zubuchung eines Anlagenbetreuers und/oder Zeitmessers:</h3>
    <img src="/src/public/tsv-smue-experts.jpg" class="small-image" />

    <p class="multiline-p" style="margin-top: 1em">
        Grundsätzlich ist die Miete der Anlage ohne Lieferung, Auf-/Abbau oder Betrieb.
    </p>
    <p class="multiline-p">Die buchenden Vereine sind selbst hierfür verantwortlich.</p>
    <p class="multiline-p">Hierzu muss vorher die entsprechende Fortbildung/Schulung erfolgt sein.</p>
    <p class="multiline-p">Die <b>Just in Time Association</b> hat ausgebildete Verantwortliche,</p>
    <p class="multiline-p">die bei Bedarf zusätzlich engagiert werden können.</p>
    <p class="multiline-p">Dies geschieht unabhängig von der Anlagenmiete und unabhängig</p>
    <p class="multiline-p">von dem (an den Bezirk Schwaben) zu entrichtenden Mietbetrag.</p>
    <p class="multiline-p">
        Da bei der ersten Betriebnahme eine Beaufsichtigung durch Verantwortliche der Just in Time Association <b>dringend</b>
    </p>
    <p class="multiline-p">
        empfohlen wird, <b>übernimmt</b> die Kosten diese zu engagieren für den <b>Ersteinsatz</b> der Bezirk Schwaben.
    </p>
    <p class="multiline-p">Auch der Transport ist unabhängig von der Miete extra zu beantragen/zu organisieren.</p>
    <p class="multiline-p">Bei Bedarf unbedingt bei Kontaktaufnahme ansprechen!!</p>

    <p>
        <a v-if="!appStore.standalone" href="mailto:zeitnahme@blv-schwaben.de">zeitnahme@blv-schwaben.de</a>
        <a v-if="appStore.standalone" href="mailto:contact@just-in-time-association.de">contact@just-in-time-association.de</a>
    </p>

    <p>!! Beachte Transportanforderungen für Videowall, siehe <router-link to="download">Downloads</router-link> !!</p>
</template>

<script setup lang="ts">
    import useAppStore from "../app-store";
    const appStore = useAppStore();
</script>

<style scoped></style>
